/**Contains helper functions focused on interacting w/ the Github API and converting API responses
 * to objects that match our database schema.
 */
'use strict';

const request = require('request-promise');
const Promise = require('bluebird');
const db = require('../db/database');
const parseLink = require('parse-link-header');
const config = require('../config');
var mergeObj = require('lodash.merge');
var pick = require('lodash.pick');
var path = require('path');
var dateFormat = require('dateformat');

var QueueManager = require('./queueManager');

//The issue API is throttled by 30 req/min
var issueQueue = new QueueManager(30);

//The repo API is throttled by 5000/hour but QueueManager is in minutes
var repoQueue = new QueueManager(60, 304);

/**Basic gitHub request information that we want to use in almost all API interactions */
var baseGithubOptions = {
  json: true, //parses the responses body to automatically be js obj
  resolveWithFullResponse: true, //provides full reponse and not just body (so we get headers)
  headers: { 'User-Agent': 'GitBegin App' },
  qs: {client_id: config.githubClientId,
  client_secret: config.githubSecret}
};

/**Searches Github for issues w/ the provided label.
 * Returns a promise which resolves to a a JSON object containing the issues.
 */
var getGithubIssuesByLabel = issueQueue.createQueuedFunction(function(label, getAllPages) {
  if (getAllPages === undefined) {
    getAllPages = true;
  }

  var issues = [];

  var options = {
    url: 'https://api.github.com/search/issues',
    qs: {per_page: 100,
    q: `is:issue is:open label:"${label}"`}
  };
  mergeObj(options, baseGithubOptions);

  return request.get(options).then((result) => {
    issues = result.body.items;
    var links = parseLink(result.headers.link);
    if (getAllPages && links && links.next) {
      return getAllSubsequentPages(links.next.url)
      .then((results) => {
        return issues = issues.concat(results.reduce((memo, resObj) => {
          return memo.concat(resObj.items);
        }, []));
      });
    } else {
      return issues;
    }
  });
});

/**Performas a GET request on the provided URL and if a "next" Link
 * is provided in the header, it recursively continues calling until all
 * pages are retrieved
 */
var getAllSubsequentPages = function(url) {

  var data = [];

  var recursiveGet = function(url) {
    var options = {
      url: url,
      json: true, //parses the responses body to automatically be js obj
      resolveWithFullResponse: true, //provides full reponse and not just body (so we get headers)
      headers: { 'User-Agent': 'GitBegin App' }
    };

    return request.get(options).then((result) => {
      data.push(result.body);
      //Handle pagination and see if we need to iterate pages
      var links = parseLink(result.headers.link);
      if(links.next) {
        return recursiveGet(links.next.url);
      } else {
        data.headers = result.headers;
        return data;
      }
    });
  };
  recursiveGet = issueQueue.createQueuedFunction(recursiveGet);
  return recursiveGet(url);
};

/**Takes an org name and repo name and fetches information from Github api
 * Optionally, takes an etag.  If provided Github will only send response if there
 * is new data since last update
 */
var getRepoInformation = repoQueue.createQueuedFunction(function (orgName, repoName, etag) {
  var options = {
    url: `https://api.github.com/repos/${orgName}/${repoName}`,
    headers: {'If-None-Match': etag }
  };
  mergeObj(options, baseGithubOptions);

  return request.get(options);
});

/**Takes an object that looks like a github API issue obj and converts it
 * to an obj that contains only columns in our db (w/ keys that match db columns)
 */
var convertIssueToDbIssue = function(obj) {
  //reduce down to properties we care about
  obj = pick(obj, ['id','title','comments','created_at', 'updated_at', 'html_url', 'assignee','repository_url','number', 'labels', 'body']);

  //Assignee is either null or an object.  We want the username:
  if (obj.assignee) {
    obj.assignee = obj.assignee.login;
  }

  //Labels is an array of objects with a url property we don't want.
  if (obj.labels) {
    obj.labels.map(function(label) {
      delete label.url;
    });
    obj.labels = JSON.stringify(obj.labels);
  }

  //Limit body value to 1500 characters
  if (typeof obj.body === 'string') {
    obj.body = obj.body.substring(0,1499);
    obj.body = obj.body.replace(/[^\x00-\x7F]/g, "");
  } else {
    console.log('type: ', typeof obj.body);
    console.log('obj.body: ', obj.body);
  }

  //Convert dates to JS dates so knex can reconvert back to mysql
  obj.created_at = dateFormat(obj.created_at, 'yyyy-mm-dd HH:MM:ss');
  obj.updated_at = dateFormat(obj.updated_at, 'yyyy-mm-dd HH:MM:ss');

  //Parse repo and org name out of URL
  var repoPath = path.parse(obj.repository_url);
  obj.repo_name = repoPath.base;
  obj.org_name = path.parse(repoPath.dir).base;

  //Delete keys we needed but that we don't want in our db;
  delete obj.repository_url;

  return obj;
};

/**Takes a Github API Repo object and converts it to an object
 * that contains the columns we want to insert/update into our database.
 */
var convertRepoToDbRepo = function(obj, headers) {
  //reduce down to properties we care about
  obj = pick(obj, ['id','name','language','description','stargazers_count',
          'watchers_count', 'has_wiki', 'has_pages','open_issues','forks','created_at',
          'updated_at','pushed_at','html_url']);


  //Convert dates to JS dates so knex can reconvert back to mysql
  var mysqlDateFormat = 'yyyy-mm-dd HH:MM:ss';
  obj.created_at = dateFormat(obj.created_at, mysqlDateFormat);
  obj.updated_at = dateFormat(obj.updated_at, mysqlDateFormat);
  obj.pushed_at = dateFormat(obj.pushed_at, mysqlDateFormat);
  obj.data_refreshed_at = dateFormat(new Date(), mysqlDateFormat);

  //Parse repo and org name out of URL
  var repoPath = path.parse(obj.html_url);
  obj.org_name = path.parse(repoPath.dir).base;

  //Add header information if provided
  if (headers) {
    obj.etag = headers.etag;
  }

  return obj;
};


/**Accepts an array of objects ({name: ,org_name, etag:}) and updates our
 * database w/ new information from the github api.  Returns a promise which
 * resolves to the number of repos actually updated in the db
 */
var refreshReposFromGithub = function(repos) {
  if(!repos) {
    return 0;
  }
    //Update all repos from API
  var countUpdates = 0;

  var allRepoGets = repos.map((repo) => {
    return getRepoInformation(repo.org_name, repo.name, repo.etag)
    .then((result) => {
      var objToInsert = convertRepoToDbRepo(result.body, result.headers);
      return db('repos').where({name: objToInsert.name, org_name: objToInsert.org_name})
                        .update(objToInsert)
                        .then(() => countUpdates++);
    })
    .catch((result) => {
      if(result.statusCode === 304) {
        //Github is telling us there is no change since last time we updated
        //It determines this based on the etag we provide in the GET request
      } else {
        console.error('Error getting new repo information', result);
      }
    });
  });

  return Promise.all(allRepoGets)
  .then(() => {
    console.log(`Updated ${countUpdates} repos`);
    return countUpdates;
  });
};

module.exports = {
  getGithubIssuesByLabel: getGithubIssuesByLabel,
  getRepoInformation: getRepoInformation,
  convertIssueToDbIssue: convertIssueToDbIssue,
  convertRepoToDbRepo: convertRepoToDbRepo,
  refreshReposFromGithub: refreshReposFromGithub
};

var util = require('./util');
var QueueManager = require('./queueManager');
var request = require('request-promise');
var config = require('../config');
var mergeObj = require('lodash.merge');

var setLimit = function(obj) {
  return obj.headers['x-ratelimit-remaining'];
};

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
var getGithubIssuesByLabel = function(label, getAllPages) {
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
  
  return request.get(options);
};

var gh = new QueueManager(30, setLimit);


var a1 = gh.enqueue(getGithubIssuesByLabel,'good-first-pr')

var a2 = gh.enqueue(getGithubIssuesByLabel,'dog')

var a3 = gh.enqueue(getGithubIssuesByLabel,'easy')


Promise.all([a1,a2,a3]).then((results) => {
  results.forEach((res) => console.log(res.body.items.length));
});

setTimeout(gh.dequeue.bind(gh), 2000);
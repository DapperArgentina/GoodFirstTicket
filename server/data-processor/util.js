
var request = require('request-promise');

module.exports.getGithubIssuesByLabel = function(label) {
  
  var options = {
    url: 'https://api.github.com/search/issues',
    qs: {per_page: 100,
    q: `is:issue is:open label:"${label}"`},
    headers: { 'User-Agent': '' },
    json: true,  // will JSON.parse(body) for us
  };
 
  return request.get(options);
};

/**Takes an object that looks like a github API issue obj and converts it
 * to an obj that contains only columns in our db (w/ keys that match db columns)
 */
var pick = require('lodash.pick');
var path = require('path');
var dateFormat = require('dateformat');

module.exports.convertIssueToDbIssue = function(obj) {
  //reduce down to properties we care about
  obj = pick(obj, ['id','title','comments','created_at', 'updated_at', 'html_url', 'assignee','repository_url','number']);
  
  //Assignee is either null or an object.  We want the username:
  if (obj.assignee) {
    obj.assignee = obj.assignee.login;
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


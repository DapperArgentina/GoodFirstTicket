'use strict';

// var util = require('./util');
var QueueManager = require('./queueManager');
var request = require('request-promise');
var config = require('../config');
var mergeObj = require('lodash.merge');

/**Basic gitHub request information that we want to use in almost all API interactions */
// var baseGithubOptions = {
//   json: true, //parses the responses body to automatically be js obj
//   resolveWithFullResponse: true, //provides full reponse and not just body (so we get headers)
//   headers: { 'User-Agent': 'GitBegin App' }, 
//   qs: {client_id: config.githubClientId,
//   client_secret: config.githubSecret}
// };

// /**Searches Github for issues w/ the provided label.
//  * Returns a promise which resolves to a a JSON object containing the issues.
//  */
// var getGithubIssuesByLabel = function(label, getAllPages) {
//   if (getAllPages === undefined) {
//     getAllPages = true;
//   }
  
//   var issues = [];
  
//   var options = {
//     url: 'https://api.github.com/search/issues',
//     qs: {per_page: 100,
//     q: `is:issue is:open label:"${label}"`}
//   };  
//   mergeObj(options, baseGithubOptions);
  
//   return request.get(options);
// };

var gh = new QueueManager(30);
// var queueFn = gh.createQueuedFunction(getGithubIssuesByLabel);

var f = function(){
  return new Promise(function(resolve){
    setTimeout(()=>(resolve(1)), 100);
  });
} 
var throttledFn = gh.createQueuedFunction(f);
// var a1 = gh.enqueue(getGithubIssuesByLabel,['good-first-pr'])
// var a2 = gh.enqueue(getGithubIssuesByLabel,['dog'])
// var a3 = gh.enqueue(getGithubIssuesByLabel,['easy'])
// var b1 = queueFn('good-first-pr');
// var b2 = queueFn('dog');
// var b3 = queueFn('easy');

// Promise.all([a1,a2,a3,b1,b2,b3]).then((results) => {
//   results.forEach((res) => console.log(res.body.items.length));
// });
var counter=90
while(counter-- >0) {
  throttledFn();
}

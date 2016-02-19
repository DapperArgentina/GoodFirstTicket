// Require the request module from node
var request = require('request');

module.exports = {};

//Create a get request for issues
module.exports.getIssues = function (callback) {
 var options = {
   url: 'https://api.github.com/search/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+bug%22&per_page=100',
   headers: { 'User-Agent': '' },
   json: true  // will JSON.parse(body) for us
 };
 
 request.get(options, function (err, res, body) {
   if (err) { 
     callback(err, null);
   } else {
     callback(null, body);
   }
 });
};

/*
module.exports.getIssues(function (err, body) {
  if (err) {
  console.log('err', err);
    
  } else {
  console.log('body', body);
    
  }
});
*/

/*
// Grab the github endpoints
curl https://api.github.com
*/


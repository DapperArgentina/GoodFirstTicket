// Require the request module from node
var $ = require('jquery');

module.exports = {};

//Create a get request for issues
module.exports.getIssues = function (successCallback, errCallback) {
  var options = {
    type: 'GET',
    success: successCallback,
    error: errCallback,
    data: {headers: { 'User-Agent': '' },
    json: true}  // will JSON.parse(body) for us
  };
 
  $.ajax('https://api.github.com/search/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+bug%22&per_page=100'
  , options);
  
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


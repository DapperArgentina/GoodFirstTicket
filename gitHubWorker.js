// Require the request module from node
var $ = require('jquery');

module.exports = {};

module.exports.getIssues = function (successCallback, errCallback, searchTerm, language) {
  var options = {
    url: 'https://api.github.com/search/issues',
    type: 'GET',
    success: successCallback,
    error: errCallback,
    data: {q: 'is:issue is:open label:"good first bug"',
      per_page: 100}
  };
 
  if(searchTerm) {
    options.data.q += '+' + searchTerm.trim();  
  }

  if(language) {
    options.data.q += 'language:' + language;
  }
 
  $.ajax(options);
  
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


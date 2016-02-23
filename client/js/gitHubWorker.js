// Require the request module from node
var $ = require('jquery');

module.exports = {};

module.exports.getRepos = function (successCallback, errCallback, searchTerm, language) {
  var options = {
    url: 'http://45.55.29.22:3000/api/repos',
    type: 'GET',
    success: successCallback,
    error: errCallback
    // data: {q: 'is:issue is:open label:"good first bug"',
    //   per_page: 100}
  };
 
  // if(searchTerm) {
  //   options.data.q += '+' + searchTerm.trim();  
  // }

  // if(language) {
  //   options.data.q += 'language:' + language;
  // }
 
  $.ajax(options);
  
};

/*
// Grab the github endpoints
curl https://api.github.com
*/


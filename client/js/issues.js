
var $ = require('jquery');

module.exports = {};

var issues = [];

var getIssuesFromApi = function (successCallback, errCallback) {
  var options = {
    url: 'http://45.55.29.22:3000/api/issues',
    type: 'GET',
    success: successCallback,
    error: errCallback
    // data: {q: 'is:issue is:open label:"good first bug"',
    //   per_page: 100}
  };

  $.ajax(options);  
};

module.exports.getIssues = function(successCallback, errCallback, searchTerm, language) {
  if (issues = []) {
    getIssuesFromApi((data) => {
      issues = data;
      successCallback(issues);
    }, errCallback);
  } else {
    successCallback(issues);
  }
};
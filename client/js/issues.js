
var $ = require('jquery');

module.exports = {};

var issues = [];

var getIssuesFromApi = function (successCallback, errCallback) {
  var options = {
    url: 'http://45.55.29.22:3000/api/issues',
    type: 'GET',
    success: successCallback,
    error: errCallback
  };

  $.ajax(options);  
};


module.exports.getIssues = function(successCallback, errCallback, searchTerm, language) {
  if (issues = []) {
    getIssuesFromApi((data) => {
      issues = data;
      if (searchTerm || language) {
        return successCallback(returnFilteredIssues(searchTerm, language));
      }
      return successCallback(issues);
    }, errCallback);
  } else {
    if (searchTerm || language) {
      return successCallback(returnFilteredIssues(searchTerm, language));
    }
    return successCallback(issues);
  }
};

var returnFilteredIssues = function(searchTerm, language) {
  var results = [];
  
  issues.forEach((issue) => {
    var languageMatch = true;
    var searchMatch = true;
    
    //handle null language issues
    issue.language = issue.language || '';
    if(language) {
      languageMatch = (language.toLowerCase() === issue.language.toLowerCase());
    }
    
    if(searchTerm) {
      var searchMatch = ( (issue.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                          (issue.org_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                            (issue.repo_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                        );                   
    }
    
    if (languageMatch && searchMatch) {
      results.push(issue);
    }
  });
  
  return results;
};

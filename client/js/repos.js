var $ = require('jquery');

module.exports = {};

var repos = [];
var languages = [];

var getReposFromApi = function (successCallback, errCallback, searchTerm, language) {
  var options = {
    url: 'http://45.55.29.22:3000/api/repos',
    type: 'GET',
    success: successCallback,
    error: errCallback
  };
 
  $.ajax(options); 
};

var returnFilteredRepos = function(searchTerm, language) {
  var results = [];
  
  repos.forEach((repo) => {
    var languageMatch = true;
    var searchMatch = true;
    
    //handle null language
    repos.language = repos.language || '';
    if(language) {
      languageMatch = (language.toLowerCase() === repo.language.toLowerCase());
    }
    
    if(searchTerm) {
      var searchMatch = ( (repo.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                          (repo.org_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                        );                   
    }
    
    if (languageMatch && searchMatch) {
      results.push(repo);
    }
  });
  
  return results;
};

var setLanguages = function() {
  var hash = {};
  repos.forEach((repo) => (hash[repo.language] = true));
  languages = Object.keys(hash).sort();
  return languages;
};

module.exports.getRepos = function(successCallback, errCallback, searchTerm, language) {
  if (repos.length === 0) {
    getReposFromApi((data) => {
      repos = data;
      if (searchTerm || language) {
        return successCallback(returnFilteredRepos(searchTerm, language));
      }
      return successCallback(repos);
    }, errCallback);
  } else {
    if (searchTerm || language) {
      return successCallback(returnFilteredRepos(searchTerm, language));
    }
    return successCallback(repos);
  }
};

module.exports.getLanguages = function(successCallback) {
  if (languages.length === 0 && repos.length === 0) {
    module.exports.getRepos(() => {
      setLanguages();
      successCallback(languages);
    }, (err)=>console.log(err), null, null);
    return;
  } 
  if(languages.length === 0) {
    setLanguages();
    successCallback(languages);
    return;
  }
  
  return successCallback(languages);  
};



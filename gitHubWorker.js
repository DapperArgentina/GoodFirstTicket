
var request = require('request');


var getGitHubIssue = function (user, callback) {
 var options = {
   url: 'https://api.github.com/users/'+user,
   headers: { 'User-Agent': 'request' },
   json: true  // will JSON.parse(body) for us
 };

 request.get(options, function (err, res, body) {
   if (err) { 
     callback(err, null);
   } else if (body.message) {
     callback(new Error('Failed to get GitHub profile: ' + body.message), null);
   } else {
     callback(null, body);
   }
 });
};


getGitHubIssue('danielsunkim', function (err, body) {
  console.log('err', err);
  console.log('body', body);
});

/*
// Grab the github endpoints

curl https://api.github.com
*/
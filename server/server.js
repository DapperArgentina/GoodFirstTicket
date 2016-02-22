var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/database');
var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));


var port = process.env.PORT || 3000;
console.log(`server running on port ${port}`);
// start listening to requests on port 3000
app.listen(port);


app.route('/api')
  .get(function(req, res){
    res.send('Hello World');
  });


app.route('/api/issues')
  .get(function(req, res){
    db.raw(`select * from issues`)
    .then( function (resultsFromSelect) {
      return resultsFromSelect[0];
    })
    .then ( function (results) {
      res.send(results);
    })
  });

app.route('/api/repos')
  .get(function(req, res){
    db.raw(`select * from repos`)
    .then( function (resultsFromSelect) {
      return resultsFromSelect[0];
    })
    .then ( function (results) {
      res.send(results);
    }) 
  });


// export our app for testing and flexibility, required by index.js
module.exports = app;

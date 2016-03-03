var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/database');
var app = express();
var config = require('./config')
var githubOAuth = require('github-oauth')({
  githubClient: config.GITHUB_CLIENT,
  githubSecret: config.GITHUB_SECRET,
  baseURL: 'http://127.0.0.1:8080',
})
var github = require('octonode');

console.log('starting server ')

var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");
var mysql = require('mysql');

var Issues = require('./models/issues');
Issues = new Issues();

var Repos = require('./models/repos');
Repos = new Repos();

var Users = require('./models/users');
Users = new Users();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

var port = process.env.PORT || 3000;

app.route('/api')
  .get(function(req, res){
    res.send('Hello World');
  });

app.route('/api/issues')
  .get(function(req, res) {
    Issues.getIssues()
    .then((results) => res.send(results))
    .catch((err) => {
      console.log(err);
      res.statusCode = 501;
      res.send('Unknown Server Error');
    });
  });

app.route('/api/repos')
  .get(function(req, res){
    Repos.getRepos()
    .then((results) => res.send(results))
    .catch(() => {
      res.statusCode = 501;
      res.send('Unknown Server Error');
    });
  });

app.get('/gitHubRedirect', function(req, res) {
  res.redirect("https://github.com/login/oauth/authorize?scope=user:email&client_id=" + config.GITHUB_CLIENT);
})
// for github oauth get token
app.get(/callback/, function(req, res) {
  githubOAuth.callback(req, res);
});

githubOAuth.on('error', function(err) {
  console.error('there was a login error', err)
})

// use token to get the user id
githubOAuth.on('token', function(token, serverResponse) {
  github.client(token.access_token).get('/user', {}, function (err, status, body, headers) {
    console.log(body);
  });
  serverResponse.end(JSON.stringify(token))
})

app.route('/stripe')
  .post(function(req, res){
    var stripeToken = req.body.stripeToken;
    stripe.customers.create({
      source: stripeToken,
    }).then((customer) => {
      Users.saveId(customer.id, userId) // need to pass currently logged in userID here
      .then(() => {
        console.log('saved customer ID to DB');
      })
      .catch(() => {
        res.statusCode = 501;
        res.send('Unknown Server Error');
      })
    })
  })

console.log(`server running on port ${port} in ${process.env.NODE_ENV} mode`);
// start listening to requests on port 3000
app.listen(port);

// export our app for testing and flexibility, required by index.js
module.exports = app;

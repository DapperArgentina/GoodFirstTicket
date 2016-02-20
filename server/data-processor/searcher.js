'use strict';

const Promise = require('bluebird');
const util = require('./util');
const db = require('../db/database');

const beginnerLabels = [
  'good first bug',
  'beginner'
];


//For all beginner labels, get issues
var issuePromises = beginnerLabels.map((label) =>util.getGithubIssuesByLabel(label));

var allIssues = Promise.all(issuePromises).then((results) =>{
  var issues = [];
  results.forEach((search) => {
    issues = issues.concat(search.items.map(util.convertIssueToDbIssue)); 
  });
  console.log(issues);
  return issues;
})
.then((issues) => {
  return db('issues').insert(issues);
})
.then(console.log)
.catch(console.log);





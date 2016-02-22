'use strict';

const Promise = require('bluebird');
const util = require('./util');
const db = require('../db/database');

const beginnerLabels = [
  'good first bug',
  'beginner'
];

const sql = require('./sqlQueries');
  
//For all beginner labels, get issues
var issuePromises = beginnerLabels.map((label) =>util.getGithubIssuesByLabel(label));

//Wait until all label GETs return an then insert into database
var allIssues = Promise.all(issuePromises).then((results) =>{
  var issues = [];
  results.forEach((search) => {
    issues = issues.concat(search.items.map(util.convertIssueToDbIssue)); 
  });
  return issues;
})
.then((issues) => {
  //Delete existing issues and insert new batch
  return db('issues').truncate()
    .then(() => db('issues').insert(issues));
})
.then( () => {
  //Get the unique repo/org pairs and upsert into repos table
  return db.raw(sql.mergeAndUpsertRepos);
})
.then((result) => {
  result[0].affectedRows > 0 ? 
    console.log(`Found and inserted ${result[0].affectedRows} new repos into the db.`) :
    console.log('No new repos');
})
.then(() => {
  //Grab the list of repositories that we are going to update.
  return db.raw(sql.reposToUpdate);
})
.then((results) => util.refreshReposFromGithub(results[0]))
.catch(console.log);





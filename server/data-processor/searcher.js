'use strict';

const Promise = require('bluebird');
const util = require('./util');
const db = require('../db/database');

const beginnerLabels = [
  'good first bug',
  'beginner'
];

const sql = require('./sqlQueries');

//TODO
  //If getIssuesFromGH fails, throw error
  
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
  return db.raw(sql.reposToUpdate);
})
.then((results) => {
  var repos = results[0];
  
  //Update all repos from API
  var countUpdates = 0;
  
  var allRepoGets = repos.map((repo) => {
    return util.getRepoInformation(repo.org_name, repo.name, repo.etag)
    .then((result) => {
      var objToInsert = util.convertRepoToDbRepo(result.body, result.headers);
      return db('repos').where({name: objToInsert.name, org_name: objToInsert.org_name})
                        .update(objToInsert)
                        .then(() => countUpdates++);
    })
    .catch((result) => {
      if(result.statusCode === 304) {
        //Github is telling us there is no change since last time we updated
        //It determines this based on the etag we provide in the GET request
      } else {
        console.error('Error getting new repo information', result);
      } 
    });
  });
  
  Promise.all(allRepoGets)
  .then(() => {
    console.log(`Updated ${countUpdates} repos`);
  });
  
})
.catch(console.log);





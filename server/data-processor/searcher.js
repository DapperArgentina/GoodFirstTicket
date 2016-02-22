'use strict';

const Promise = require('bluebird');
const util = require('./util');
const db = require('../db/database');

const beginnerLabels = [
  'good first bug',
  'beginner'
];

const sql = require('./sqlQueries');
 
var issuePromises = [];

//For all beginner labels, get issues
db('issues').truncate()
.then(() =>{
  issuePromises = beginnerLabels.map((label) =>{
    return util.getGithubIssuesByLabel(label)
      .then((issues) => db('issues').insert(issues.map(util.convertIssueToDbIssue))); 
  });
})
.then(() => Promise.all(issuePromises).then( () => db.raw(sql.mergeAndUpsertRepos)))
.then((result) => {
  result[0].affectedRows > 0 ? 
    console.log(`Found and inserted ${result[0].affectedRows} new repos into the db.`) :
    console.log('No new repos');
})
.then(() => db.raw(sql.reposToUpdate))
.then((results) => util.refreshReposFromGithub(results[0]))
.catch(console.log);





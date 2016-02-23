'use strict';

const Promise = require('bluebird');
const util = require('./util');
const db = require('../db/database');
const sql = require('./sqlQueries');

const beginnerLabels = [
  'good first bug',
  'beginner',
  'easy',
  'easyfix',
  'good-first-pr',
  'good-first-issue'
];
 
var issuePromises = [];
var issuesFetched = 0;

//RENAME TABLE foo TO foo_old, foo_new To foo;

//For all beginner labels, get issues
db('issues').truncate()
.then(() =>{
  issuePromises = beginnerLabels.map((label) =>{
    return util.getGithubIssuesByLabel(label)
      .then((issues) => {
        issuesFetched += issues.length;
        return db('issues').insert(issues.map(util.convertIssueToDbIssue));
      }); 
  });
})
.then(() => Promise.all(issuePromises).then( () => db.raw(sql.mergeAndUpsertRepos)))
.then((result) => {
  console.log(`Found and inserted ${issuesFetched} beginner tickets.`);
  result[0].affectedRows > 0 ? 
    console.log(`Found and inserted ${result[0].affectedRows} new repos.`) :
    console.log('No new repos');
})
.then(() =>db.raw(sql.updateBeginnerTicketCount))
.then(() => console.log('updated beginner ticket counts'))
.catch(console.log);





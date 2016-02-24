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

console.log(`Starting fetch issues process at ${new Date()}`);

//For all beginner labels, get issues
db.schema.dropTableIfExists('temp_issues')
.then(()=> db.schema.dropTableIfExists('old_issues'))
.then(() => db.raw(`CREATE TABLE temp_issues LIKE issues;`))
.then(() =>{
  issuePromises = beginnerLabels.map((label) =>{
    return util.getGithubIssuesByLabel(label)
      .then((issues) => {
        issuesFetched += issues.length;
        return db('temp_issues').insert(issues.map(util.convertIssueToDbIssue));
      }); 
  });
})
.then(() => {
  return Promise.all(issuePromises)
    .then(() => db.raw(`RENAME TABLE issues TO old_issues, temp_issues To issues;`)); 
})
.then(() => db.raw(sql.mergeAndUpsertRepos))
.then((result) => {
  console.log(`Found and inserted ${issuesFetched} beginner tickets.`);
  result[0].affectedRows > 0 ? 
    console.log(`Found and inserted ${result[0].affectedRows} new repos.`) :
    console.log('No new repos');
})
.then(() =>db.raw(sql.updateBeginnerTicketCount))
.then(() => console.log('updated beginner ticket counts'))
.then(() => {
  console.log(`fetch issues process FINISHED at ${new Date()}`);
  process.exit(0);
})
.catch((err) => {
  console.error(err);
  console.error(`fetch issues process FAILED at ${new Date()}`);
  process.exit(1); //exit w/ failure
});






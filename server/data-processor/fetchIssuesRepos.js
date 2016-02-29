/**
 * This script grabs all "beginner" issues from Github, inserts them into our database (issues table) and inserts
 * any newly identified "beginner" repos into the db (repos table).
 */
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
  'good-first-issue',
  'first-timers-only',
  'easy pick'
];
 
var issuePromises = [];
var issuesFetched = 0;

console.log(`Starting fetch issues process at ${new Date()}`);

/**
 * We drop all beginner issues from our db and refetch them every time this script runs.  To avoid a
 * scenario where we drop the old data and fail to get new data (eg. Github's API is down), we put the
 * new issues into temp_issues.  Once we've successfully grabbed all issues, we swap temp_issues into
 * the issues table.  The old issues are then moved to old_issues.
 */
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






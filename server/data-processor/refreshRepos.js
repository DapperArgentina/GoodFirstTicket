'use strict';

const Promise = require('bluebird');
const util = require('./util');
const db = require('../db/database');
const sql = require('./sqlQueries');

console.log(`refresh repos process STARTED at ${new Date()}`);

db.raw(sql.reposToUpdate)
.then((results) => util.refreshReposFromGithub(results[0]))
.then(() => {
  console.log(`refresh repos process FINISHED at ${new Date()}`);
  process.exit(0);
})
.catch((err) => {
  console.error(err);
  console.error(`refresh repos process FAILED at ${new Date()}`);
  process.exit(1); //exit w/ failure
});

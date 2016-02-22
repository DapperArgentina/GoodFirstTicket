'use strict';

const Promise = require('bluebird');
const util = require('./util');
const db = require('../db/database');
const sql = require('./sqlQueries');

db.raw(sql.reposToUpdate)
.then((results) => util.refreshReposFromGithub(results[0]))
.catch(console.log);
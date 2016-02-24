const DateDiff = require('date-diff');
const Promise = require('bluebird');
var db = require('../db/database');

var Issues = function() {
  this._issues = [];
  this._lastUpdateDate = new Date('1/1/2015');
};

Issues.prototype.getIssues = function () {
  var self = this;
  var hoursSinceLastFetch = new DateDiff(new Date(), this._lastUpdateDate).hours();
  
  if (this._issues.length === 0 ||
   hoursSinceLastFetch > 1) {
    return db.raw(`select i.*, r.language, r.id as repo_id 
            from issues i 
            left join repos r on i.org_name=r.org_name and i.repo_name=r.name 
            order by created_at desc;`)
            .then((results) => {
              this._issues = results[0];
              this._lastUpdateDate = new Date();
              return this._issues;
            })
            .catch(console.log);
  } else {
    return new Promise((resolve) => resolve(this._issues));
  }
};

module.exports = Issues;
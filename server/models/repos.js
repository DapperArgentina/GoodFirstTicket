
const DateDiff = require('date-diff');
const Promise = require('bluebird');
var db = require('../db/database');

var Repos = function() {
  this._repos = [];
  this._lastUpdateDate = new Date('1/1/2015');
};

Repos.prototype.getRepos = function () {
  var self = this;
  var hoursSinceLastFetch = new DateDiff(new Date(), this._lastUpdateDate).hours();
  
  if (this._repos.length === 0 ||
   hoursSinceLastFetch > 1) {
    return db.raw(`select * from repos`)
            .then((results) => {
              this._repos = results[0];
              this._lastUpdateDate = new Date();
              return this._repos;
            });
  } else {
    return new Promise((resolve) => resolve(this._repos));
  }
};

module.exports = Repos;


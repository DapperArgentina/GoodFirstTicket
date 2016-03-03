var db = require('../db/database');

var Users = function() {

};

Users.prototype.saveId = function (custId, userId) {
  return db('users').where({github_id: userId})
                    .update({stripe_cust_id: custId})
};

module.exports = Users;
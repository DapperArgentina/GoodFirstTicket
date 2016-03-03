var db = require('../db/database');

var Users = function() {

};

Users.prototype.saveId = function (custId, userId) {
  return db('users').where({internal_id: userId})
                    .update({stripe_cust_id: custId})
};

Users.prototype.createUser = function (customer) {
  return db('users').insert({
    github_id: customer.id,
    github_login: customer.login,
    github_name: customer.name,
    github_email: customer.email
  })
};

module.exports = Users;
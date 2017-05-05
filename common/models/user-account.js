'use strict';

const Promise = require('bluebird');
const assert = require('assert');
const errors = require('./utils/errors');

module.exports = (UserAccount) => {
  
  UserAccount.login = (username, password) => {
    // const logger = UserAccount.app.logger; to be used when EFK stack has been setup
    assert.ok(username, 'Username is required');
    assert.ok(password, 'Password is required');
    console.log('username', username);
    console.log('password', password);
    return Promise.coroutine(function * () {
      const userAcct = yield UserAccount.findOne({
        where: {
          username: username,
          password: password
        }
      });
      if(!userAcct) return errors({
        error: Error('INVALID_CREDENTIALS')
      });
      console.log('OK', username);
      return 'OK';
    })();
  };
};

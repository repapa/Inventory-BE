'use strict';

const Promise = require('bluebird');

module.exports = (Message) => {
  Message.greet = (msg) => {
    return Promise.coroutine(function * () {
      msg = msg || 'hello';
      return `Sender says ${msg} to receiver`;
    })();
  };
};

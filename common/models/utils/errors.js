'use strict';

const assert = require('assert');
const VError = require('verror');
const errorTypes = require('./error-types');
const app = require('../../../server/server')


//TODO:oleg implement req_id
//TODO:oleg move to MW singleton (like logger)
/**
 * Errors - Error wrapper and logger
 *
 * See -error-types.js for the type of errors you can use (or add if you need a new type)
 *
 * Usage Examples:
 *
 * if(err) return Errors({
 * error: Error('INVALID_TOKEN')
 * logger: logger
 * })
 *
 * if(err) return Errors({
 * error: Error('INVALID_TOKEN')
 * logger: logger
 * meta: {details: 'Extra error details can go here'}
 * })
 *
 * if(err) return Errors({
 * error: Error('INVALID_TOKEN')
 * src: err
 * logger: logger
 * })
 *
 *
 * @param {object} Required properties are error (typeof Error) and logger, optional are the source error and meta object for extra details.
 *
 * @returns {Error}
 *
 */
module.exports = (obj) => {

  assert.ok(typeof (obj) === 'object', 'Error: Required argument must be an object');

  assert.ok(obj.error instanceof Error, 'Error: error must be an instance of error object');

  if (obj.src) {
    assert.ok(obj.src instanceof Error, 'Error: src must be an instance of error object');
  }

  // assert.ok(obj.logger, 'Error: logger must be defined');
  // assert.ok(obj.logger.error, 'Error: logger must have an error method for logging');

  if (obj.meta) {
    assert.ok(typeof (obj.meta) === 'object', ' Error: meta argument must be an object');
  }

  // err for detailed developer logging
  let err;

  if (obj.src) {
    err = new VError(obj.src, obj.error.message);
  }
  else {
    err = obj.error;
  }

  // log system error
  // obj.logger.error(err);

  // return user error
  return errorBuilder(err, obj.meta);

};

function errorBuilder(error, meta) {

  // example: Error: INVALID_TOKEN
  // example: VError: MONGO_ERROR: MongoDB Connection Error
  let errorType = error.message.split(':')[0];

  // check for valid  error type
  if (!errorTypes[errorType]) errorType = 'DEFAULT';

  const err = new Error(errorTypes[errorType].message);
  err.status = errorTypes[errorType].status;
  err.code = errorTypes[errorType].code;
  err.type = errorType;

  err.meta = {};

  // merge in any default meta properties (above)
  if (errorTypes[errorType].meta) {
    Object.assign(err.meta, errorTypes[errorType].meta)
  }

  // merge in any custom meta properties
  if (meta && typeof meta === 'object') {
    Object.assign(err.meta, meta)
  }

  if (!app.get('debug')) {
    delete err.stack
  }

  return err;

}

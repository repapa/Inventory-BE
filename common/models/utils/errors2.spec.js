'use strict';

const should = require('chai').should(); // eslint-disable-line no-unused-vars
const expect = require('chai').expect;
const sinon = require('sinon');

const axaErrors = require('./axa-errors2');

describe('Axa Errors 2', () => {

  let logger, spy;

  beforeEach(() => {
    spy = sinon.spy();
    logger = { error: spy }
  });

  it('should reject non-valid arguments', () => {

    let fn;

    fn = () => { axaErrors(); }
    expect(fn).to.throw(/required argument must be an object/i);

    fn = () => { axaErrors({ error: Error('INVALID_TOKEN') }); }
    expect(fn).to.throw(/logger must be defined/i);

    fn = () => { axaErrors({ error: Error('INVALID_TOKEN'), src: 'string' }); }
    expect(fn).to.throw(/src must be an instance of error object/i);

    fn = () => { axaErrors({ error: Error('INVALID_TOKEN'), logger: {} }); }
    expect(fn).to.throw(/logger must have an error method for logging/i);

    fn = () => { axaErrors({ error: Error('INVALID_TOKEN'), logger: logger, meta: 'string' }); }
    expect(fn).to.throw(/meta argument must be an object/i);

  });

  it('should throw a default axa-error object', () => {

    let defaultError = {
      error: Error(),
      logger: logger
    };

    let err = axaErrors(defaultError);

    // client error response    
    err.message.should.match(/error/i);
    err.status.should.equal(401);
    err.code.should.equal('E000');
    err.type.should.equal('DEFAULT')

    // system error logging
    sinon.assert.calledOnce(spy);

  });

  it('should return a specific axa-error object', () => {

    let err = axaErrors({ error: Error('INVALID_TOKEN'), logger: logger });

    // client error response
    err.message.should.match(/invalid token/i);
    err.status.should.equal(401);
    err.code.should.equal('T110');
    err.type.should.equal('INVALID_TOKEN');

    // system error logging
    sinon.assert.calledOnce(spy);

  });

  it('should return a combined specific axa-error object and source error object', () => {

    let mongdbError = {
      error: Error('MONGO_ERROR'),
      src: Error('MongoDB Connection Error'),
      logger: logger
    };

    let err = axaErrors(mongdbError);

    // client error response   
    err.message.should.match(/mongodb error/i);
    err.status.should.equal(500);
    err.code.should.equal('M500');
    err.type.should.equal('MONGO_ERROR');

    // system error logging
    sinon.assert.calledOnce(spy);

  });

  it('should return a specific axa-error object with arbitrary extra details in the meta property object', () => {

    let ldapError = {
      error: Error('LDAP_ADD_USER'),
      meta: { details: 'Extra arbitrary error details can be added' },
      src: Error('LDAP Add User Error'),
      logger: logger
    };

    let err = axaErrors(ldapError);

    // client error response   
    err.message.should.match(/ldap add user error/i);
    err.status.should.equal(500);
    err.code.should.equal('AFLD403');
    err.type.should.equal('LDAP_ADD_USER');
    should.exist(err.meta);
    err.meta.details.should.equal(ldapError.meta.details);
    err.meta.system.should.equal('Unable to add new user to LDAP');

    // system error logging
    sinon.assert.calledOnce(spy);

  });

});

'use strict'

/*

Current convention for our API Error responses is to use these codes ONLY:

400 Bad Request (input params)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).[35]

401 Unauthorized (for example change password with an incorrect old password)
Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource. See Basic access authentication and Digest access authentication.[36] 401 semantically means "unauthenticated",[37] i.e. the user does not have the necessary credentials.
Note: Some sites issue HTTP 401 when an IP address is banned from the website (usually the website domain) and that specific address is refused permission to access a website.

403 Forbidden (invalid access credentials ie. token, user/pass etc)
The request was a valid request, but the server is refusing to respond to it. 403 error semantically means "unauthorized", i.e. the user does not have the necessary permissions for the resource.

409 Conflict (ex: add an account that already exists)
Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.

412 Precondition Failed (http headers related)
The server does not meet one of the preconditions that the requester put on the request.[45]

422 Unprocessable Entity (ex: provided countryCode is invalid)
The 422 (Unprocessable Entity) status code means the server understands
the content type of the request entity (hence a 415(Unsupported Media Type)
status code is inappropriate), and the syntax of the request entity is correct
(thus a 400 (Bad Request) status code is inappropriate) but was unable
to process the contained instructions.  For example, this error condition
may occur if an XML request body contains well-formed (i.e., syntactically
correct), but semantically erroneous, XML instructions.
*/

module.exports = {

  DEFAULT: {
    message: 'Error',
    status: 401,
    code: 'E000'
  },

  UNCAUGHT_EXCEPTION: {
    message: 'Uncaught Exception',
    status: 500,
    code: 'E500'
  },

  UNAUTHORIZED: {
    message: 'Invalid authentication',
    status: 401,
    code: 'A001'
  },

  CONFLICT: {
    message: 'Conflict in request',
    status: 409,
    code: 'CF001'
  },

  // Required Inputs
  HEADER_MISSING: {
    message: 'Missing required Header',
    status: 401,
    code: 'H100'
  },

  EXCESSIVE_HEADERS: {
    message: 'Too many Headers',
    status: 401,
    code: 'H101'
  },

  INVALID_HEADERS_TYPE: {
    message: 'Invalid Headers type',
    status: 401,
    code: 'H102'
  },

  INVALID_HEADERS_VALUE: {
    message: 'Invalid Headers value',
    status: 401,
    code: 'H103'
  },

  INVALID_ARGUMENT: {
    message: 'Invalid argument',
    status: 422,
    code: 'E101'
  },

  INVALID_EMAIL: {
    message: 'Invalid email',
    status: 401,
    code: 'E105'
  },

  INVALID_NATIONAL_ID: {
    message: 'Invalid national ID',
    status: 401,
    code: 'E107'
  },

  INVALID_COUNTRY: {
    message: 'Invalid country.',
    status: 401,
    code: 'E106'
  },

  INVALID_UUID: {
    message: 'Invalid UUID',
    status: 401,
    code: 'E108'
  },

  // INVALID_POLICY_NUMBER: {
  //   message: 'Invalid Policy Number',
  //   status: 401,
  //   code: 'T109'
  // },

  // JWT Tokens
  INVALID_TOKEN: {
    message: 'Invalid Token',
    status: 401,
    code: 'T110'
  },

  EXPIRED_TOKEN: {
    message: 'Expired Token',
    status: 401,
    code: 'T111'
  },

  NOT_FOUND_TOKEN: {
    message: 'Token not found',
    status: 401,
    code: 'T404'
  },

  NOT_VERIFIED_TOKEN: {
    message: 'Not verified Token',
    status: 401,
    code: 'T112'
  },

  // NOT_FOUND_CUSTOMER: {
  //   message: 'Customer not found',
  //   status: 401,
  //   code: 'C404'
  // },

  // DOCUMENT_FOUND_CUSTOMER: {
  //   message: 'Document not found',
  //   status: 401,
  //   code: 'DOC404'
  // },

  // NOT_FOUND_DIGITAL_ACCOUNT: {
  //   message: 'Digital Account not found',
  //   status: 401,
  //   code: 'D404'
  // },

  INVALID_CREDENTIALS: {
    message: 'Username and password is incorrect',
    status: 401,
    code: 'D405'
  },

  REQUIRED_MISSING: {
    message: 'Required value missing',
    status: 401,
    code: 'V404'
  },

  // Password errors
  BASIC_PASSWORD_ERROR_SG: {
    message: 'Password must be a string and 8-20 character in length',
    status: 412,
    code: 'P413'
  },

  NEW_PASSWORD_TOO_SHORT: {
    message: 'New password is too short',
    status: 412,
    code: 'P412'
  },

  NEW_PASSWORD_REPEAT_OF_PREVIOUS: {
    message: 'New password is a repeat of an old password',
    status: 412,
    code: 'P409'
  },

  NEW_PASSWORD_INVALID_CHARACTERS_PH: {
    message: 'Password must be 8-18 character in length including at least one number, at least one letter and one special character.',
    status: 412,
    code: 'P410'
  },

  NEW_PASSWORD_INVALID_CHARACTERS_SG: {
    message: 'Password must be >=8 characters in length including at least one number, at least one capital letter and at least one lower case letter.',
    status: 412,
    code: 'P410'
  },
  NEW_PASSWORD_INVALID_CHARACTERS_HK: {
    message: 'Password must be 8-16 characters in length, no spaces, no duplicate characters, including at least three of the following criterias: one number, one lowercase letter, one uppercase letter or one special character.',
    status: 412,
    code: 'P410'
  },
  EXISTING_DIGITAL_ACCOUNT: {
    message: 'Digital Account already exists',
    status: 409,
    code: 'A409'
  },

  ORACLE_ERROR: {
    message: 'Oracle Error',
    status: 500,
    code: 'O500'
  },

  // MongoDB
  MONGO_ERROR: {
    message: 'MongoDB Error',
    status: 500,
    code: 'M500'
  },

  // LDAP
  LDAP_CONNECT: {
    message: '',
    'code': 'AFLD101',
    'status': 503
  },

  LDAP_CONNECT_ACCOUNT_LOCKED: {
    message: '',
    code: 'AFDALD102',
    status: 401
  },

  LDAP_AUTHENTICATE: {
    message: 'LDAP Authentication Error',
    code: 'AFLD401',
    status: 401
  },

  LDAP_UPDATE_PASSWORD: {
    message: 'LDAP update password error',
    status: 500,
    code: 'AFLD402'
  },

  LDAP_ADD_USER: {
    message: 'LDAP add user error',
    status: 500,
    code: 'AFLD403',
    meta: {
      system: 'Unable to add new user to LDAP'
    }
  },

  LDAP_GENERIC_ERROR: {
    message: 'Generic LDAP error',
    status: 500,
    code: 'AFLD404'
  },

  MONGODB_CONNECT: {
    message: 'MongoDB Connect Error',
    code: 'AFDAMD103',
    status: 500
  },

  EXISTING_UUID: {
    message: 'UUID already exists',
    code: 'ES001',
    status: 401
  },

  ENCRYPTION_ERROR: {
    message: 'Encryption failed',
    code: 'ES002',
    status: 401
  },

  DECRYPTION_ERROR: {
    message: 'Decryption failed',
    code: 'ES003',
    status: 401
  },

  // Network
  NETWORK_ERROR: {
    message: 'Network Error',
    code: 'NET401',
    status: 401
  },

  BAD_GATEWAY: {
    message: 'Bad Gateway',
    code: 'NET001',
    status: 502
  },

  SERVICE_UNAVAILABLE: {
    message: 'Service unavailable',
    code: 'NET003',
    status: 503
  },

  GATEWAY_TIMEOUT: {
    message: 'Gateway timeout',
    code: 'NET002',
    status: 504
  },

  UNKNOWN_REMOTE_ADDRESS: {
    message: 'Unknown remote address',
    code: 'NET404',
    status: 500
  },

  // Response
  UNMASKED_RESPONSE_DETECTED: {
    message: 'Unmasked response detected',
    code: 'R001',
    status: 500
  },

  INVALID_RESPONSE: {
    message: 'Response is invalid',
    code: 'R002',
    status: 500
  },

  // Oracle
  INVALID_ORACLE_RESPONSE: {
    message: 'Oracle response is invalid',
    code: 'ORA001',
    status: 500
  },

  DATA_NOT_FOUND: {
    message: 'No data was found for the given Document Id',
    code: 'ORA002',
    status: 422
  },

  // validator
  INVALID_CONSTRAINTS: {
    message: 'Validate.js constraints are invalid',
    status: 422,
    code: 'E101'
  },

  MISSING_CONSTRAINTS: {
    message: 'Validate.js constraints are missing',
    status: 422,
    code: 'E102'
  },


  JSON_MAPPING_ERROR: {
    message: 'Error mapping JSON object.',
    code: 'J001',
    status: 500
  }

}

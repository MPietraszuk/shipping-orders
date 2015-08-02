'use strict';
var _ = require('lodash');

var ErrorList = {
  ORDER_NOT_FOUND: {
    status: 404,
    message: 'No order with the given info was found.'
  },
  DB_ERROR: {
    status: 500,
    message: 'An unknown error happend.'
  },
  UNKNOWN_ERROR: {
    status: 500,
    message: 'An unknown error happend.'
  }
};

function getMessage(key) {
  if (_.isObject(ErrorList[key])) {
    return ErrorList[key].message;
  }
  return null;
}

function Exception(key, err) {
  if (!(this instanceof Exception)) {
    return new Exception(key, err);
  }

  var argsLen = arguments.length,
    unknown = getMessage('UNKNOWN_ERROR'),
    errorType;

  if (argsLen === 0) {
    key = 'UNKNOWN_ERROR';
    err = new Error(unknown);
  } else if (argsLen === 1) {
    if (_.isError(key)) {
      err = key;
      key = 'UNKNOWN_ERROR';
    } else {
      // Avoid getting invalid key values
      if (!_.has(ErrorList, key)) {
        key = 'UNKNOWN_ERROR';
      }
      err = new Error(unknown);
    }
  }

  // We have made sure key is one of the valid ErrorList attributes
  // this will add this.status and this.message
  _.assign(this, ErrorList[key]);

  this.key = key;
  this.err = err;
}

Exception.new = Exception;

Exception.errorResponse = function theError(res) {
  return function (exp) {
    return res.status(exp.status).send(exp.err);
  };
};

module.exports = Exception;
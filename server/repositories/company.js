'use strict';

var _ = require('lodash'),
  Q = require('q'),
  Order = require('../models/order'),
  Exception = require('../utils/exception'),
  companyRepository = {};

companyRepository.find = function () {
  var deferred = Q.defer();
  Order
    .distinct('companyName')
    .exec(function (err, list) {
      if (err) {
        return deferred.reject(Exception.new('DB_ERROR', err));
      }
      deferred.resolve(list);
    });
  return deferred.promise;
};

companyRepository.findOrders = function (companyName) {
  var deferred = Q.defer();
  Order
    .find({
      companyName: companyName
    })
    .exec(function (err, orders) {
      if (err) {
        return deferred.reject(Exception.new('DB_ERROR', err));
      }
      deferred.resolve(orders);
    });
  return deferred.promise;
};

module.exports = companyRepository;
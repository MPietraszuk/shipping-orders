'use strict';

var _ = require('lodash'),
  Q = require('q'),
  Order = require('../models/order'),
  Exception = require('../utils/exception'),
  orderRepository = {};

orderRepository.find = function () {
  var deferred = Q.defer();
  Order.find(function (err, orders) {
    if (err) {
      return deferred.reject(Exception.new('DB_ERROR', err));
    }
    deferred.resolve(orders);
  });
  return deferred.promise;
};

orderRepository.findByAddress = function (customerAddress) {
  var deferred = Q.defer();
  Order
    .find({
      customerAddress: customerAddress
    })
    .exec(function (err, orders) {
      if (err) {
        return deferred.reject(Exception.new('DB_ERROR', err));
      }
      deferred.resolve(orders);
    });
  return deferred.promise;
};

orderRepository.findAddresses = function () {
  var deferred = Q.defer();
  Order
    .find()
    .distinct('customerAddress')
    .exec(function (err, addresses) {
      if (err) {
        return deferred.reject(Exception.new('DB_ERROR', err));
      }
      deferred.resolve(addresses);
    });
  return deferred.promise;
};

orderRepository.findOne = function (orderId) {
  var deferred = Q.defer();
  Order.findById(orderId, function (err, order) {
    if (err) {
      return deferred.reject(Exception.new('DB_ERROR', err));
    }
    if (!order) {
      return deferred.reject(Exception.new('ORDER_NOT_FOUND'));
    }
    deferred.resolve(order);
  });
  return deferred.promise;
};

orderRepository.create = function (newOrder) {
  var deferred = Q.defer();
  Order.create(newOrder, function (err, order) {
    if (err) {
      return deferred.reject(Exception.new('DB_ERROR', err));
    }
    deferred.resolve(order);
  });
  return deferred.promise;
};

orderRepository.update = function (orderId, newOrder) {
  var deferred = Q.defer();
  if (newOrder._id) {
    delete newOrder._id;
  }
  Order.findById(orderId, function (err, order) {
    if (err) {
      return deferred.reject(Exception.new('DB_ERROR', err));
    }
    if (!order) {
      return deferred.reject(Exception.new('ORDER_NOT_FOUND'));
    }
    var updated = _.merge(order, newOrder);
    updated.save(function (err) {
      if (err) {
        return deferred.reject(Exception.new('DB_ERROR', err));
      }
      deferred.resolve(order);
    });
  });
  return deferred.promise;
};

orderRepository.remove = function (orderId) {
  var deferred = Q.defer();
  Order.findById(orderId, function (err, order) {
    if (err) {
      return deferred.reject(Exception.new('DB_ERROR', err));
    }
    if (!order) {
      return deferred.reject(Exception.new('ORDER_NOT_FOUND'));
    }
    order.remove(function (err) {
      if (err) {
        return deferred.reject(Exception.new('DB_ERROR', err));
      }
      deferred.resolve();
    });
  });
  return deferred.promise;
};

orderRepository.drop = function () {
  var deferred = Q.defer();
  Order.remove({}, function (err) {
    if (err) {
      return deferred.resolve(Exception.new('DB_ERROR', err));
    }
    deferred.resolve();
  });
  return deferred.promise;
};

module.exports = orderRepository;
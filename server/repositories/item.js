'use strict';

var _ = require('lodash'),
  Q = require('q'),
  Order = require('../models/order'),
  Exception = require('../utils/exception'),
  itemRepository = {};

itemRepository.find = function (companyName) {
  var deferred = Q.defer();

  Order
    .find()
    .select('orderedItem')
    .exec(function (err, items) {
      if (err) {
        return deferred.reject(Exception.new('DB_ERROR', err));
      }
      var items = _.reduce(items, function (accumulator, order) {
        var item = _.find(accumulator, {
          name: order.orderedItem
        });
        if (!item) {
          item = {
            name: order.orderedItem,
            count: 0
          };
          accumulator.push(item);
        }
        item.count += 1;
        return accumulator;
      }, []);

      items = _(items)
        .sortBy('count')
        .reverse()
        .value();

      deferred.resolve(items);
    });

  return deferred.promise;
};

module.exports = itemRepository;
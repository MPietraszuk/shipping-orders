(function () {
  'use strict';
  /**
   * @ngdoc service
   * @name shipping.OrderService
   * @description
   * # OrderService
   * Factory in the shipping module.
   */
  angular.module('shipping')
    .factory('OrderService', ['$http', 'options', OrderService]);

  function OrderService($http, options) {
    return {
      find: function () {
        return $http.get(options.api.order);
      },
      findByAddress: function (address) {
        return $http.get(options.api.order + 'from/' + address);
      },
      findAddresses: function () {
        return $http.get(options.api.order + 'addresses');
      },
      findOne: function (orderId) {
        return $http.get(options.api.order + orderId);
      },
      create: function (newOrder) {
        return $http.post(options.api.order, newOrder);
      },
      update: function (newOrder) {
        return $http.put(options.api.order + newOrder._id, newOrder);
      },
      remove: function (orderId) {
        return $http.delete(options.api.order + orderId);
      },
      findItems: function () {
        return $http.get(options.api.item);
      }
    };
  }
}());
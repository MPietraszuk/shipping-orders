(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name shipping.controller:OrderCtrl
   * @description The main controller of the app
   * # OrderCtrl
   * Controller of the shipping
   */
  angular
    .module('shipping')
    .controller('OrderCtrl', ['$scope', '$rootScope', '$stateParams', 'OrderService', 'CompanyService', '$mdDialog', OrderCtrl]);

  function OrderCtrl($scope, $rootScope, $stateParams, OrderService, CompanyService, $mdDialog) {
    var that = this;
    this.$stateParams = $stateParams;
    this.OrderService = OrderService;
    this.CompanyService = CompanyService;
    this.$mdDialog = $mdDialog;

    this.orders = [];
    this.allOrders = [];
    this.addresses = [];
    this.items = [];

    $rootScope.$on('select:company', function (event, orders) {
      that.orders = orders;
    });

    $rootScope.$on('show:addOrder', function (event, e) {
      that.showAddDialog(e);
    });

    $scope.$watch(function () {
      return that.selectedAddress;
    }, function (newAddress) {
      console.log('New Address got selected:', newAddress);
      if (newAddress) {
        that.mode = 'orders';
        that.findByAddress(newAddress);
      }
    });

    this.mode = $stateParams.mode || 'orders';
    if (this.mode === 'items') {
      this.loadItems();
    } else {
      this.load();
    }
    this.loadAddresses();
  }

  OrderCtrl.prototype.load = function () {
    if (this.$stateParams.company) {
      this.selectCompany(this.$stateParams.company);
    } else {
      this.loadAll();
    }
  };

  OrderCtrl.prototype.selectCompany = function (companyName) {
    var that = this;
    this.mode = 'orders';

    that.selected = companyName;

    that
      .CompanyService
      .findOrders(companyName)
      .success(function (orders) {
        that.orders = orders;
      })
      .error(function (err) {
        console.error('An error happened while loading companies:', err);
      });
  };

  OrderCtrl.prototype.loadAll = function () {
    var that = this;

    that
      .OrderService
      .find()
      .success(function (orders) {
        that.orders = orders;
        that.allOrders = orders;
      })
      .error(function (err) {
        console.error('An error happened while loading orders:', err);
      });
  };

  OrderCtrl.prototype.loadAddresses = function () {
    var that = this;

    that
      .OrderService
      .findAddresses()
      .success(function (addresses) {
        that.addresses = addresses;
      })
      .error(function (err) {
        console.error('An error happened while loading addresses:', err);
      });
  };

  OrderCtrl.prototype.findByAddress = function (newAddress) {
    var that = this;

    that
      .OrderService
      .findByAddress(newAddress)
      .success(function (orders) {
        that.orders = orders;
      })
      .error(function (err) {
        console.error('An error happened while loading orders:', err);
      });
  };

  OrderCtrl.prototype.loadItems = function () {
    var that = this;

    that
      .OrderService
      .findItems()
      .success(function (items) {
        that.items = items;
      })
      .error(function (err) {
        console.error('An error happened while loading orders:', err);
      });
  };

  OrderCtrl.prototype.addOrder = function (newOrder) {
    var that = this;
    if (!newOrder.orderId) {
      newOrder.orderId = that.allOrders.length + 1;
    }

    that
      .OrderService
      .create(newOrder)
      .success(function (newOrder) {
        that.load();
        that.loadItems();
        console.log('New Order just got created:', newOrder);
      })
      .error(function (err) {
        console.error('An error happened while creating a new order:', err);
      });
  };

  OrderCtrl.prototype.deleteOrder = function (order) {
    this
      .OrderService
      .remove(order._id)
      .success(function () {
        console.log('An Order just got removed:', order);
      })
      .error(function (err) {
        console.error('An error happened while removing an order:', err);
      });
  };

  OrderCtrl.prototype.showAddDialog = function (e) {
    var that = this;

    this.$mdDialog.show({
      templateUrl: 'views/add-order-dialog.html',
      parent: angular.element(document.body),
      targetEvent: e,
    })
      .then(function (newOrder) {
        console.log('newOrder:', newOrder);
        that.addOrder(newOrder);
      }, function () {
        console.log('You cancelled the dialog.');
      });
  };
}());
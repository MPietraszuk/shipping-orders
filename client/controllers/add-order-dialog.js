(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name shipping.controller:AddOrderDialogCtrl
   * @description The dialog controller for adding a new order
   * # AddOrderDialogCtrl
   * Controller of the shipping
   */
  angular
    .module('shipping')
    .controller('AddOrderDialogCtrl', ['$rootScope', '$mdDialog', AddOrderDialogCtrl]);

  function AddOrderDialogCtrl($rootScope, $mdDialog) {
    this.$rootScope = $rootScope;
    this.$mdDialog = $mdDialog;

    // Sample items data which should be loaded from db
    this.items = [
      'Macbook',
      'Book "Guide to Hamburg"',
      'Book "Cooking 101"',
      'Inline Skates',
      'Playstation',
      'Flux compensator'
    ];

    // Sample companies data which should be loaded from db
    this.companies = [
      'SuperTrader',
      'Cheapskates',
      'MegaCorp',
      'Google',
      'Apple',
      'Samsung'
    ];
  }

  AddOrderDialogCtrl.prototype.hide = function () {
    this.$mdDialog.hide();
  };

  AddOrderDialogCtrl.prototype.cancel = function () {
    this.$mdDialog.cancel();
  };

  AddOrderDialogCtrl.prototype.ok = function () {
    this.$mdDialog.hide(this.order);
  };
}());
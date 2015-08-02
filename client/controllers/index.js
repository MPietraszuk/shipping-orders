(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name shipping.controller:IndexCtrl
   * @description The root controller used in index.html
   * # IndexCtrl
   * Controller of the shipping
   */
  angular
    .module('shipping')
    .controller('IndexCtrl', ['$rootScope', 'CompanyService', '$mdBottomSheet', '$mdSidenav', '$q', IndexCtrl]);

  function IndexCtrl($rootScope, CompanyService, $mdBottomSheet, $mdSidenav, $q) {
    this.$rootScope = $rootScope;
    this.CompanyService = CompanyService;
    this.$mdBottomSheet = $mdBottomSheet;
    this.$mdSidenav = $mdSidenav;
    this.$q = $q;

    this.companies = [];

    this.load();
  }

  IndexCtrl.prototype.load = function () {
    var that = this;

    that
      .CompanyService
      .find()
      .success(function (companies) {
        that.companies = companies;
      })
      .error(function (err) {
        console.error('An error happened while loading companies:', err);
      });
  };

  IndexCtrl.prototype.toggleList = function () {
    var that = this,
      pending = that.$mdBottomSheet.hide() || that.$q.when(true);

    pending.then(function () {
      that.$mdSidenav('left').toggle();
    });
  };

  IndexCtrl.prototype.selectCompany = function (companyName) {
    // this could be used to add selected style to the latest clicked company
    this.selected = companyName;
  };

  IndexCtrl.prototype.showAddDialog = function (e) {
    this.$rootScope.$broadcast('show:addOrder', e);
  };
}());
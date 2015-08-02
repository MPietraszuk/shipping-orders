(function () {
  'use strict';
  /**
   * @ngdoc service
   * @name shipping.CompanyService
   * @description
   * # CompanyService
   * Factory in the shipping module.
   */
  angular.module('shipping')
    .factory('CompanyService', ['$http', 'options', CompanyService]);

  function CompanyService($http, options) {
    return {
      find: function () {
        return $http.get(options.api.company);
      },
      findOrders: function (companyName) {
        return $http.get(options.api.company + companyName);
      }
    };
  }
}());
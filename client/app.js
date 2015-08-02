(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name shipping
   * @description
   * # shipping
   *
   * Main module of the application.
   */
  angular
    .module('shipping', [
      'ngMaterial',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ui.router',
    ])
    .value('options', {
      api: {
        order: '/api/orders/',
        company: '/api/companies/',
        item: '/api/items/'
      }
    })
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$mdIconProvider',
      function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
        $urlRouterProvider
          .otherwise('/');

        $stateProvider
          .state('orders', {
            url: '/:mode',
            templateUrl: 'views/orders.html'
          })
          .state('company', {
            url: '/company/:company',
            templateUrl: 'views/orders.html'
          });

        // couple of sample svg icons borrowed from google
        $mdIconProvider
          .defaultIconSet("./assets/svg/avatars.svg", 128)
          .icon("menu", "./assets/svg/menu.svg", 24)
          .icon("share", "./assets/svg/share.svg", 24)
          .icon("google_plus", "./assets/svg/google_plus.svg", 512)
          .icon("hangouts", "./assets/svg/hangouts.svg", 512)
          .icon("twitter", "./assets/svg/twitter.svg", 512)
          .icon("phone", "./assets/svg/phone.svg", 512);

        $mdThemingProvider.theme('default')
          .primaryPalette('brown')
          .accentPalette('red');
      }
    ]);
}());
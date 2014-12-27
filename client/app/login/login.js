'use strict';
angular.module('planningPokerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controllerAs : 'loginCtrl',
        controller: 'LoginCtrl'
      });
  });
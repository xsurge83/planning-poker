'use strict';

angular.module('planningPokerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controllerAs : 'mainCtrl',
        controller: 'MainCtrl'
      });
  });
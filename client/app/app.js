'use strict';

angular.module('planningPokerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'planningPokerApp.components.pokerCard',
  'planningPokerApp.components.flyout',
  'planningPokerApp.components.inputfields'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/login');

    $locationProvider.html5Mode(true);
  });




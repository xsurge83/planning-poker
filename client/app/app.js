(function () {
  'use strict';

  angular.module('planningPokerApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'planning.components'
  ])
    .run(setupApp)
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider
        .otherwise('/login');
      $locationProvider.html5Mode(true);
    });


  setupApp.$inject = ['$rootScope', '$location', 'User'];

  function setupApp($rootScope, $location, User) {
    $rootScope.$on('$stateChangeStart', function checkForLoginUser(){
      if(!User.isLoggedIn()) {
        $location.path('/login');
      }
    })
  }

})();




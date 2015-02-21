'use strict';

angular.module('planningPokerApp')
  .controller('NavbarCtrl', function ($scope, $location, User) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    $scope.user = User.getLoggedInUser();
  });

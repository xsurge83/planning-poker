'use strict';

(function () {

  angular.module('planningPokerApp')
    .factory('User', UserFactory);

  var LOCAL_STORAGE_KEY = 'LOGGED_IN_USER';

  UserFactory.$inject = ['$window']

  function UserFactory($window) {
    var loggedUser = JSON.parse($window.localStorage.getItem(LOCAL_STORAGE_KEY));
    function User(name, group) {
      this.name = name;
      this.group = group;
    }

    User.login = function login(user){
      loggedUser = user;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    };

    User.getLoggedInUser = function getLoggedInUser(){
      return loggedUser;
    };

    User.isLoggedIn = function(){
      return !!User.getLoggedInUser();
    };

    return User;
  }


})();




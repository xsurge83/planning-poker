'use strict';

(function () {

  angular.module('planningPokerApp')
    .factory('User', UserFactory);

  function UserFactory() {
    var loggedUser = null;
    function User(name, group) {
      this.name = name;
      this.group = group;
    }

    User.login = function login(user){
      loggedUser = user;
    };

    User.getLoggedInUser = function getLoggedInUser(){
      return loggedUser;
    };

    return User;
  }


})();




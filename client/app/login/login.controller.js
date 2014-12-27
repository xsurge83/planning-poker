'use strict';

(function () {

  angular.module('planningPokerApp')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($state, User) {
    this.$state = $state;
    this.User = User;
    this.user = new User();

  }

  LoginCtrl.prototype.login = function login(){
    this.User.login(this.user);
    this.$state.go('main');
  };

})();




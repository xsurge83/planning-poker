'use strict';

(function () {

  angular.module('planningPokerApp')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($state, User, groupChat) {
    this.$state = $state;
    this.User = User;
    this.user = new User();
    this.groupChat = groupChat;
  }

  LoginCtrl.prototype.login = function(){
    var _this = this;
    _this.groupChat
      .join(_this.user.group, _this.user)
      .then(function(){
        _this.User.login(_this.user);
        _this.$state.go('main');
      });
  };

})();




'use strict';

(function () {

  angular.module('planningPokerApp')
    .factory('socket', SocketFactory)
    .factory('groupChat', GroupChat);


  function GroupChat($q, socket){
    var users = [];
    return {
      getCurrentUsers : function(){
        return users;
      },

      join : function(room, user){
        return $q(function(resolve, reject){
          socket.emit('join room', {room : room, user : user});
          socket.on('joined', function(joinedUsers){
            users = joinedUsers;
            resolve(joinedUsers);
          });
        })
      }
    }
  }

 function SocketFactory($rootScope) {
    var socket = io.connect('localhost:9000/chat');
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  };
})();




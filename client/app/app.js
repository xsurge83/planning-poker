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


//var chat = io.connect('http://localhost/chat');
//
//chat.on('connect', function (socket) {
//  socket.join('some room', function(){
//    debugger;
//    chat.to('some room').emit('message', 'hi room');
//  });
//
//});
//chat.on('a message', function(data){
//  debugger;
//})
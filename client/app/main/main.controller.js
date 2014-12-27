'use strict';

(function () {

  var CARDS;
  angular.module('planningPokerApp')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($rootScope,  TASK_ADDED_EVENT, TASK_REMOVED_EVENT) {
    var _this = this;
    this.selectedCard;
    this.cards = CARDS;
    this.showTasks = false;
    this.currentTask = null;

    $rootScope.$on(TASK_ADDED_EVENT, function(event, task){
      if(!_this.currentTask && _this.currentTask != task){
        _this.currentTask = task;
      }
    });
    $rootScope.$on(TASK_REMOVED_EVENT, function(event, task){
      if(_this.currentTask === task){
        _this.currentTask = null;
      }
    });
  }

  MainCtrl.prototype.toggleTasks = function toggleTasks(){
    this.showTasks = !this.showTasks;
  }



  CARDS = [
    {
      value: '?'
    },
    {
      value: '0'
    },
    {
      value: '1/2'
    },
    {
      value: '1'
    },
    { value: '2'},
    { value: '3'},
    { value: '5'},
    { value: '8'},
    { value: '13'},
    { value: '20'},
    { value: '40'},
    { value: '100'},
    { value: '~'}
  ];

})();




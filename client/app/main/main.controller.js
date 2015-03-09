'use strict';
(function () {

  var CARDS;
  angular.module('planningPokerApp')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($rootScope, TASK_ADDED_EVENT, TASK_REMOVED_EVENT, TaskService, groupChat) {
    var _this = this;
    this.selectedCard;
    this.cards = CARDS;
    this.showTasks = false;
    this.currentTask = null;
    this.taskService = TaskService;
    this.groupChat = groupChat;
    this.startCurrentTask = false;

    this.users = groupChat.getCurrentUsers();

    groupChat.onNewMember(function(user){
      _this.users.push(user);
    });

    $rootScope.$on(TASK_ADDED_EVENT, function (event, task) {
      if (!_this.currentTask && _this.currentTask != task) {
        _this.currentTask = task;
      }
    });
    $rootScope.$on(TASK_REMOVED_EVENT, function (event, task) {
      if (_this.currentTask === task) {
        _this.currentTask = null;
      }
    });
  }

  MainCtrl.prototype.toggleTasks = function toggleTasks() {
    this.showTasks = !this.showTasks;
  }

  MainCtrl.prototype.nextTask = function nextTask() {
    this.currentTask = this.taskService.nextTask(this.currentTask);
  };

  MainCtrl.prototype.previousTask = function previousTask() {
    this.currentTask = this.taskService.previousTask(this.currentTask);
  };

  MainCtrl.prototype.addTask = function addTask(task) {
    this.taskService.addTask(task);
  };

  MainCtrl.prototype.startTask = function(){
    this.startCurrentTask = true;
  };

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
    {value: '2'},
    {value: '3'},
    {value: '5'},
    {value: '8'},
    {value: '13'},
    {value: '20'},
    {value: '40'},
    {value: '100'},
    {value: '~'}
  ];

})();




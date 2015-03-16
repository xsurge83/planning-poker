'use strict';

(function () {
  var ids = 0;

  angular.module('planningPokerApp')
    .service('TaskService', TaskService)
    .constant('TASK_ADDED_EVENT', 'Task:added')
    .constant('TASK_REMOVED_EVENT', 'Task:removed');

  function TaskService($rootScope, socket, TASK_ADDED_EVENT, TASK_REMOVED_EVENT) {
    var _this = this;
    this.$rootScope = $rootScope;
    this.TASK_REMOVED_EVENT  = TASK_REMOVED_EVENT;
    this.socket = socket;
    this.tasks = [];

    socket.on('task:added', function(task){
      _this.tasks.push(task);
      $rootScope.$emit(TASK_ADDED_EVENT, task);
    });

    socket.on('timer:started', function(){
      $rootScope.$emit('TASK_TIMER_STARTED');
    });

    socket.on('task:update-new', function(task){
      _this.tasks.push(task);
      $rootScope.$apply();
    });
  }

  TaskService.prototype.addTask = function addTask(newTask) {
    var task = {text: newTask, complete: false};
    this.socket.emit('task:add', task);
  };

  TaskService.prototype.timeTask = function(task){
    this.socket.emit('timer:start', task);
  };

  TaskService.prototype.removeTask = function removeTask(index) {
    var removedTask = this.tasks[index];
    this.tasks.splice(index, 1)
    this.$rootScope.$emit(this.TASK_REMOVED_EVENT,  removedTask);
  };

  //TaskService.prototype.scoreTask = function(user, score){
  //  this.socket.emit('task:add', task);
  //};


  TaskService.prototype.clearAll = function clearAll() {
    this.tasks = [];
  };

  TaskService.prototype.nextTask = function nextTask(task){
    var taskIndex = this.tasks.indexOf(task), nextTaskItem;
    if(taskIndex >=0 && taskIndex +1 < this.tasks.length) {
      nextTaskItem = this.tasks[taskIndex + 1];
    }
    return nextTaskItem;
  };

  TaskService.prototype.previousTask = function previousTask(task){
    var taskIndex = this.tasks.indexOf(task), prevTask;
    if(taskIndex >=0 && taskIndex - 1 >= 0) {
      prevTask = this.tasks[taskIndex - 1];
    }
    return prevTask;
  };

})();

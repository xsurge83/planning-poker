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
    this.TASK_ADDED_EVENT = TASK_ADDED_EVENT;
    this.TASK_REMOVED_EVENT  = TASK_REMOVED_EVENT;
    this.socket = socket;
    this.tasks = [];


    socket.on('task:added', function(tasks){
      this.tasks = tasks;
      $rootScope.$apply();
    });

    socket.on('task:update-new', function(task){
      debugger;
      _this.tasks.push(task);
    });
  }

  TaskService.prototype.addTask = function addTask(newTask) {
    var task = {id : ids++, text: newTask, complete: false};
    this.tasks.push(task);
    this.$rootScope.$emit(this.TASK_ADDED_EVENT, task);
    this.socket.emit('task:added', task);
  };

  TaskService.prototype.removeTask = function removeTask(index) {
    var removedTask = this.tasks[index];
    this.tasks.splice(index, 1)
    this.$rootScope.$emit(this.TASK_REMOVED_EVENT,  removedTask);
  };

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

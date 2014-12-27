'use strict';

(function () {

  angular.module('planningPokerApp')
    .service('TaskService', TaskService)
    .constant('TASK_ADDED_EVENT', 'Task:added')
    .constant('TASK_REMOVED_EVENT', 'Task:removed');

  function TaskService($rootScope, TASK_ADDED_EVENT, TASK_REMOVED_EVENT) {
    this.$rootScope = $rootScope;
    this.TASK_ADDED_EVENT = TASK_ADDED_EVENT;
    this.TASK_REMOVED_EVENT  = TASK_REMOVED_EVENT;
    this.tasks = [];
  }

  TaskService.prototype.addTask = function addTask(newTask) {
    var task = {text: newTask, complete: false};
    this.tasks.push(task);
    this.$rootScope.$emit(this.TASK_ADDED_EVENT, task);
  };

  TaskService.prototype.removeTask = function removeTask(index) {
    var removedTask = this.tasks[index];
    this.tasks.splice(index, 1)
    this.$rootScope.$emit(this.TASK_REMOVED_EVENT,  removedTask);
  };

  TaskService.prototype.clearAll = function clearAll() {
    this.tasks = [];
  };

})();
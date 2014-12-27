'use strict';

(function () {

  angular.module('planningPokerApp')
    .controller('TaskCtrl', TaskCtrl);

  TaskCtrl.$inject = ["TaskService"];

  function TaskCtrl(taskService) {
    this.taskService = taskService;
    this.tasks = taskService.tasks ;
    this.newTask = "";
  }

  TaskCtrl.prototype.addTask = function addTask() {
    this.taskService.addTask(this.newTask)
    this.newTodo = "";
  };

  TaskCtrl.prototype.removeTask = function removeTask(index) {
    this.taskService.removeTask(index);
  };

  TaskCtrl.prototype.clearAll = function clearAll() {
    this.taskService.clearAll();
  };

})();
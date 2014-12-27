'use strict';

(function () {

  angular.module('planningPokerApp')
    .controller('TasksCtrl', TasksCtrl);

  function TasksCtrl() {
    this.tasks = [];
    this.newTodo = "";
  }

  TasksCtrl.prototype.addTodo = function addTodo() {
    this.tasks.push({text: this.newTodo, complete: false});
    this.newTodo = "";
  };

  TasksCtrl.prototype.removeTodo = function removeTodo(index) {
    this.tasks.splice(index, 1);
  };

  TasksCtrl.prototype.clearAll = function clearAll() {
    this.tasks = [];
  };

})();
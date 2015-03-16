var _ = require('underscore');

var nextTaskId = 0;
function ChatRooms() {
  this.rooms = {};
}

ChatRooms.prototype.getRoomUsers = function (room) {
  return this.rooms[room].users;
};

ChatRooms.prototype.getTasks = function (room) {
  this.rooms[room].tasks;
};

ChatRooms.prototype.addTask = function(room, task){
  task.id = nextTaskId++;
  return this.rooms[room].tasks.push(task);
};

ChatRooms.prototype.addUserToRoom = function (room, user) {
  var existingUser;
  if (this.rooms.hasOwnProperty(room)) {
    existingUser = _.findWhere(this.rooms[room].users, {name: user.name});
    if (!existingUser) {
      this.rooms[room].users.push(user);
    }
  }
  else {
    this.rooms[room] = {
      users: [user],
      tasks: []
    }
  }
}

module.exports = ChatRooms;

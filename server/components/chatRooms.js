var _ = require('underscore');

function ChatRooms(){
  this.rooms = {};
}

ChatRooms.prototype.getRoomUsers = function(room){
  return this.rooms[room];
}

ChatRooms.prototype.addUserToRoom = function(room, user){
  var existingUser;
  if(this.rooms.hasOwnProperty(room)){
    existingUser = _.findWhere(this.rooms[room], {name : user.name});
    if(!existingUser){
      this.rooms[room].push(user);
    }

  } else {
    this.rooms[room] = [user];
  }
}

module.exports = ChatRooms;

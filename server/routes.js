/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var ChatRooms = require('./components/chatRooms')

module.exports = function(app, io) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });


  var chatRooms = new ChatRooms();

  var chat = io.of('/chat');
    chat.on('connection', function(socket) {

      socket.on('join:room', function(data){
        console.log('join user ' + data.user.name +' in room ' + data.room);

        chatRooms.addUserToRoom(data.room, data.user);
        socket.room = data.room;
        socket.join(data.room);
        socket.emit('chat:members', chatRooms.getRoomUsers(data.room));
        socket.emit('chat:tasks', chatRooms.getTasks(data.room));
        socket
          .broadcast
          .to(data.room)
          .emit('update:newmember', data.user);
      });

      socket.on('chat:rejoin', function(data){
        socket.emit('chat:members', chatRooms.getRoomUsers(data.room))
      });

      socket.on('task:add', function(task){
        console.log('task added to room ' + socket.room);

        chatRooms.addTask(socket.room, task);
        socket.emit('task:added', task);
        socket.broadcast.to(socket.room).emit('task:added', task)
      });

      socket.on('timer:start', function(task){
        socket.emit('timer:started', task);
        socket.broadcast.to(socket.room).emit('timer:started', task);
      });

      //socket.on('task-score:add', function(score){
      //  socket.broadcast.to(socket.room).emit('task-score:added', score);
      //});
    });
};

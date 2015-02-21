/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var _ = require('underscore');

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

  /**
   * Use Cases
   * - Join room
   *  1. join room
   *  2. joined room
   *  3. broadcast
   */
  var rooms = {};
  function addUserToRoom(room, user){
    var existingUser;
    if(rooms.hasOwnProperty(room)){
      existingUser = _.findWhere(rooms[room], {name : user.name});
      if(!existingUser){
        rooms[room].push(user);
      }

    } else {
      rooms[room] = [user];
    }
  }

  var chat = io.of('/chat');

    chat.on('connection', function(socket) {
      socket.on('join room', function(data){
        console.log('join user ' + data.user.name +' in room ' + data.room);

        addUserToRoom(data.room, data.user);

        socket.join(data.room);
        socket.emit('joined', rooms[data.room]);
        socket
          .broadcast
          .to(data.room)
          .emit('message', 'user ' + data.user + ' joined room.');
      });

      socket.on('updatechat', function(username, data){

      });

      socket.on('message', function(data) {
        socket.broadcast.send(data);
      });
    });
};

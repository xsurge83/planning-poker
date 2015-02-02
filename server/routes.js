/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

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

  var chat = io
    .of('/chat')
    .on('connection', function (socket) {
      socket.emit('a message', {
        that: 'only'
        , '/chat': 'will get'
      });
      chat.emit('a message', {
        everyone: 'in'
        , '/chat': 'will get'
      });
      chat.on('hi', function(data){
        console.log(data);
      })
    });
};

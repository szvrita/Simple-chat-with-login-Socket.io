var express = require('express');
var router = express.Router();
var path = require('path');

var app = express();
var server = require('http').Server(app)
server.listen(2000);
var io = require('socket.io')(server);


io.on('connection', function (socket) {
  console.log('server connected');


  socket.on('chat', function (data) {
      io.sockets.emit('chat', data);
      });
  socket.on('typing', function (data) {
     socket.broadcast.emit('typing', data);


  });

});

module.exports = router;

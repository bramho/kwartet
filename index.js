var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var username = "Test";

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
   res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
   socket.on('username', function(username) {
     username = username;
  });

   socket.emit('user connected', { userConnect: username + ' connected' });

   socket.on('disconnect', function(){
    socket.emit('disconnected', { disconnected: 'A user disconnected'});
  });

  socket.on('chat message', function(msg) {
     console.log(msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function() {
   console.log('Listening on 3000');
})

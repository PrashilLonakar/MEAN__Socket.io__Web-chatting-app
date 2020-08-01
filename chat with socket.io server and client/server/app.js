var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

var io = require('socket.io').listen(server);

io.on('connection', (socket) => {
    console.log('socket Opened');

    socket.on('client_new_msg',(data)=>{
        console.log('New Message (for same Room)',data)
        socket.join(data.room);
        socket.in(data.room).broadcast.emit("server_new_message", {
          msg: data.msg ,
          user: data.user,
          date: new Date(),
         }); 
    })

    socket.on('new_joinee',(data)=>{
    console.log('The message form client (when new user join)',data)
     socket.join(data.room);
     socket.in(data.room).broadcast.emit('server_new_joinee',{
         msg: data.user + ' succesfully joined room '+data.room,
         user: data.user,
         room: data.room,
        date: new Date()
     })
    })
})

server.listen(3000, () => {
    console.log('server starts');
})
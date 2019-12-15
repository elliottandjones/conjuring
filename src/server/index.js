const http = require('http');
const express = require('express');
// const cors = require('cors');
const socketio = require('socket.io');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const { conjureChatMessage, conjureRollMessage } = require('./messages')
const router = require('./router');

// https://whispering-brook-74854.herokuapp.com/
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5061;
const io = socketio(server);

// app.use(function(req, res) {
//   // res.header("Access-Control-Allow-Origin", "https://conjuring-2b5a2.firebaseapp.com/"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Origin", "*");
// });
// // const publicDirectoryPath = path.join(__dirname, "../public");
// // app.use(express.static(publicDirectoryPath));
// app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  console.log("New WebSocket connection: " + socket.id);
  
  socket.on('join', (options, callback) => {
    console.log('socket.on("join"), from SERVER');
    const { error, user } = addUser({ id: socket.id, ...options });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', conjureChatMessage('Innkeeper',`${user.name}, Welcome!`));
    let test = conjureChatMessage(user.name, 'TEST');
    console.log(test, typeof test);
    socket.broadcast.to(user.room).emit('message', conjureChatMessage('Innkeeper', `${user.name} has joined!`));

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', conjureChatMessage(user.name, message));
    
    console.log("sendMessage fired, from SERVER");
    console.log(conjureChatMessage(user.name, message));
    callback();
  });

  socket.on('sendRollMessage', ({creatureName, action}, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', conjureRollMessage(user.name, creatureName, action));
    
    console.log("SendRollMessage fired, from SERVER");
    callback();
  });

  socket.on('disconnect', () => {
    console.log("Disconnected");
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', conjureChatMessage('Innkeeper', `${user.name} has left the Material Plane. Probably.`));
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  });
  
});

server.listen(port, () => console.log(`Server is running on port *: ${port}`));
// console.log(`socket.io server is up on port *: ${port}`);
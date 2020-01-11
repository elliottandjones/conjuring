// const path = require("path");
const http = require("http");
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const router = require('./router');

const { conjureChatMessage, conjureRollMessage } = require("./messages");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
const server = http.createServer(app);
app.use(cors());
app.options('*', cors());
app.use(router);
const io = socketio(server);
const port = process.env.PORT || 5016;
// https://whispering-brook-74854.herokuapp.com/

// let buggySendRollMessage = 0;
// let buggySendMessage = 0;
io.on("connection", (socket) => {
  console.log("New WebSocket connection: " + socket.id);
  
  socket.on("join", ({name, room}, callback) => {
    console.log("socket.on('join'), from SERVER");
    const { error, user } = addUser({ id: socket.id, name, room});

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit("message", conjureChatMessage("Innkeeper",`${user.name}, Welcome!`));
    let test = conjureChatMessage(user.name, "TEST");
    console.log(test, typeof test);
    socket.broadcast.to(user.room).emit("message", conjureChatMessage("Innkeeper", `${user.name} has joined!`));

    io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on("sendMessage", (text, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", conjureChatMessage(user.name, text));
    
    console.log("sendMessage fired, from SERVER: ", conjureChatMessage(user.name, text));
    // console.log(++buggySendMessage); // expect +1 every message
    callback();
  });

  socket.on("sendRollMessage", ({creatureName, action}, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", conjureRollMessage(user.name, creatureName, action));
    
    console.log("SendRollMessage fired, from SERVER: ", conjureRollMessage(user.name, creatureName, action));
    // console.log(++buggySendRollMessage); // expect +2 every roll if bug is coming from server
    callback();
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit("message", conjureChatMessage("Innkeeper", `${user.name} has left the Material Plane. Probably.`));
      io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room)});
    }
  });
  
});

server.listen(port, () => console.log(`Server is running on port *: ${port}`));
// console.log(`socket.io server is up on port *: ${port}`);
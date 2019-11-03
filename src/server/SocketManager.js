const io = require("./index.js").io;
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../Events');
const { conjureUser, conjureMessage, conjureChat } = require('../Factories');

let connectedUsers = {};

module.exports = function(socket) {
  console.log(`Socket Id: ${socket.id}`);

  // Verify Username
  socket.on(VERIFY_USER, (username, room, callback) => {
    if (isUser(connectedUsers, username)) {
      callback({isUser: true, user: null});
    } else {
      callback({isUser: false, user: conjureUser({name:username, room:room})});
    }
  });
  // User Connects with username (and room)
  socket.on(USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    io.emit(USER_CONNECTED, connectedUsers);
    console.log(connectedUsers);
  });

  // User Disconnects


  // User logs out

  // Adds user to list passed in
  function addUser(userList, user) {
    let newList = Object.assign({}, userList);
    newList[user.name] = user;
    return newList;
  }

  // Removes user from the list passed in
  function removeUser(userList, username) {
    let newList = Object.assign({}, userList);
    delete newList[username];
    return newList;
  }

  // Checks if the user is in list passed in
  function isUser(userList, username) {
    return username in userList;
  }

}



// socket.on("join", (options, callback) => {
//   const { error, user } = addUser({ id: socket.id, ...options });

//   if (error) {
//     return callback(error);
//   }

//   socket.join(user.room);

//   socket.emit("message", generateMessage("Innkeeper", "Welcome!"));
//   socket.broadcast.to(user.room).emit("message", generateMessage("Innkeeper", `${user.username} has joined!`));
//   io.to(user.room).emit("roomData", {
//     room: user.room,
//     users: getUsersInRoom(user.room)
//   });

//   callback();
// });

// socket.on("sendMessage", (message, callback) => {
//   const user = getUser(socket.id);
//   io.to(user.room).emit("message", generateMessage(user.username, message));
//   callback();
// });

// socket.on("sendRollMessage", (roll, callback) => {
//   const user = getUser(socket.id);
//   io.to(user.room).emit("rollMessage", generateRollMessage(user.username, roll));
//   callback();
// });

// socket.on("disconnect", () => {
//   const user = removeUser(socket.id);

//   if (user) {
//     io.to(user.room).emit("message", generateMessage("Innkeeper", `${user.username} has left!`));
//     io.to(user.room).emit("roomData", { room: user.room,	users: getUsersInRoom(user.room) });
//   }
// });
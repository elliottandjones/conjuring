const io = require("./index.js").io;
const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, MESSAGE_RECIEVED, MESSAGE_SENT, TYPING } = require('../Events');
const { conjureUser, conjureMessage, conjureChat } = require('../Factories');

let socketedUsers = {};
let partyChat = conjureChat();

module.exports = function(socket) {

  console.log(`Socket Id: ${socket.id}`);
  let sendMessageToChatFromUser;
  let sendTypingFromUser;

  // Verify user's display name
  socket.on(VERIFY_USER, (displayName, callback) => {
    if (isUser(socketedUsers, displayName)) {
      callback({isUser: true, user: null});
    } else {
      callback({isUser: false, user: conjureUser({name:displayName})});
    }
  });
  // User Connects with display name
  socket.on(USER_CONNECTED, (user) => {
    socketedUsers = addUser(socketedUsers, user);
    socket.user = user;

    sendMessageToChatFromUser = sendMessageToChat(user.name);
    sendTypingFromUser = sendTypingToChat(user.name);
    
    io.emit(USER_CONNECTED, socketedUsers);
    console.log(`CONNECTED: ${socketedUsers}`);
  });

  // User Disconnects
  socket.on('disconnect', () => {
    if ("user" in socket) {
      socketedUsers = removeUser(socketedUsers, socket.user.name);
      io.emit(USER_DISCONNECTED, socketedUsers);
      console.log(`DISCONNECTED: ${socketedUsers}`);
    }
  });

  // User logs out
  socket.on(LOGOUT, () => {
    socketedUsers = removeUser(socketedUsers, socket.user.name);
    io.emit(USER_DISCONNECTED, socketedUsers);
    console.log(`DISCONNECTED: ${socketedUsers}`);
  });

  // Get Party Chat
  socket.on(PARTY_CHAT, (callback) => {
    callback(partyChat);
  });

  // Message Sent
  socket.on(MESSAGE_SENT, ({chatId, message}) => {
    sendMessageToChatFromUser(chatId, message);
  });

  // User is typing
  socket.on(TYPING, ({chatId, isTyping}) => {
    console.log(chatId, isTyping);
    sendTypingFromUser(chatId, isTyping);
  });

  // Returns a function that takes a chat id and a boolean (isTyping),
  // then emit a broadcast to the chat id that sender is typing
  
  function sendTypingToChat(user) {
    return (chatId, isTyping) => {
      io.emit(`${TYPING}-${chatId}:`, {user, isTyping});
    }
  }

  // Returns a function that will take a chat id and message,
  // then emit a broadcast to the chat id
  function sendMessageToChat(sender) {
    return (chatId, msg) => {
      io.emit(`${MESSAGE_RECIEVED}-${chatId}`, conjureMessage({msg, sender}));
    }
  }

  // Adds user to list passed in
  function addUser(userList, user) {
    let newList = Object.assign({}, userList);
    newList[user.name] = user;
    return newList;
  }

  // Removes user from the list passed in
  function removeUser(userList, displayName) {
    let newList = Object.assign({}, userList);
    delete newList[displayName];
    return newList;
  }

  // Checks if the user's display name is in list passed in
  function isUser(userList, displayName) {
    return displayName in userList;
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
const io = require('./index').io;
const { generateMessage, generateRollMessage } = require("./utils/messages");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./utils/users");

module.exports = function(socket) {
  console.log(`Socket Id: ${socket.id}`);

  socket.on("join", (options, callback) => {
		const { error, user } = addUser({ id: socket.id, ...options });

		if (error) {
			return callback(error);
		}

		socket.join(user.room);

		socket.emit("message", generateMessage("Admin", "Welcome!"));
		socket.broadcast.to(user.room).emit("message", generateMessage("Admin", `${user.username} has joined!`));
		io.to(user.room).emit("roomData", {
			room: user.room,
			users: getUsersInRoom(user.room)
		});

		callback();
	});
  
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", generateMessage(user.username, message));
    callback();
  });

  socket.on("sendRoll", (roll, callback) => {
		const user = getUser(socket.id);
		io.to(user.room).emit("rollMessage", generateRollMessage(user.username, roll));
		callback();
	});

  socket.on("disconnect", () => {
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit("message", generateMessage("Admin", `${user.username} has left!`));
			io.to(user.room).emit("roomData", { room: user.room,	users: getUsersInRoom(user.room) });
		}
	});
}

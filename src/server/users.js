const users = [];

const addUser = ({ id, name, room }) => {
	// Clean the data
	name = name.trim();
	room = room.trim();
  console.log("addUser() fired");
	// Validate the data
	if (!name || !room) {
		return {
			error: "name and room are required!"
		};
	}
	// Check for existing user
	const existingUser = users.find(user => {
		return user.room === room && user.name === name;
	});
	// Validate name
	if (existingUser) {
		return {
			error: "name is in use!"
		};
	}
	// Store user
	const user = { id, name, room };
	users.push(user);
	return { user };
};

const removeUser = id => {
	const index = users.findIndex(user => user.id === id);
  console.log("removeUser() fired");
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
};

const getUser = id => {
  console.log("getUser() fired");
	return users.find(user => user.id === id);
};

const getUsersInRoom = room => {
  console.log("getUsersInRoom() fired");
	room = room.trim();
	return users.filter(user => user.room === room);
};

module.exports = {
	addUser,
	removeUser,
	getUser,
	getUsersInRoom
};

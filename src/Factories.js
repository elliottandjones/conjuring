const uuidv4 = require('uuid/v4');

const conjureUser = ({name="", room="tavern"} = {}) => {
  return {
    id: uuidv4(),
    name,
    room
  };
};

const conjureMessage = ({message="", sender=""} = {}) => {
  return {
    id: uuidv4(),
    time: getTheTime(Date.now()),
    message,
    sender
  };
};

const conjureChat = ({messages=[], name="The Party", users=[]} = {}) => {
  return {
    id:uuidv4(),
    name,
    messages,
    users,
    typing:[]
  }
};

const getTheTime = date => {
	return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
};

module.exports = {
  conjureUser,
  conjureChat,
  conjureMessage
};
import uuidv4 from "uuid/v4";

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
    time: getTime(Date.now()),
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

const getTime = date => {
	return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
};

module.exports = {
  conjureChat,
  conjureMessage,
  conjureUser
};
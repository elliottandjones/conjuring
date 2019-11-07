const uuidv4 = require('uuid/v4');

const conjureUser = ({name=""} = {}) => {
  return {
    id: uuidv4(),
    name
  };
};

const conjureMessage = ({message="", sender=""} = {}) => {
  return {
    id: uuidv4(),
    time: getTime(new Date(Date.now())),
    message,
    sender
  };
};

const conjureChat = ({messages=[], name, users=[]} = {}) => {
  return {
    id: uuidv4(),
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
  conjureUser,
  conjureChat,
  conjureMessage
};
const conjureChatMessage = (username, text) => {
	return {
		username,
    text,
		createdAt: getTheTime(),
    isAction: false
	};
};

const conjureRollMessage = (username, creatureName, action) => {
	return {
		username,
    creatureName,
    action,
		createdAt: getTheTime(),
    isAction: true
	};
};

function getTheTime() {
  let date = new Date(Date.now());
  // console.log(`${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`);
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
}

module.exports = {
	conjureChatMessage,
	conjureRollMessage
};

const conjureChatMessage = (name, text) => {
	return {
		name,
    text,
    isAction: false,
		createdAt: getTheTime()
	};
};

const conjureRollMessage = (name, creatureName, action) => {
	return {
		name,
    creatureName,
    action,
    isAction: true,
		createdAt: getTheTime()
	};
};

function getTheTime() {
  let date = new Date(Date.now());
  console.log(`${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`);
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
}

module.exports = {
	conjureChatMessage,
	conjureRollMessage
};

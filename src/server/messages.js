const conjureChatMessage = (name, text) => {
	return {
		name,
    text,
    isAction: false,
		createdAt: getTheTime(new Date().now())
	};
};

const conjureRollMessage = (name, creatureName, action) => {
	return {
		name,
    creatureName,
    action,
    isAction: true,
		createdAt: getTheTime(new Date().now())
	};
};

function getTheTime(date) {
  console.log(`${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`);
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
}

module.exports = {
	conjureChatMessage,
	conjureRollMessage
};

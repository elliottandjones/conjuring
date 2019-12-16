const conjureChatMessage = (name="test-name", text="test text") => {
	return {
		name,
    text,
    isAction: false,
		createdAt: getTheTime()
	};
};

const conjureRollMessage = (name="test-name-roll", creatureName="Dwayne", action={}) => {
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
  // console.log(`${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`);
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
}

module.exports = {
	conjureChatMessage,
	conjureRollMessage
};

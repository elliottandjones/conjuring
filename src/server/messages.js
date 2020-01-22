const conjureChatMessage = (name, text) => {
	return {
		name,
		text,
		createdAt: getTheTime(),
		isAction: false
	};
};

const conjureRollMessage = (name, creatureName, action) => {
	return {
		name,
		creatureName,
		action,
		createdAt: getTheTime(),
		isAction: true
	};
};

function getTheTime() {
	const date = new Date(Date.now());
	let hours = date.getHours();
	let minutes = date.getMinutes();
	return `${hours > 12 ? hours - 12 : hours < 1 ? 12 : hours}:${("0" + minutes).slice(-2)} ${hours >= 12 ? "PM" : "AM"}`;
}
// NOT using -> date.toLocaleTimeString([], { hour12:true, hour:'2-digit', minute:'2-digit' });
// ?Why not? Because MDN says it's experimental, and the options param {object} doesn't have good browser support yet.
// The first argument, locale, is a string[array], and left empty for default behavior for identifying locale 

module.exports = {
	conjureChatMessage,
	conjureRollMessage
};

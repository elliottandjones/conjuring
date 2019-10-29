// const { rollDamage, rollAttack, getTotalDamage } = require("./roll");

const generateMessage = (username, text) => {
	return {
		username,
		text,
		createdAt: new Date().getTime()
	};
};
// ! this is wrong, fix it
const generateRollMessage = (username, action) => {

	return {
		username,
		action,
		createdAt: new Date().getTime()
	};
};

module.exports = {
	generateMessage,
  generateRollMessage,
};

/**
 * @param {number} str 
 * @param {number} bonus
 */
const rollDamage = (str, bonus) => {
	const results = [];
	const dd = str.split("d");
	const count = parseInt(dd[0]);
	const sides = parseInt(dd[1]);
	for (let i = 0; i < count; i++) {
		results.push(Math.floor(Math.random() * sides + 1));
	}
	if (bonus) {
		results.push(bonus);
	}
	// eslint-disable-next-line
	console.log(results);
	return results;
};
/**
 * @param {number} bonus 
 * @returns {number}
 */
const rollAttack = (bonus) => {
	const d20 = Math.floor(Math.random() * 20 + 1);
	// eslint-disable-next-line
	console.log(`${d20} ${bonus >= 0 && '+'}${bonus}`);
	return d20 + bonus;
};
/**
 * @param {array} array
 * @returns {number}
 */
const getTotalDamage = (array) => {
	const reducer = (accumulator, currentValue) => accumulator + currentValue;
	// eslint-ignore-next-line
	console.log(array.reduce(reducer));
	return array.reduce(reducer);
};

export { 
	rollDamage,
	rollAttack,
	getTotalDamage
};
export const rollAttack = () => {
	return Math.floor(Math.random() * 20 + 1); // number
};

export const rollDamage = (damageDice, damageBonus, isCrit) => {
	const results = [];
	const dd = damageDice.split("d");
  let count = parseInt(dd[0]);
  const sides = parseInt(dd[1]);

  if (isCrit){
    count *= 2;
  }
	for (let i = 0; i < count; i++) {
		results.push(Math.floor(Math.random() * sides + 1));
  }
	results.push(damageBonus);
	console.log(results);
	console.log(typeof results);
	return results; // array of numbers
};

export const getTotalDamage = (array) => {
	// const reducer = (accumulator, currentValue) => accumulator + currentValue;
  // console.log(array.reduce(reducer));
	return array.reduce((accumulator, currentValue) => accumulator + currentValue); // number
};


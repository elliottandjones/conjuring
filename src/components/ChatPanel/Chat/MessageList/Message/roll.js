export const rollAttack = () => {
	return Math.floor(Math.random() * 20 + 1); // number
};

export const rollDamage = (damageDice, damageBonus = 0, isCrit) => {
	console.log(damageBonus);
  const results = [];
  if (!damageDice) {
		if (isCrit) {
			results.push(damageBonus * 2);
			return results; // array of numbers with length of 1
		}
		results.push(damageBonus);
    return results; // array of numbers with length of 1
	}
  const dd = damageDice.split("d");
  console.log("dd: ", dd);
  let count = parseInt(dd[0]);
  const sides = parseInt(dd[1]);
	if (isCrit) {
		count = count * 2;
	}
  for (let i = 0; i < count; i++) {
    results.push(Math.floor(Math.random() * sides + 1));
	}
	results.push(damageBonus);
	return results; // array of numbers with length of at least 2
};

// export const getTotalDamage = (array=[998,1]) => {
// 	const reducer = (accumulator, currentValue) => accumulator + currentValue;
//   const total = array.reduce(reducer); // number 
// 	console.log("Total: ", total);
// 	console.log("damageArray: ", array);
// 	return parseInt(total); // number
// };
export const getTotalDamage = (array) => {
	let total = 0;
	array.map(el => total += el);
	return total; // number
};


const rollDamage = (str, damageBonus) => {
	const results = [];
	const dd = str.split("d");
	const count = parseInt(dd[0]);
	const sides = parseInt(dd[1]);
	for (let i = 0; i < count; i++) {
		results.push(Math.floor(Math.random() * sides + 1));
	}
	if (damageBonus) {
		results.push(damageBonus);
	}
	// eslint-disable-next-line
	console.log(results);
	return results;
};

const rollAttack = (bonus) => {
	const d20 = Math.floor(Math.random() * 20 + 1);
	// eslint-disable-next-line
	console.log(`${d20} ${bonus >= 0 && '+'} ${bonus}`);
	return d20 + bonus;
};

const getTotalDamage = (array) => {
	const reducer = (accumulator, currentValue) => accumulator + currentValue;
	// eslint-ignore-next-line
	console.log(array.reduce(reducer));
	return array.reduce(reducer);
};

// const quickSortByName = arrayOfObjects => {
// 	if (arrayOfObjects.length < 2) {
// 		return arrayOfObjects;
// 	}
// 	const chosenIndex = arrayOfObjects.length - 1;
// 	const chosen = arrayOfObjects[chosenIndex];
// 	const a = [];
// 	const b = [];
// 	for (let i = 0; i < chosenIndex; i++) {
// 		const temp = arrayOfObjects[i];
// 		temp.name < chosen.name ? a.push(temp) : b.push(temp);
// 	}
// 	const output = [...quickSortByName(a), chosen, ...quickSortByName(b)];
  
//   return output;
// };

    // * SORT by name
    // let filteredCreatures = creatures.sort((a,b) => (a.name > b.name) ? 1 : -1);
    // todo SORT by Challenge Rating (CR)
    // let filteredCreatures = creatures.sort((a,b) => (a.challenge_rating > b.challenge_rating) ? 1 : -1);
    // todo: SORT by movement speed (number of ft, not type of speed)
    // ! will probably need to make a regex for this
    // let filteredCreatures = creatures.sort((a,b) => (a.name > b.name) ? 1 : -1);
export {
  // quickSortByName,
	rollDamage,
	rollAttack,
  getTotalDamage
};

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
	// console.log(results);
	return results; // array of numbers
};

export const getTotalDamage = (array) => {
	const reducer = (accumulator, currentValue) => accumulator + currentValue;
  // console.log(array.reduce(reducer));
	return array.reduce(reducer); // number
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
// module.exports = {
//   // quickSortByName,
// 	rollDamage,
// 	rollAttack,
//   getTotalDamage
// };

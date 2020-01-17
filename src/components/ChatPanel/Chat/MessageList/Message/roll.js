export const rollAttack = () => {
	return Math.floor(Math.random() * 20 + 1); // number
};

export const rollDamage = (damageDice = '1d1', damageBonus = 0 
	// isCrit
	) => {
  const results = [];
  if (damageDice==="1d1" && damageBonus !== 0) {
    let dmg = damageBonus;
    // if (isCrit){
    //   dmg *= 2;
    // }
    results.push(dmg);
    return results;
	}
  const dd = damageDice.split("d");
  console.log(dd);
  let count = parseInt(dd[0]);
  const sides = parseInt(dd[1]);
  console.log("count: "+count+", typeof: "+ typeof count);
  console.log("sides: "+sides+", typeof: "+ typeof sides);
  console.log("damageBonus: "+damageBonus+", typeof: "+ typeof damageBonus);
  // if (isCrit){
  //   count = count * 2;
  // }
  for (let i = 0; i < count; i++) {
    results.push(Math.floor(Math.random() * sides + 1));
	}
	if(damageBonus) {
		results.push(damageBonus);
	}
  console.log(typeof results)
	console.log("results: "+results,results.lenth);
	return results; // array of numbers
};

export const getTotalDamage = (array) => {
	const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = array.reduce(reducer); // number 
  console.log("Total: "+total+", damageArray: "+array);
	return total.toString(); // string
};


const rollAttack = () => {
	return Math.floor(Math.random() * 20 + 1); // number
};

const rollDamage = (damageDice, damageBonus = 0, isCrit) => {
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

module.exports = {
	rollAttack,
	rollDamage
};

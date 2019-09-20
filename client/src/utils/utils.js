function roll(dice, sides) {
	const results = [];
	for (let i = 0; i < dice; i++) {
		results.push(Math.floor(Math.random() * sides + 1));
	}
	return results;
}

export { 
	roll 
};

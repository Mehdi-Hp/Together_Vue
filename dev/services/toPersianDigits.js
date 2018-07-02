export default (digit) => {
	const theDigit = String(digit);
	const persianDigits = {
		0: '۰',
		1: '۱',
		2: '۲',
		3: '۳',
		4: '۴',
		5: '۵',
		6: '۶',
		7: '۷',
		8: '۸',
		9: '۹'
	};
	const latingDigitsArray = theDigit.split('');
	const persianDigitsArray = [];
	latingDigitsArray.forEach((singleDigit) => {
		persianDigitsArray.push(persianDigits[singleDigit]);
	});
	return persianDigitsArray.join('');
};

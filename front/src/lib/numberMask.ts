export const getDigitsValue = (str: string): string => {
	return str.replace(/[^0-9]/g, '');
}

export const numberMask = (input: string): string => {
	let onlyNums = getDigitsValue(input).substring(0, 6);
	let res  = onlyNums.substring(0, 2);

	if (onlyNums.length > 2) {
		res += '-' + onlyNums.substring(2, 4);
	}
	if (onlyNums.length > 4 && res.length < 6) {
		res += '-' + onlyNums.substring(4, 6);
	}
	return res;
}
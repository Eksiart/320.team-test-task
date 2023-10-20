export function validateEmail(email: string) {
	const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return re.test(email);
}

export function validateNumber(number: number) {
	return number >= 100000 && number <= 999999;
}
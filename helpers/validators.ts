export const isValidEmail = (value: string) => {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || value.length == 0) {
		return;
	} else {
		return 'Please enter a valid email.';
	}
};

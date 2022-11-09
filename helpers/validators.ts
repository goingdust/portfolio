export const isValidEmail = (value: string) => {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || value.length == 0) {
		return;
	} else {
		return 'Please enter a valid email.';
	}
};

export const required = (value: string, fieldName?: string) => {
	if (value.length <= 0) {
		return `Please enter ${fieldName ? 'your ' + fieldName : 'your information'}.`;
	}
};

export const composeValidators = (
	value: string,
	fieldName: string,
	validators?: ((value: string, fieldName?: string) => string | undefined)[]
) => {
	if (!validators) return;
	const validatorWithError = validators.find((validator) => validator(value, fieldName));
	if (validatorWithError) {
		return validatorWithError(value, fieldName);
	}
};

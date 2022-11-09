import styles from './index.module.scss';
import Input from './Input';
import Textarea from './Textarea';
import Mail from '../../assets/images/mail.png';
import Image from 'next/image';
import { FormEvent, FormEventHandler, useCallback, useMemo, useState } from 'react';
import { composeValidators, isValidEmail, required } from '../../helpers/validators';
import {
	ContactFormFocus,
	ContactFormId,
	ContactFormValidators,
	ContactFormValues,
} from '../../types';

const Contact = () => {
	const [errors, setErrors] = useState(new ContactFormValues());
	const [values, setValues] = useState(new ContactFormValues());
	const [focus, setFocus] = useState(new ContactFormFocus());
	const validators: ContactFormValidators = useMemo(
		() => ({
			email: [isValidEmail, required],
		}),
		[]
	);

	const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			let errorCheck = false;
			for (const key in values) {
				if (
					composeValidators(
						values[key as keyof ContactFormValues],
						key,
						validators[key as keyof ContactFormValidators]
					)
				) {
					setErrors((prev) => ({
						...prev,
						[key]: composeValidators(
							values[key as keyof ContactFormValues],
							key,
							validators[key as keyof ContactFormValidators]
						),
					}));
					document.getElementById(key)?.focus();
					errorCheck = true;
				}
			}

			if (errorCheck) return;
			console.log('made it');

			// setResult('Sending....');
			// const formData = new FormData(event.currentTarget);

			// const res = await fetch('https://api.web3forms.com/submit', {
			// 	method: 'POST',
			// 	body: formData,
			// }).then((res) => res.json());

			// if (res.success) {
			// 	console.log('Success', res);
			// 	setResult(res.message);
			// } else {
			// 	console.log('Error', res);
			// 	setResult(res.message);
			// }
		},
		[validators, values]
	);

	return (
		<div className={styles.contactPage}>
			<form onSubmit={onSubmit}>
				<h1>Drop me a line.</h1>
				<input type='hidden' name='access_key' value={process.env.WEB3_FORMS_ACCESS_KEY} />
				<input type='checkbox' name='botcheck' className='hidden' style={{ display: 'none' }} />

				<Input
					contactStyles={styles}
					validators={validators}
					name='name'
					type='text'
					id={ContactFormId.Name}
					placeholder='-> Your name'
					errors={errors}
					setErrors={setErrors}
					values={values}
					setValues={setValues}
					focus={focus}
					setFocus={setFocus}
				/>
				<Input
					contactStyles={styles}
					validators={validators}
					name='email'
					type='text'
					id={ContactFormId.Email}
					placeholder='-> Email (required)'
					errors={errors}
					setErrors={setErrors}
					values={values}
					setValues={setValues}
					focus={focus}
					setFocus={setFocus}
				/>
				<Textarea
					contactStyles={styles}
					validators={validators}
					name='message'
					id={ContactFormId.Message}
					placeholder='-> Pour your heart out!'
					errors={errors}
					setErrors={setErrors}
					values={values}
					setValues={setValues}
					focus={focus}
					setFocus={setFocus}
				/>

				<input type='hidden' name='redirect' value='https://web3forms.com/success' />

				<button type='submit' aria-label='Send Message'>
					<Image src={Mail} alt='mail' />
					<span>{'->'}</span>
				</button>
			</form>
		</div>
	);
};

export default Contact;

import styles from './index.module.scss';
import Input from './Input';
import Textarea from './Textarea';
import Mail from '../../assets/images/mail.png';
import Image from 'next/image';
import { FormEvent, FormEventHandler, useCallback, useState } from 'react';
import { isValidEmail } from '../../helpers/validators';
import { ContactFormFocus, ContactFormId, ContactFormValues } from '../../types';

const Contact = () => {
	const [errors, setErrors] = useState(new ContactFormValues());
	const [values, setValues] = useState(new ContactFormValues());
	const [focus, setFocus] = useState(new ContactFormFocus());

	const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			const errorCheck = Object.values(errors).every((el: string) => !el);
      if (!errorCheck) return;

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
		[errors]
	);

	return (
		<div className={styles.contactPage}>
			<form onSubmit={onSubmit}>
				<h1>Drop me a line.</h1>
				<input type='hidden' name='access_key' value={process.env.WEB3_FORMS_ACCESS_KEY} />
				<input type='checkbox' name='botcheck' className='hidden' style={{ display: 'none' }} />

				<Input
					contactStyles={styles}
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
					validator={isValidEmail}
					name='email'
					type='text'
					id={ContactFormId.Email}
					placeholder='-> Email'
					errors={errors}
					setErrors={setErrors}
					values={values}
					setValues={setValues}
					focus={focus}
					setFocus={setFocus}
				/>
				<Textarea
					contactStyles={styles}
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

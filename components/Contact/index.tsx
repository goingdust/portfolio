import styles from './index.module.scss';
import Input from './Input';
import Textarea from './Textarea';
import Mail from '../../assets/images/mail.png';
import Image from 'next/image';
import { CSSProperties, FormEvent, FormEventHandler, useCallback, useMemo, useState } from 'react';
import { composeValidators, isValidEmail, required } from '../../helpers/validators';
import {
	ContactFormFocus,
	ContactFormId,
	ContactFormValidators,
	ContactFormValues,
	REQUEST_STATUS,
} from '../../types';
import BlocksLoader from '../BlocksLoader';
import useWeb3forms from '@web3forms/react';

const Contact = () => {
	const [errors, setErrors] = useState(new ContactFormValues());
	const [values, setValues] = useState(new ContactFormValues());
	const [focus, setFocus] = useState(new ContactFormFocus());
	const [formStatus, setFormStatus] = useState(REQUEST_STATUS.IDLE);
	const [result, setResult] = useState('');
	const validators: ContactFormValidators = useMemo(
		() => ({
			email: [isValidEmail, required],
		}),
		[]
	);

	const { submit } = useWeb3forms({
		access_key: process.env.NEXT_PUBLIC_WEB3_FORMS_ACCESS_KEY!,
		settings: {
			from_name: 'Portfolio Site',
			subject: 'New Contact Message from your Website',
		},
		onSuccess: (message, data) => {
			setFormStatus(REQUEST_STATUS.SUCCESS);
			console.log('Success', message);
			setResult(message);
			setTimeout(() => {
				setFormStatus(REQUEST_STATUS.IDLE);
			}, 10000);
		},
		onError: (message, data) => {
			setFormStatus(REQUEST_STATUS.ERROR);
			console.log('Error', message);
			setResult(message);
			setTimeout(() => {
				setFormStatus(REQUEST_STATUS.IDLE);
			}, 10000);
		},
	});

	const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
		async (event: FormEvent<HTMLFormElement>) => {
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

			setFormStatus(REQUEST_STATUS.SUCCESS);

			// submit(values);
		},
		[validators, values, submit]
	);

	const style = useMemo(
		() => ({
			'--flex-direction': formStatus === REQUEST_STATUS.ERROR ? 'row' : 'column',
			'--msg-flex-gap': formStatus === REQUEST_STATUS.ERROR ? '1rem' : '0.25rem',
		}),
		[formStatus]
	) as CSSProperties;

	return (
		<div className={styles.contactPage}>
			<form onSubmit={onSubmit}>
				<h1>Drop me a line.</h1>
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

				<div className={styles.buttonContainer} style={style}>
					{formStatus === REQUEST_STATUS.IDLE && (
						<button type='submit' aria-label='Send Message'>
							<Image src={Mail} alt='mail' />
							<span>{'->'}</span>
						</button>
					)}
					{formStatus === REQUEST_STATUS.FETCHING && (
						<>
							<span className={styles.sending}>sending</span>
							<BlocksLoader className={styles.loader} />
							<span className={styles.sending}>message</span>
						</>
					)}
					{formStatus === REQUEST_STATUS.ERROR && (
						<>
							<div className={styles.error}>!</div>
							<span className={styles.errorMsg}>
								{result ? result : 'Uh oh, something went wrong.'}
							</span>
						</>
					)}
					{formStatus === REQUEST_STATUS.SUCCESS && <span>{result ? result : 'SENT!'}</span>}
				</div>
			</form>
		</div>
	);
};

export default Contact;

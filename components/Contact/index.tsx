import { useState } from 'react';
import styles from './index.module.scss';

const Contact = () => {
	const [textareaFocused, setTextareaFocused] = useState(false);
	const [nameFocused, setNameFocused] = useState(false);
	const [emailFocused, setEmailFocused] = useState(false);

	return (
		<div className={styles.contactPage}>
			<form action='https://api.web3forms.com/submit' method='POST'>
				<input type='hidden' name='access_key' value={process.env.WEB3_FORMS_ACCESS_KEY} />
				<input type='checkbox' name='botcheck' className='hidden' style={{ display: 'none' }} />
				<div className={`${styles.input} ${nameFocused ? styles.inputFocus : styles.inputBlur}`}>
					<input
						type='text'
						name='name'
						required
						onFocus={() => setNameFocused(true)}
						onBlur={() => setNameFocused(false)}
					/>
				</div>
				<div className={`${styles.input} ${emailFocused ? styles.inputFocus : styles.inputBlur}`}>
					<input
						type='email'
						name='email'
						required
						onFocus={() => setEmailFocused(true)}
						onBlur={() => setEmailFocused(false)}
					/>
				</div>
				<div
					className={`${styles.textarea} ${textareaFocused ? styles.inputFocus : styles.inputBlur}`}
				>
					<textarea
						name='message'
						required
						onFocus={() => setTextareaFocused(true)}
						onBlur={() => setTextareaFocused(false)}
					/>
				</div>
				<input type='hidden' name='redirect' value='https://web3forms.com/success' />

				<button type='submit' disabled>
					Submit Form
				</button>
			</form>
		</div>
	);
};

export default Contact;

import styles from './index.module.scss';
import Input from './Input';
import Textarea from './Textarea';
import Mail from '../../assets/images/mail.png';
import Image from 'next/image';

const Contact = () => {
	return (
		<div className={styles.contactPage}>
			<form action='https://api.web3forms.com/submit' method='POST'>
				<h1>Drop me a line.</h1>
				<input type='hidden' name='access_key' value={process.env.WEB3_FORMS_ACCESS_KEY} />
				<input type='checkbox' name='botcheck' className='hidden' style={{ display: 'none' }} />

				<Input
					contactStyles={styles}
					name='name'
					type='text'
					id='name'
					placeholder='-> Your name'
				/>
				<Input contactStyles={styles} name='email' type='text' id='email' placeholder='-> Email' />
				<Textarea
					contactStyles={styles}
					name='message'
					id='message'
					placeholder='-> Pour your heart out!'
				/>

				<input type='hidden' name='redirect' value='https://web3forms.com/success' />

				<button type='submit' disabled aria-label='Send Message'>
					<Image src={Mail} alt='mail' />
					<span>{'->'}</span>
				</button>
			</form>
		</div>
	);
};

export default Contact;

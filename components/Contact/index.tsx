import styles from './index.module.scss';
import Input from './Input';
import Textarea from './Textarea';
import Mail from '../../assets/images/mail.png';
import Image from 'next/image';

const Contact = () => {
	return (
		<div className={styles.contactPage}>
			<form action='https://api.web3forms.com/submit' method='POST'>
				<input type='hidden' name='access_key' value={process.env.WEB3_FORMS_ACCESS_KEY} />
				<input type='checkbox' name='botcheck' className='hidden' style={{ display: 'none' }} />

				<Input styles={styles} name='name' type='text' id='name' placeholder='Your name' />
				<Input styles={styles} name='email' type='text' id='email' placeholder='Email' />
				<Textarea styles={styles} name='message' id='message' placeholder='Pour your heart out!' />

				<input type='hidden' name='redirect' value='https://web3forms.com/success' />

				<button type='submit' disabled>
					Send <Image src={Mail} alt='mail' />
				</button>
			</form>
		</div>
	);
};

export default Contact;

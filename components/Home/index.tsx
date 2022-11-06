import styles from './index.module.scss';
import Image from 'next/image';
import LogoTitle from '../../assets/images/logo-s.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AnimatedLetters from '../AnimatedLetters';
import Avatar from '../../assets/images/8bitpix.png';

const Home = () => {
	const [h1Finished, setH1Finished] = useState(false);
	const h1TypingDelay = 3000; // determined by (num of characters * 0.15s)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setH1Finished(true);
		}, h1TypingDelay);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className={styles.homePage}>
			<div className={styles.contentContainer}>
				<div>
					<h1 className={`${h1Finished ? styles.hide : ''}`} />
					<h2 className={`${h1Finished ? styles.show : ''}`} />
				</div>
				<Image src={Avatar} alt='8 bit avatar' className='avatar-animate' />
			</div>
			<Link href='/contact' passHref legacyBehavior>
				<a className={styles.flatButton}>CONTACT ME</a>
			</Link>
		</div>
	);
};

export default Home;

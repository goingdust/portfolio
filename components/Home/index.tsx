import styles from './index.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Avatar from '../../assets/images/8bitpix.png';

const Home = () => {
	const [h1Finished, setH1Finished] = useState(false);
	const [avatarImgClass, setAvatarImgClass] = useState('initial-avatar-animate');
	const h1TypingDelay = 2800; // determined by (num of characters * typing speed + animation delay) in /styles/_variables.scss

	useEffect(() => {
		const timeout = setTimeout(() => {
			setH1Finished(true);
		}, h1TypingDelay);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className={styles.homePage}>
			<div className={styles.contentContainer}>
				<header>
					<h1 className={`${h1Finished ? styles.hide : ''}`} />
					<h2 className={`${h1Finished ? styles.show : ''}`} />
				</header>
				<Image
					src={Avatar}
					alt='8 bit avatar'
					className={avatarImgClass}
					onMouseEnter={() => setAvatarImgClass('avatar-hover-animate')}
				/>
			</div>
			<Link href='/contact' passHref legacyBehavior>
				<a className={styles.flatButton}>CONTACT ME</a>
			</Link>
		</div>
	);
};

export default Home;

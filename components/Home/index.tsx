import styles from './index.module.scss';
import Image from 'next/image';
import LogoTitle from '../../assets/images/logo-s.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AnimatedLetters from '../AnimatedLetters';

const Home = () => {
	const [letterClass, setLetterClass] = useState('text-animate');
	const nameArray = ['d', 'u', 's', 't', 'y', ' ', 'l', 'u', 'c', 'k'];
	const jobArray = [
		'w',
		'e',
		'b',
		' ',
		'd',
		'e',
		'v',
		'e',
		'l',
		'o',
		'p',
		'e',
		'r',
	];

	useEffect(() => {
		setTimeout(() => {
			setLetterClass('text-animate-hover');
		}, 4000);
	}, []);

	return (
		<div className={`container ${styles.homePage}`}>
			<div className={styles.textZone}>
				<h1>
					<span className={letterClass}>H</span>
					<span className={`${letterClass} _12`}>i,</span>
					<br />
					<span className={`${letterClass} _13`}>I</span>
					<span className={`${letterClass} _14`}>&apos;m</span>
					<div className={styles.bigLetterS}>
						<Image src={LogoTitle} alt='developer' />
					</div>
					<AnimatedLetters
						letterClass={letterClass}
						strArray={nameArray}
						index={15}
					/>
					<br />
					<AnimatedLetters
						letterClass={letterClass}
						strArray={jobArray}
						index={25}
					/>
				</h1>
				<h2>full stack developer</h2>
				<Link href='/contact'>
					<a className={styles.flatButton}>CONTACT ME</a>
				</Link>
			</div>
		</div>
	);
};

export default Home;

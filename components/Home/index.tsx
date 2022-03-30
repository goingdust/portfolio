import styles from './index.module.scss';
import Image from 'next/image';
import LogoTitle from '../../assets/images/logo-s.png';
import Link from 'next/link';

const Home = () => {
	return (
		<div className={`container ${styles.homePage}`}>
			<div className={styles.textZone}>
				<h1>
					Hi, <br /> I&apos;m
					<Image src={LogoTitle} alt='developer' />
					lobodan
					<br />
					web developer
				</h1>
				<h2>full stack developer</h2>
				<Link href='/contact'>CONTACT ME</Link>
			</div>
		</div>
	);
};

export default Home;

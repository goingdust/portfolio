import styles from './index.module.scss';
import Image from 'next/image';
import LogoTitle from '../../assets/images/logo-s.png';

const Home = () => {
	return (
		<div className={`${styles.container} ${styles.homePage}`}>
			<div className={styles.textZone}>
				<h1>
					Hi, <br /> I&apos;m
				</h1>
				<Image src={LogoTitle} alt='developer' />
			</div>
		</div>
	);
};

export default Home;

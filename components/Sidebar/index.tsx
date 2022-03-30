import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.scss';
import LogoS from '../../assets/images/logo-s.png';
import LogoSubtitle from '../../assets/images/logo_sub.png';

const Sidebar = () => {
	return (
		<section className={styles.navBar}>
			<Link href='/' passHref>
				<a className={styles.logoContainer}>
					<div className={styles.logos}>
						<Image src={LogoS} alt='logo' />
					</div>
					<div className={`${styles.logos} ${styles.subLogo}`}>
						<Image src={LogoSubtitle} alt='slobodan' />
					</div>
				</a>
			</Link>
		</section>
	);
};

export default Sidebar;

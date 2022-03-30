import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './index.module.scss';
import LogoS from '../../assets/images/logo-s.png';
import LogoSubtitle from '../../assets/images/logo_sub.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
	const router = useRouter();

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
			<nav>
				<Link href='/' passHref>
					<a className={router.pathname === '/' ? `${styles.active}` : ''}>
						<FontAwesomeIcon icon={faHome} color='#4d4d4'></FontAwesomeIcon>
					</a>
				</Link>
				<Link href='/about' passHref>
					<a
						className={`${styles.aboutLink} ${
							router.pathname === '/about' ? `${styles.active}` : ''
						}`}
					>
						<FontAwesomeIcon icon={faUser} color='#4d4d4'></FontAwesomeIcon>
					</a>
				</Link>
				<Link href='/contact' passHref>
					<a
						className={`${styles.contactLink} ${
							router.pathname === '/contact' ? `${styles.active}` : ''
						}`}
					>
						<FontAwesomeIcon icon={faEnvelope} color='#4d4d4'></FontAwesomeIcon>
					</a>
				</Link>
			</nav>
		</section>
	);
};

export default Sidebar;

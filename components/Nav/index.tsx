import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './index.module.scss';
import LogoS from '../../assets/images/logo-s.png';
import LogoSubtitle from '../../assets/images/logo_sub.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

const Nav = () => {
	const router = useRouter();
	const [navVisible, setNavVisible] = useState<boolean>();

	return (
		<nav className={styles.navBar}>
			<header>
				<button
					className='nav-button-animate'
					onClick={() => setNavVisible((prev) => (prev === undefined ? true : !prev))}
				>
					<FontAwesomeIcon icon={faBars} />
				</button>
				<ul className={styles.navHeaderLinks}>
					<li>
						<a
							target='_blank'
							rel='noreferrer'
							href='https://www.linkedin.com/in/dusty-luck'
							className='nav-button-animate'
						>
							<FontAwesomeIcon icon={faLinkedin} />
						</a>
					</li>
					<li>
						<a
							target='_blank'
							rel='noreferrer'
							href='https://github.com/goingdust'
							className='nav-button-animate'
						>
							<FontAwesomeIcon icon={faGithub} />
						</a>
					</li>
				</ul>
			</header>
			<ul
				className={`${styles.navDisplay} ${
					navVisible ? styles.navShow : navVisible !== undefined ? styles.navHide : ''
				}`}
			>
				<li>Home</li>
			</ul>
			{/* <Link href='/' passHref legacyBehavior>
				<a className={styles.logoContainer}>
					<div className={styles.logos}>
						<Image src={LogoS} alt='logo' />
					</div>
					<div className={`${styles.logos} ${styles.subLogo}`}>
						<Image src={LogoSubtitle} alt='slobodan' />
					</div>
				</a>
			</Link> */}
			{/* <nav>
				<Link href='/' passHref legacyBehavior>
					<a className={router.pathname === '/' ? `${styles.active}` : ''}>
						<FontAwesomeIcon icon={faHome} color='#4d4d4'></FontAwesomeIcon>
					</a>
				</Link>
				<Link href='/about' passHref legacyBehavior>
					<a
						className={`${styles.aboutLink} ${
							router.pathname === '/about' ? `${styles.active}` : ''
						}`}
					>
						<FontAwesomeIcon icon={faUser} color='#4d4d4'></FontAwesomeIcon>
					</a>
				</Link>
				<Link href='/contact' passHref legacyBehavior>
					<a
						className={`${styles.contactLink} ${
							router.pathname === '/contact' ? `${styles.active}` : ''
						}`}
					>
						<FontAwesomeIcon icon={faEnvelope} color='#4d4d4'></FontAwesomeIcon>
					</a>
				</Link>
			</nav>
			 */}
		</nav>
	);
};

export default Nav;

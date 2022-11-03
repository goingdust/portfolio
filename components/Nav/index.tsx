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
					<FontAwesomeIcon icon="" />
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
					navVisible ? styles.navShow : navVisible !== undefined ? styles.navHide : 'hidden'
				}`}
			>
				<li>
					<Link href='/' passHref legacyBehavior>
						<a
							className={router.pathname === '/' ? `${styles.active}` : ''}
							onClick={() => setNavVisible(false)}
						>
							Home
						</a>
					</Link>
				</li>
				<li>
					<Link href='/about' passHref legacyBehavior>
						<a
							className={`${styles.aboutLink} ${
								router.pathname === '/about' ? `${styles.active}` : ''
							}`}
							onClick={() => setNavVisible(false)}
						>
							About
						</a>
					</Link>
				</li>
				<li>
					<Link href='/contact' passHref legacyBehavior>
						<a
							className={`${styles.contactLink} ${
								router.pathname === '/contact' ? `${styles.active}` : ''
							}`}
							onClick={() => setNavVisible(false)}
						>
							Contact
						</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;

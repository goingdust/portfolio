import styles from './index.module.scss';
import { useState } from 'react';
import { GitHub, LinkedIn, Menu, MenuOpen } from '@mui/icons-material';
import NavLinkItem from './NavLinkItem';

const Nav = () => {
	const [navVisible, setNavVisible] = useState<boolean>();

	return (
		<nav className={styles.navBar}>
			<header>
				<button
					className='nav-button-animate'
					onClick={() => setNavVisible((prev) => (prev === undefined ? true : !prev))}
					aria-label={navVisible ? 'Close Nav Menu' : 'Nav Menu'}
				>
					{navVisible ? <MenuOpen /> : <Menu />}
				</button>
				<ul className={styles.navHeaderLinks}>
					<li>
						<a
							target='_blank'
							rel='noreferrer'
							href='https://www.linkedin.com/in/dusty-luck'
							className='nav-button-animate'
							aria-label='LinkedIn'
						>
							<LinkedIn />
						</a>
					</li>
					<li>
						<a
							target='_blank'
							rel='noreferrer'
							href='https://github.com/goingdust'
							className='nav-button-animate'
							aria-label='GitHub'
						>
							<GitHub />
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
					<NavLinkItem path='/' onClickHandler={() => setNavVisible(false)} label='Home' />
				</li>
				<li>
					<NavLinkItem path='/about' onClickHandler={() => setNavVisible(false)} label='About' />
				</li>
				<li>
					<NavLinkItem
						path='/contact'
						onClickHandler={() => setNavVisible(false)}
						label='Contact'
					/>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;

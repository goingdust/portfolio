import styles from './index.module.scss';
import { useCallback, useState } from 'react';
import { GitHub, LinkedIn, Menu, MenuOpen } from '@mui/icons-material';
import NavLinkItem from './NavLinkItem';

const Nav = () => {
	const [navVisible, setNavVisible] = useState<boolean>();

	const headerNavLinkItemClickHandler = useCallback(() => {
		setNavVisible((prev) => (prev === undefined ? true : !prev));
	}, []);

	const navLinkItemClickHandler = useCallback(() => {
		setNavVisible(false);
	}, []);

	return (
		<nav className={styles.navBar}>
			<header>
				<button
					className={`nav-button-animate ${navVisible ? styles.light : styles.dark}`}
					onClick={headerNavLinkItemClickHandler}
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
							className={`nav-button-animate ${navVisible ? styles.light : styles.dark}`}
							aria-label='LinkedIn'
							onClick={headerNavLinkItemClickHandler}
						>
							<LinkedIn />
						</a>
					</li>
					<li>
						<a
							target='_blank'
							rel='noreferrer'
							href='https://github.com/goingdust'
							className={`nav-button-animate ${navVisible ? styles.light : styles.dark}`}
							aria-label='GitHub'
							onClick={headerNavLinkItemClickHandler}
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
					<NavLinkItem
						path='/'
						onClickHandler={navLinkItemClickHandler}
						label='Home'
						navVisible={navVisible}
					/>
				</li>
				<li>
					<NavLinkItem
						path='/about'
						onClickHandler={navLinkItemClickHandler}
						label='About'
						navVisible={navVisible}
					/>
				</li>
				<li>
					<NavLinkItem
						path='/contact'
						onClickHandler={navLinkItemClickHandler}
						label='Contact'
						navVisible={navVisible}
					/>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;

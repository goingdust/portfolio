import styles from './index.module.scss';
import { useCallback, useContext, useState } from 'react';
import { GitHub, LinkedIn, Menu, MenuOpen } from '@mui/icons-material';
import NavLinkItem from './NavLinkItem';
import { HideNavContext } from '../../contexts/HideNavProvider';
import Footer from '../Footer';

const Nav = () => {
	const [navVisible, setNavVisible] = useState<boolean>();
	const { hideNav } = useContext(HideNavContext);

	const headerNavLinkItemClickHandler = useCallback(() => {
		setNavVisible((prev) => (prev === undefined ? true : !prev));
	}, []);

	const navLinkItemClickHandler = useCallback(() => {
		setNavVisible(false);
	}, []);

	return (
		<nav className={styles.navBar}>
			<header className={hideNav ? 'bounce-out-up' : 'bounce-in-down'}>
				<button
					className={`${styles.navHeaderBtn} ${navVisible ? styles.light : styles.dark}`}
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
							className={`${styles.navHeaderBtn} ${navVisible ? styles.light : styles.dark}`}
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
							className={`${styles.navHeaderBtn} ${navVisible ? styles.light : styles.dark}`}
							aria-label='GitHub'
							onClick={headerNavLinkItemClickHandler}
						>
							<GitHub />
						</a>
					</li>
				</ul>
			</header>
			<div
				className={`${styles.navDisplay} ${
					navVisible ? styles.navShow : navVisible !== undefined ? styles.navHide : 'hidden'
				}`}
			>
				<ul>
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
				<Footer />
			</div>
		</nav>
	);
};

export default Nav;

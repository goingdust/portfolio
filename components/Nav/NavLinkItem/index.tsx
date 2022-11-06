import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './index.module.scss';

const NavLinkItem = ({
	path,
	onClickHandler,
	label,
	navVisible,
}: {
	path: string;
	onClickHandler: () => void;
	label: string;
	navVisible?: boolean;
}) => {
	const router = useRouter();
	const [hovering, setHovering] = useState(false);
	return (
		<>
			<Link href={path} passHref legacyBehavior>
				<a
					className={`${router.pathname === path ? styles.active : ''}`}
					onClick={onClickHandler}
					onMouseEnter={() => setHovering(true)}
					onMouseLeave={() => setHovering(false)}
				>
					{label}
				</a>
			</Link>
			<div
				className={`${styles.underline} ${hovering ? styles.mouseEnter : styles.mouseLeave} ${
					navVisible === false ? styles.mouseLeave : ''
				}`}
			/>
		</>
	);
};

export default NavLinkItem;

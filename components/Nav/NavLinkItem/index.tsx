import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './index.module.scss';

const NavLinkItem = ({
	path,
	onClickHandler,
	label,
}: {
	path: string;
	onClickHandler: () => void;
	label: string;
}) => {
	const router = useRouter();
	const [hovering, setHovering] = useState(false);
	return (
		<>
			<Link href={path} passHref legacyBehavior>
				<a
					className={`${router.pathname === path ? styles.active : ''} ${
						hovering ? styles.mouseEnter : styles.mouseLeave
					}`}
					onClick={onClickHandler}
					onMouseEnter={() => setHovering(true)}
					onMouseLeave={() => setHovering(false)}
				>
					{label}
				</a>
			</Link>
			<br />
		</>
	);
};

export default NavLinkItem;

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
	const [hovering, setHovering] = useState(false);

	useEffect(() => {
		if (!navVisible) {
			setHovering(false);
		}
	}, [navVisible]);

	return (
		<>
			<Link href={path} passHref legacyBehavior>
				<a
					className={`${navVisible ? styles.show : styles.hide}`}
					onClick={onClickHandler}
					onMouseEnter={() => setHovering(true)}
					onMouseLeave={() => setHovering(false)}
				>
					{label}
				</a>
			</Link>
			<div className={`${styles.underline} ${hovering ? styles.mouseEnter : styles.mouseLeave}`} />
		</>
	);
};

export default NavLinkItem;

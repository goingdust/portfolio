import Link from 'next/link';
import { useRouter } from 'next/router';
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
	return (
		<>
			<Link href={path} passHref legacyBehavior>
				<a className={`${router.pathname === path ? styles.active : ''}`} onClick={onClickHandler}>
					{label}
				</a>
			</Link>
			<br />
		</>
	);
};

export default NavLinkItem;

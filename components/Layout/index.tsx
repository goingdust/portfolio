import { PropsWithChildren } from 'react';
import Nav from '../Nav';
import styles from './index.module.scss';

const Layout = ({ children }: PropsWithChildren<{}>) => {
	return (
		<div className={styles.App}>
			<Nav />
			<div className={styles.pageContainer}>
				<div className={styles.topTags}>
					<span>&lt;html&gt;</span>
					<br />
					<span>&lt;body&gt;</span>
				</div>
				<main>{children}</main>
				<div className={styles.bottomTags}>
					<span>&lt;/body&gt;</span>
					<br />
					<span>&lt;/html&gt;</span>
				</div>
			</div>
		</div>
	);
};

export default Layout;

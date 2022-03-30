import { PropsWithChildren } from 'react';
import Sidebar from '../Sidebar';
import styles from './index.module.scss';

const Layout = ({ children }: PropsWithChildren<{}>) => {
	return (
		<div className={styles.App}>
			<Sidebar />
			<div className={styles.page}>
				<span className={`${styles.tags} ${styles.topTags}`}>&lt;body&gt;</span>
				{children}
				<span className={`${styles.tags} ${styles.bottomTags}`}>
					&lt;/body&gt;
					<br />
					<span className={styles.bottomTagHtml}>&lt;/html&gt;</span>
				</span>
			</div>
		</div>
	);
};

export default Layout;

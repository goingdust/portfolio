import styles from './index.module.scss';

const BlocksLoader = (props: { [key: string]: any }) => {
	return (
		<div className={props.className}>
			<div className={styles.square} />
			<div className={styles.square} />
			<div className={`${styles.square} ${styles.last}`} />
			<div className={`${styles.square} ${styles.clear}`} />
			<div className={styles.square} />
			<div className={`${styles.square} ${styles.last}`} />
			<div className={`${styles.square} ${styles.clear}`} />
			<div className={styles.square} />
			<div className={`${styles.square} ${styles.last}`} />
		</div>
	);
};

export default BlocksLoader;

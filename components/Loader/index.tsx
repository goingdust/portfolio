import styles from './index.module.scss';

const Loader = () => {
	return (
		<div className={styles.container}>
			<div>
				<span className={styles.percent} />
				<div className={styles.progressBar}>
					<div />
				</div>
				<span className={styles.loaderText} />
			</div>
		</div>
	);
};

export default Loader;

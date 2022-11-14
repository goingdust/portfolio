import styles from './index.module.scss';

const Footer = ({ navVisible }: { navVisible?: boolean }) => {
	return (
		<footer className={`${styles.footer} ${navVisible ? styles.show : styles.hide}`}>
			<span>Developed + Designed by Dusty Luck © 2022</span>
		</footer>
	);
};

export default Footer;

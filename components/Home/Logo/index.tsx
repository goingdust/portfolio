import Image from 'next/image';
import styles from './index.module.scss';
import LogoS from '../../../assets/images/logo-s.png';

const Logo = () => {
	return (
		<div className={styles.logoContainer}>
			<div className={styles.solidLogo}>
				<Image src={LogoS} alt='logo' />
			</div>
		</div>
	);
};

export default Logo;

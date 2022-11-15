import Image from 'next/image';
import styles from './index.module.scss';
import ghostie from '../../assets/images/cute-ghost-transparent-7.png';

const NotFound = () => {
	return (
		<div className={styles.container}>
			<div className={styles.fourOhFourContainer}>
				<h1>404</h1>
				<Image src={ghostie} alt='pixel ghost' />
			</div>
			<h2>{"Hmm... it looks like that page doesn't exist."}</h2>
		</div>
	);
};

export default NotFound;

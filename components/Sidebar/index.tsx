import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.scss';
import LogoS from '../../assets/images/logo-s.png';

const Sidebar = () => {
	return (
		<div className='nav-bar'>
			<Link href='/' passHref>
				<div className='logo'>
					<Image src={LogoS} alt='logo' />
					<Image src={LogoS} alt='logo' />
				</div>
			</Link>
		</div>
	);
};

export default Sidebar;

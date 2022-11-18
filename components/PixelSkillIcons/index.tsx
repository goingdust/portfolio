import { useEffect } from 'react';
import render from '../../helpers/pixel-icon/pixel-icon';

const PixelSkillIcons = ({ styles }: { styles: { readonly [key: string]: string } }) => {
	useEffect(() => {
		render(
			document.getElementById('typescript'),
			`0-0-0-0-0-1gbbh-15xga-t48ay-k885ch-e0plzeb-5tbau-hhvdtgc-0`,
			{ size: 14, colors: ['#2f74c0', '#FFF', '#9FD356', '#9C3848', '#00000000'] }
		);
		render(
			document.getElementById('javascript'),
			`0-0-0-0-0-2j5-1qoy-17jbm-uist5-k709zj-e0v6xsi-hhvdtgc-0`,
			{ size: 14, colors: ['#efd81d', '#000', '#9FD356', '#9C3848', '#00000000'] }
		);
	}, []);

	return (
		<>
			<div className={styles.icon} id='typescript' />
			<div className={styles.icon} id='javascript' />
		</>
	);
};

export default PixelSkillIcons;

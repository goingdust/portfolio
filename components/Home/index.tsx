import styles from './index.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties, useEffect, useState } from 'react';
import Avatar from '../../assets/images/8bitpix.png';
import useWindowSize from '../../hooks/useWindowSize';

const Home = () => {
	const [h1Finished, setH1Finished] = useState(false);
	const [avatarImgClass, setAvatarImgClass] = useState<string | undefined>(
		'initial-avatar-animate'
	);
	const [timeoutActive, setTimeoutActive] = useState(false);
	const h1TypingDelay = 2800; // determined by (num of characters * typing speed + animation delay) in /styles/_constiables.scss
	const [img, setImg] = useState<HTMLImageElement>();
	const [style, setStyle] = useState<CSSProperties | undefined>();
	const { isDesktop } = useWindowSize();

	useEffect(() => {
		// for tracking when to hide h1 cursor and show next line's h2 cursor
		const timeout = setTimeout(() => {
			setH1Finished(true);
		}, h1TypingDelay);
		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		if (isDesktop) {
			// avatar follow cursor animation
			document.getElementsByTagName('html')[0].addEventListener('mousemove', (e) => {
				if (!img) return;
				// if img mouseover animation happening, set transform to default
				if (timeoutActive) {
					setStyle((prev) => ({
						...prev,
						'--img-flip': 1,
						'--img-rotate': 360 + 'deg',
					}));
					return;
				}
				const center_x = img.offsetLeft + img.offsetWidth / 2;
				const center_y = img.offsetTop + img.offsetHeight / 2;
				const mouse_x = e.clientX;
				const mouse_y = e.clientY;
				const radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
				const degree = radians * (180 / Math.PI) * -1 + 270;
				if (degree >= 90 && degree <= 270) {
					setStyle((prev) => ({ ...prev, '--img-flip': -1 }));
				} else {
					setStyle((prev) => ({ ...prev, '--img-flip': 1 }));
				}
				setStyle((prev) => ({ ...prev, '--img-rotate': degree + 'deg', '--img-transition': '0s' }));
			});

			document.getElementsByTagName('html')[0].addEventListener('mouseleave', () => {
				setStyle((prev) => ({
					...prev,
					'--img-flip': 1,
					'--img-rotate': 360 + 'deg',
					'--img-transition': '0.5s',
				}));
			});
		}
	}, [img, avatarImgClass, timeoutActive, isDesktop]);

	return (
		<div className={styles.homePage}>
			<div className={styles.contentContainer}>
				<header>
					<h1 className={`${h1Finished ? styles.hide : ''}`} />
					<h2 className={`${h1Finished ? styles.show : ''}`} />
				</header>
				<Image
					src={Avatar}
					alt='8 bit avatar'
					className={avatarImgClass}
					style={style}
					priority
					onLoadingComplete={(e) => {
						// remove class when initial loading animation is finished
						setTimeout(() => {
							setAvatarImgClass(undefined);
							setImg(e);
						}, 5900);
					}}
					onMouseEnter={() => {
						// apply hover animation if initial class has been removed
						if (!avatarImgClass && !timeoutActive) {
							setAvatarImgClass(undefined);
							setAvatarImgClass('avatar-hover-animate');
							setTimeoutActive(true);
							setTimeout(() => {
								setAvatarImgClass(undefined);
								setTimeoutActive(false);
							}, 5000);
						}
					}}
				/>
			</div>
			<Link href='/contact' passHref legacyBehavior>
				<a className={`slide-in-up ${styles.flatButton}`}>CONTACT ME</a>
			</Link>
		</div>
	);
};

export default Home;

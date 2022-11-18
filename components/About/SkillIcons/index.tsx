import Image from 'next/image';
import { useEffect, useState } from 'react';
import useWindowSize from '../../../hooks/useWindowSize';
import styles from './index.module.scss';

const mobileSize = 40;
const tabletSize = 50;
const desktopSize = 60;

const SkillIcons = () => {
	const { isMobile, isTablet } = useWindowSize();
	const [iconSize, setIconSize] = useState(
		isMobile ? mobileSize : isTablet ? tabletSize : desktopSize
	);

	useEffect(() => {
		if (isMobile) {
			setIconSize(mobileSize);
		} else if (isTablet) {
			setIconSize(tabletSize);
		} else {
			setIconSize(desktopSize);
		}
	}, [isMobile, isTablet]);

	return (
		<div className={styles.iconsContainer}>
			<a href='https://www.typescriptlang.org/' target='_blank' rel='noreferrer'>
				<Image
					src='https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg'
					alt='typescript'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a
				href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'
				target='_blank'
				rel='noreferrer'
			>
				<Image
					src='https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg'
					alt='javascript'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://www.ruby-lang.org/en/' target='_blank' rel='noreferrer'>
				<Image
					src='https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg'
					alt='ruby'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a
				href='https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics'
				rel='noreferrer'
			>
				<Image
					src='https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg'
					alt='html5'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://developer.mozilla.org/en-US/docs/Web/CSS' target='_blank' rel='noreferrer'>
				<Image
					src='https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg'
					alt='css3'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://git-scm.com/' target='_blank' rel='noreferrer'>
				<Image
					src='https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg'
					alt='git'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://jestjs.io' target='_blank' rel='noreferrer'>
				<Image
					src='https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg'
					alt='jest'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://www.cypress.io' target='_blank' rel='noreferrer'>
				<Image
					src='https://raw.githubusercontent.com/simple-icons/simple-icons/6e46ec1fc23b60c8fd0d2f2ff46db82e16dbd75f/icons/cypress.svg'
					alt='cypress'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://mochajs.org' target='_blank' rel='noreferrer'>
				<Image
					src='https://www.vectorlogo.zone/logos/mochajs/mochajs-icon.svg'
					alt='mocha'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://nodejs.org' target='_blank' rel='noreferrer'>
				<Image
					src='https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-plain.svg'
					alt='nodejs'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://www.postgresql.org' target='_blank' rel='noreferrer'>
				<Image
					src='https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg'
					alt='postgresql'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://postman.com' target='_blank' rel='noreferrer'>
				<Image
					src='https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg'
					alt='postman'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://rubyonrails.org' target='_blank' rel='noreferrer'>
				<Image
					src='https://raw.githubusercontent.com/devicons/devicon/master/icons/rails/rails-original-wordmark.svg'
					alt='rails'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://nextjs.org/' target='_blank' rel='noreferrer'>
				<Image
					src='https://cdn.worldvectorlogo.com/logos/nextjs-2.svg'
					alt='nextjs'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://reactjs.org/' target='_blank' rel='noreferrer'>
				<Image
					src='https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg'
					alt='react'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://sass-lang.com' target='_blank' rel='noreferrer'>
				<Image
					src='https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg'
					alt='sass'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://getbootstrap.com' target='_blank' rel='noreferrer'>
				<Image
					src='https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg'
					alt='bootstrap'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://socket.io/' target='_blank' rel='noreferrer'>
				<Image
					src='https://raw.githubusercontent.com/devicons/devicon/master/icons/socketio/socketio-original.svg'
					alt='socket-io'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://storybook.js.org/' target='_blank' rel='noreferrer'>
				<Image
					src='https://raw.githubusercontent.com/devicons/devicon/master/icons/storybook/storybook-original.svg'
					alt='storybook'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://www.gimp.org/' target='_blank' rel='noreferrer'>
				<Image
					src='https://raw.githubusercontent.com/devicons/devicon/master/icons/gimp/gimp-original.svg'
					alt='gimp'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://expressjs.com/' target='_blank' rel='noreferrer'>
				<Image
					src='https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg'
					alt='express'
					width={iconSize}
					height={iconSize}
				/>
			</a>
			<a href='https://www.figma.com/' target='_blank' rel='noreferrer'>
				<Image
					src='https://www.vectorlogo.zone/logos/figma/figma-icon.svg'
					alt='figma'
					width={iconSize}
					height={iconSize}
				/>
			</a>
		</div>
	);
};

export default SkillIcons;

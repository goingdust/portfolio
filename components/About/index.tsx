import styles from './index.module.scss';

const About = () => {
	return (
		<div className={styles.container}>
			<h1>A Lil Bit About Me</h1>
			<p className={styles.bio}>
				{`I started dabbling in web dev in early 2021 after building my PC. What was a little hobby
				soon became a career change and pushed me to enroll in Lighthouse Labs' Web Development
				Bootcamp. Coding's allure of seemingly-endless building possibilities keeps me learning and
				working to realize all the ideas percolating around my head.`}
			</p>
		</div>
	);
};

export default About;

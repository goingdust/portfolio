import styles from './index.module.scss';

const AnimatedLetters = ({ letterClass, strArray, index }) => {
	return (
		<span>
			{strArray.map((char: string, i: number) => (
				<span key={char + i} className={`${letterClass} _${i + index}`}>
					{char}
				</span>
			))}
		</span>
	);
};

export default AnimatedLetters;

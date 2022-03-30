import styles from './index.module.scss';

interface AnimatedLettersProps {
	letterClass: string;
	strArray: string[];
	index: number;
}

const AnimatedLetters = ({
	letterClass,
	strArray,
	index,
}: AnimatedLettersProps) => {
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

import styles from './index.module.scss';

interface AnimatedLettersProps {
	string: string;
}

const AnimatedLetters = ({ string }: AnimatedLettersProps) => {
	return (
		<span>
			{string.split('').map((char: string, index: number) => (
				<span key={index} className='text-animate-hover'>
					{char}
				</span>
			))}
		</span>
	);
};

export default AnimatedLetters;

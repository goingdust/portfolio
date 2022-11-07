import { useCallback, useState } from 'react';
import styled from 'styled-components';

const Input = ({
	styles,
	name,
	type,
	id,
  placeholder,
}: {
	styles: { readonly [key: string]: string };
	name: string;
	type: string;
	id: string;
  placeholder: string;
}) => {
	const [focused, setFocused] = useState(false);
	const [value, setValue] = useState('');
	const [cursorStart, setCursorStart] = useState<number | null>(null);

	const handleSelect = useCallback(
		(target: HTMLInputElement) => {
			if (!focused) {
				setCursorStart(null);
				return;
			} else if (
				type === 'text' ||
				type === 'search' ||
				type === 'URL' ||
				type === 'tel' ||
				type === 'password'
			) {
				if (target.selectionDirection === 'forward') {
					setCursorStart(target.selectionEnd);
				} else {
					setCursorStart(target.selectionStart);
				}
			}
		},
		[focused, type]
	);

	return (
		<Effect
			focused={focused}
			start={cursorStart}
			className={`${styles.input} ${focused ? styles.inputFocus : styles.inputBlur}`}
		>
			<input
				type={type}
				name={name}
        placeholder={placeholder}
				id={id}
				required
				value={value}
				onFocus={() => setFocused(true)}
				onBlur={(e) => setFocused(false)}
				onKeyDown={(e) => handleSelect(e.target as HTMLInputElement)}
				onMouseMove={(e) => handleSelect(e.target as HTMLInputElement)}
				onSelect={(e) => handleSelect(e.target as HTMLInputElement)}
				onChange={(e) => {
					setValue(e.target.value);
				}}
			/>
		</Effect>
	);
};

const Effect = styled.div<{ focused: boolean; start: number | null }>`
	&::after {
		content: '';
		width: 1.5ch;
		background: #6d6875;
		height: 1.5rem;
		${(props) => (props.focused ? '' : 'display: none;')}
		z-index: 1;
		top: 0.7rem;
		left: calc(0.95rem + ${(props) => (props.start ? (props.start >= 37 ? 55 : props.start * 1.5) : 0)}ch);
		position: absolute;
		animation: blinking 0.75s infinite;
	}

	@keyframes blinking {
		75% {
			opacity: 0;
		}
	}
`;

export default Input;

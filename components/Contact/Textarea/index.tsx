import { useCallback, useState } from 'react';
import styled from 'styled-components';

const Textarea = ({
	styles,
	name,
	id,
  placeholder,
}: {
	styles: { readonly [key: string]: string };
	name: string;
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
			}
			if (target.selectionDirection === 'forward') {
				setCursorStart(target.selectionEnd);
			} else {
				setCursorStart(target.selectionStart);
			}
		},
		[focused]
	);

  console.log(cursorStart)

	return (
		<Effect
			focused={focused}
			start={cursorStart}
			className={`${styles.textarea} ${focused ? styles.inputFocus : styles.inputBlur}`}
		>
			<textarea
				name={name}
				id={id}
        placeholder={placeholder}
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
		top: 0.9rem;
		left: calc(
			0.95rem + ${(props) => (props.start ? (props.start >= 37 ? 37 : props.start * 1.5) : 0)}ch
		);
		position: absolute;
		animation: blinking 0.75s infinite;
	}

	@keyframes blinking {
		75% {
			opacity: 0;
		}
	}
`;

export default Textarea;

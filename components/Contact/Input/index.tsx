import { useCallback, useState } from 'react';
import styled from 'styled-components';
import getCaretCoordinates from 'textarea-caret';

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
	const [left, setLeft] = useState<number>(0);

	const handleSelect = useCallback(
		(target: HTMLInputElement) => {
			if (!focused) return;
			if (
				type === 'text' ||
				type === 'search' ||
				type === 'URL' ||
				type === 'tel' ||
				type === 'password'
			) {
				const targetSelection =
					target.selectionDirection === 'forward' ? target.selectionEnd : target.selectionStart;
				const caret = getCaretCoordinates(target, targetSelection as number);
				setLeft(() => {
					return target.offsetWidth <= caret.left ? target.offsetWidth : caret.left;
				});
			}
		},
		[focused, type]
	);

	return (
		<Effect
			focused={focused}
			left={left}
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
				onBlur={() => setFocused(false)}
				onSelect={(e) => handleSelect(e.target as HTMLInputElement)}
				onChange={(e) => {
					const charWidth = e.target.offsetWidth / 37;
					setValue((prev) => {
						return left >= e.target.offsetWidth - charWidth * 2 &&
							prev.length < e.target.value.length
							? prev
							: e.target.value;
					});
				}}
			/>
		</Effect>
	);
};

const Effect = styled.div<{ focused: boolean; left: number }>`
	&::after {
		${(props) => (props.focused ? '' : 'display: none;')}
		left: ${(props) => props.left}px;
	}
`;

export default Input;

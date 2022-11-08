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
	const [scrollWidth, setScrollWidth] = useState<undefined | number>();
	const [width, setWidth] = useState<undefined | number>();

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
				if (!scrollWidth) {
					setScrollWidth(target.scrollWidth);
				}
				if (!width) {
					setWidth(target.offsetWidth);
				}
				const targetSelection =
					target.selectionDirection === 'forward' ? target.selectionEnd : target.selectionStart;
				const caret = getCaretCoordinates(target, targetSelection as number);
				if (scrollWidth && width && target.scrollWidth > scrollWidth) {
					setLeft(caret.left - (target.scrollWidth - scrollWidth - (width - scrollWidth)));
				} else {
					setLeft(caret.left);
				}
			}
		},
		[focused, type, scrollWidth, width]
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
				onChange={(e) => setValue(e.target.value)}
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

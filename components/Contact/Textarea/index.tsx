import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import getCaretCoordinates from 'textarea-caret';

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
	const ref = useRef<HTMLTextAreaElement | null>(null);
	const [top, setTop] = useState<number>(0);
	const [left, setLeft] = useState<number>(0);

	const handleSelect = useCallback(
		(target: HTMLTextAreaElement) => {
			if (!focused) return;
			const targetSelection =
				target.selectionDirection === 'forward' ? target.selectionEnd : target.selectionStart;
			const caret = getCaretCoordinates(target, targetSelection);
			setTop(caret.top);
			setLeft(caret.left);
		},
		[focused]
	);

	return (
		<Effect
			focused={focused}
			left={left}
			top={top}
			className={`${styles.textarea} ${focused ? styles.inputFocus : styles.inputBlur}`}
		>
			<textarea
				name={name}
				ref={ref}
				id={id}
				placeholder={placeholder}
				required
				value={value}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				onSelect={(e) => handleSelect(e.target as HTMLTextAreaElement)}
				onChange={(e) => {
					const charHeight = e.target.offsetHeight / 18;
					setValue((prev) => {
						return top >= e.target.offsetHeight - charHeight * 2 &&
							prev.length < e.target.value.length
							? prev
							: e.target.value;
					});
				}}
			/>
		</Effect>
	);
};

const Effect = styled.div<{ focused: boolean; top: number; left: number }>`
	&::after {
		${(props) => (props.focused ? '' : 'display: none;')}
		top: ${(props) => props.top}px;
		left: ${(props) => props.left}px;
	}
`;

export default Textarea;

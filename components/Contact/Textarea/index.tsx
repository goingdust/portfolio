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
	const [scrollHeight, setScrollHeight] = useState<undefined | number>();
	const [height, setHeight] = useState<undefined | number>();
	const [hide, setHide] = useState(false);

	const handleSelect = useCallback(
		(target: HTMLTextAreaElement) => {
			if (!focused) return;
			if (!scrollHeight) {
				setScrollHeight(target.scrollHeight);
			}
			if (!height) {
				setHeight(target.offsetHeight);
			}
			const targetSelection =
				target.selectionDirection === 'forward' ? target.selectionEnd : target.selectionStart;
			const caret = getCaretCoordinates(target, targetSelection);
			console.log(caret.top);
			if (scrollHeight && scrollHeight + target.scrollTop < caret.top) {
				setHide(true);
			} else if (scrollHeight && target.scrollHeight > scrollHeight) {
				setHide(false);
				setTop(caret.top + -(target.scrollHeight - target.scrollTop));
			} else {
				setHide(false);
				setTop(caret.top);
			}
			setLeft(caret.left);
		},
		[focused, height, scrollHeight]
	);

	return (
		<Effect
			focused={focused}
			left={left}
			top={top}
			hide={hide}
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
				onChange={(e) => setValue(e.target.value)}
				onScroll={(e) => handleSelect(e.target as HTMLTextAreaElement)}
			/>
		</Effect>
	);
};

const Effect = styled.div<{ focused: boolean; top: number; left: number; hide: boolean }>`
	&::after {
		${(props) => (props.focused ? '' : 'display: none;')}
		top: ${(props) => props.top}px;
		left: ${(props) => props.left}px;
		visibility: ${(props) => (props.hide ? 'hidden' : 'visible')};
	}
`;

export default Textarea;

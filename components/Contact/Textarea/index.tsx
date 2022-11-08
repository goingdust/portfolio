import { CSSProperties, useCallback, useRef, useState } from 'react';
import getCaretCoordinates from 'textarea-caret';
import styles from './index.module.scss';

const Textarea = ({
	contactStyles,
	name,
	id,
	placeholder,
}: {
	contactStyles: { readonly [key: string]: string };
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
	const [hide, setHide] = useState(false);

	const handleSelect = useCallback(
		(target: HTMLTextAreaElement) => {
			if (!focused) return;
			if (!scrollHeight) {
				setScrollHeight(target.scrollHeight);
			}
			const targetSelection =
				target.selectionDirection === 'forward' ? target.selectionEnd : target.selectionStart;
			const caret = getCaretCoordinates(target, targetSelection);

			if (scrollHeight! + target.scrollTop < caret.top || caret.top < target.scrollTop) {
				setHide(true);
			} else if (target.scrollHeight > scrollHeight!) {
				setHide(false);
				setTop(caret.top - (scrollHeight! + (target.scrollTop - scrollHeight!)));
			} else {
				setHide(false);
				setTop(caret.top);
			}
			setLeft(caret.left);
		},
		[focused, scrollHeight]
	);

	const style = {
		'--caret-top': `${top}px`,
		'--caret-left': `${left}px`,
		'--caret-hidden': hide || !focused ? 'hidden' : 'visible',
	} as CSSProperties;

	return (
		<div
			className={`${styles.caret} ${contactStyles.textarea} ${
				focused ? contactStyles.inputFocus : contactStyles.inputBlur
			}`}
			style={style}
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
		</div>
	);
};

export default Textarea;

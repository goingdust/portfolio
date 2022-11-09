import { CSSProperties, useCallback, useState } from 'react';
import getCaretCoordinates from 'textarea-caret';
import styles from './index.module.scss';

const Input = ({
	contactStyles,
	name,
	type,
	id,
	placeholder,
}: {
	contactStyles: { readonly [key: string]: string };
	name: string;
	type: string;
	id: string;
	placeholder: string;
}) => {
	const [focused, setFocused] = useState(false);
	const [value, setValue] = useState('');
	const [left, setLeft] = useState<number>(0);
	const [scrollWidth, setScrollWidth] = useState<undefined | number>();

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
				const targetSelection =
					target.selectionDirection === 'forward' ? target.selectionEnd : target.selectionStart;
				const caret = getCaretCoordinates(target, targetSelection as number);
				if (target.scrollWidth > scrollWidth!) {
					setLeft(caret.left - (scrollWidth! + (target.scrollLeft - scrollWidth!)));
				} else {
					setLeft(caret.left);
				}
			}
		},
		[focused, type, scrollWidth]
	);

	const style = {
		'--caret-left': `${left}px`,
		'--focused': focused ? 'visible' : 'hidden',
	} as CSSProperties;

	return (
		<div
			className={`${styles.caret} ${contactStyles.input} ${
				focused ? contactStyles.inputFocus : contactStyles.inputBlur
			}`}
			style={style}
		>
			<input
				type={type}
				name={name}
				placeholder={focused ? undefined : placeholder}
				id={id}
				required
				value={value}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				onSelect={(e) => handleSelect(e.target as HTMLInputElement)}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
};

export default Input;

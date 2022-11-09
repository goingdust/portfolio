import { CSSProperties, SetStateAction, useCallback, useState, Dispatch } from 'react';
import getCaretCoordinates from 'textarea-caret';
import { ContactFormFocus, ContactFormId, ContactFormValues } from '../../../types';
import styles from './index.module.scss';

type InputProps<
	T extends ContactFormValues,
	U extends ContactFormId,
	V extends ContactFormFocus
> = {
	contactStyles: { readonly [key: string]: string };
	name: string;
	type: string;
	id: U;
	placeholder: string;
	validator?: (value: string) => string | undefined;
	errors: T;
	setErrors: Dispatch<SetStateAction<T>>;
	values: T;
	setValues: Dispatch<SetStateAction<T>>;
	focus: V;
	setFocus: Dispatch<SetStateAction<V>>;
};

const Input = <T extends ContactFormValues, U extends ContactFormId, V extends ContactFormFocus>({
	contactStyles,
	name,
	type,
	id,
	placeholder,
	validator,
	errors,
	setErrors,
	values,
	setValues,
	focus,
	setFocus,
}: InputProps<T, U, V>) => {
	const [left, setLeft] = useState<number>(0);
	const [scrollWidth, setScrollWidth] = useState<undefined | number>();

	const handleSelect = useCallback(
		(target: HTMLInputElement) => {
			if (!focus[id]) return;
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
		[focus, type, scrollWidth, id]
	);

	const style = {
		'--caret-left': `${left}px`,
		'--focused': focus[id] ? 'visible' : 'hidden',
	} as CSSProperties;

	return (
		<>
			<div
				className={`${styles.caret} ${contactStyles.input} ${
					focus[id] ? contactStyles.inputFocus : contactStyles.inputBlur
				}`}
				style={style}
			>
				<input
					type={type}
					name={name}
					placeholder={focus[id] ? undefined : placeholder}
					id={id}
					required
					value={values[id]}
					onFocus={() => {
						setFocus((prev) => ({ ...prev, [id]: true }));
						setErrors((prev) => ({ ...prev, [id]: '' }));
					}}
					onBlur={() => {
						setFocus((prev) => ({ ...prev, [id]: false }));
						validator && setErrors((prev) => ({ ...prev, [id]: validator(values[id]) }));
					}}
					onSelect={(e) => handleSelect(e.target as HTMLInputElement)}
					onChange={(e) => setValues((prev) => ({ ...prev, [id]: e.target.value }))}
				/>
			</div>
			{errors[id] && <span>{errors[id]}</span>}
		</>
	);
};

export default Input;

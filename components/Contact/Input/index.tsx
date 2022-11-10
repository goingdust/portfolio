import { CSSProperties, SetStateAction, useCallback, useState, Dispatch, useMemo } from 'react';
import getCaretCoordinates from 'textarea-caret';
import { composeValidators } from '../../../helpers/validators';
import {
	ContactFormFocus,
	ContactFormId,
	ContactFormValidators,
	ContactFormValues,
} from '../../../types';
import styles from './index.module.scss';

type InputProps<
	T extends ContactFormValues,
	U extends ContactFormId,
	V extends ContactFormFocus
> = {
	contactStyles: { readonly [key: string]: string };
	name: string;
	type: string;
	required?: boolean;
	id: U;
	placeholder: string;
	validators?: ContactFormValidators;
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
	required,
	id,
	placeholder,
	validators,
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

	const style = useMemo(
		() => ({
			'--caret-left': `${left}px`,
			'--focused': focus[id] ? 'visible' : 'hidden',
		}),
		[left, focus, id]
	) as CSSProperties;

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
					required={required}
					value={values[id]}
					onFocus={() => {
						setFocus((prev) => ({ ...prev, [id]: true }));
					}}
					onBlur={() => {
						setFocus((prev) => ({ ...prev, [id]: false }));
						validators &&
							setErrors((prev) => ({
								...prev,
								[id]: composeValidators(values[id], name, validators[id]),
							}));
					}}
					onSelect={(e) => handleSelect(e.target as HTMLInputElement)}
					onChange={(e) => {
						setValues((prev) => ({ ...prev, [id]: e.target.value }));
						if (validators) {
							const errors = composeValidators(e.target.value, name, validators[id]);
							if (!errors) setErrors((prev) => ({ ...prev, [id]: '' }));
						}
					}}
				/>
			</div>
			{errors[id] && <span className={styles.error}>{errors[id]}</span>}
		</>
	);
};

export default Input;

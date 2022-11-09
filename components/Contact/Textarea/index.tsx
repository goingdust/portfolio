import { CSSProperties, Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import getCaretCoordinates from 'textarea-caret';
import { ContactFormFocus, ContactFormId, ContactFormValues } from '../../../types';
import styles from './index.module.scss';

type TextareaProps<
	T extends ContactFormValues,
	U extends ContactFormId,
	V extends ContactFormFocus
> = {
	contactStyles: { readonly [key: string]: string };
	name: string;
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

const Textarea = <
	T extends ContactFormValues,
	U extends ContactFormId,
	V extends ContactFormFocus
>({
	contactStyles,
	name,
	id,
	placeholder,
	validator,
	errors,
	setErrors,
	values,
	setValues,
	focus,
	setFocus,
}: TextareaProps<T, U, V>) => {
	const ref = useRef<HTMLTextAreaElement | null>(null);
	const [top, setTop] = useState<number>(0);
	const [left, setLeft] = useState<number>(0);
	const [scrollHeight, setScrollHeight] = useState<undefined | number>();
	const [hide, setHide] = useState(false);

	const handleSelect = useCallback(
		(target: HTMLTextAreaElement) => {
			if (!focus[id]) return;
			if (!scrollHeight) {
				setScrollHeight(target.scrollHeight);
			}
			const targetSelection =
				target.selectionDirection === 'forward' ? target.selectionEnd : target.selectionStart;
			const caret = getCaretCoordinates(target, targetSelection);

			if (scrollHeight! + target.scrollTop < caret.top + 20 || caret.top < target.scrollTop) {
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
		[focus, scrollHeight, id]
	);

	const style = {
		'--caret-top': `${top}px`,
		'--caret-left': `${left}px`,
		'--caret-hidden': hide || !focus[id] ? 'hidden' : 'visible',
	} as CSSProperties;

	return (
		<>
			<div
				className={`${styles.caret} ${contactStyles.textarea} ${
					focus[id] ? contactStyles.inputFocus : contactStyles.inputBlur
				}`}
				style={style}
			>
				<textarea
					name={name}
					ref={ref}
					id={id}
					placeholder={focus[id] ? undefined : placeholder}
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
					onSelect={(e) => handleSelect(e.target as HTMLTextAreaElement)}
					onChange={(e) => setValues((prev) => ({ ...prev, [id]: e.target.value }))}
					onScroll={(e) => handleSelect(e.target as HTMLTextAreaElement)}
				/>
			</div>
			{errors[id] && <span>{errors[id]}</span>}
		</>
	);
};

export default Textarea;

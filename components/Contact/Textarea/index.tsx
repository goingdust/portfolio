import {
	CSSProperties,
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import getCaretCoordinates from 'textarea-caret';
import { HideNavContext } from '../../../contexts/HideNavProvider';
import { composeValidators } from '../../../helpers/validators';
import useWindowSize from '../../../hooks/useWindowSize';
import {
	ContactFormFocus,
	ContactFormId,
	ContactFormValidators,
	ContactFormValues,
} from '../../../types';
import styles from './index.module.scss';

type TextareaProps<
	T extends ContactFormValues,
	U extends ContactFormId,
	V extends ContactFormFocus
> = {
	contactStyles: { readonly [key: string]: string };
	name: string;
	id: U;
	required?: boolean;
	placeholder: string;
	validators?: ContactFormValidators;
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
	required,
	placeholder,
	validators,
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
	const { isMobile } = useWindowSize();
	const { setHideNav } = useContext(HideNavContext);

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

	useEffect(() => {
		if (isMobile) {
			document.getElementById('page-container')?.addEventListener('touchmove', () => {
				if (focus[id]) {
					setHideNav(false);
				}
			});
		}
	}, [setHideNav, focus, id, isMobile]);

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
					required={required}
					value={values[id]}
					onFocus={() => {
						if (isMobile) {
							setHideNav(true);
						}
						setFocus((prev) => ({ ...prev, [id]: true }));
						setErrors((prev) => ({ ...prev, [id]: '' }));
					}}
					onBlur={() => {
						if (isMobile) {
							setHideNav(false);
						}
						setFocus((prev) => ({ ...prev, [id]: false }));
						validators &&
							setErrors((prev) => ({
								...prev,
								[id]: composeValidators(values[id], name, validators[id]),
							}));
					}}
					onSelect={(e) => handleSelect(e.target as HTMLTextAreaElement)}
					onChange={(e) => setValues((prev) => ({ ...prev, [id]: e.target.value }))}
					onScroll={(e) => handleSelect(e.target as HTMLTextAreaElement)}
				/>
			</div>
			{errors[id] && <span className={styles.error}>{errors[id]}</span>}
		</>
	);
};

export default Textarea;

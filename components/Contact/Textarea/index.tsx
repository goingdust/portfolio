import { useRouter } from 'next/router';
import {
	CSSProperties,
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useMemo,
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
	const { hideNav, setHideNav } = useContext(HideNavContext);
	const router = useRouter();
	const [height, setHeight] = useState<number | undefined>();
	const [lastDownY, setLastDownY] = useState(0);
	const [isResizing, setIsResizing] = useState(false);

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

	// for unhiding the nav buttons when navigating away from the page
	useEffect(() => {
		if (isMobile) {
			router.events.on('routeChangeStart', () => {
				if (hideNav) {
					setHideNav(false);
				}
			});
		}
	}, [setHideNav, isMobile, hideNav, router.events]);

	const style = useMemo(
		() => ({
			'--caret-top': `${top}px`,
			'--caret-left': `${left}px`,
			'--caret-hidden': hide || !focus[id] ? 'hidden' : 'visible',
			'--textarea-height': height ? height + 'px' : '30rem',
		}),
		[focus, hide, id, top, left, height]
	) as CSSProperties;

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
							// for hiding the nav buttons because of mobile keyboard taking up screen
							setHideNav(true);
						}
						setFocus((prev) => ({ ...prev, [id]: true }));
						setErrors((prev) => ({ ...prev, [id]: '' }));
					}}
					onBlur={() => {
						if (isMobile) {
							// unhide the nav buttons
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
				<button
					onMouseDown={(e) => {
						setIsResizing(true);
						setLastDownY(e.clientY);
					}}
					onMouseMove={(e) => {
						if (!isResizing || !e.currentTarget.parentElement) return;
						const textareaDiv = e.currentTarget.parentElement;
						const height = parseFloat(window.getComputedStyle(textareaDiv).height);
						setHeight((prev) => {
              console.log(prev)
							if (lastDownY < e.clientY) {
								return (prev ? prev : height) + 1.000;
							} else if (lastDownY > e.clientY) {
								return (prev ? prev : height) - 1.000;
							}
						});
            setLastDownY(e.clientY)
					}}
          onMouseUp={() => setIsResizing(false)}
          onMouseLeave={() => setIsResizing(false)}
					type='button'
					className={styles.dragButton}
				>
					<div />
				</button>
			</div>
			{errors[id] && <span className={styles.error}>{errors[id]}</span>}
		</>
	);
};

export default Textarea;

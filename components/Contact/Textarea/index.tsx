import { useRouter } from 'next/router';
import {
	CSSProperties,
	Dispatch,
	SetStateAction,
	SyntheticEvent,
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
import { Resizable, ResizeCallbackData } from 'react-resizable';
import 'react-resizable/css/styles.css';
import ResizableHandle from './ResizableHandle';

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
	const [height, setHeight] = useState<number>(400);

	const handleSelect = useCallback(
		(target: HTMLTextAreaElement) => {
			if (!focus[id]) return;
			if (!scrollHeight) {
				setScrollHeight(target.scrollHeight);
			}
			const targetSelection =
				target.selectionDirection === 'forward' ? target.selectionEnd : target.selectionStart;
			const caret = getCaretCoordinates(target, targetSelection);

			if (target.offsetHeight + target.scrollTop - 20 < caret.top || caret.top < target.scrollTop) {
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
			'--textarea-height': `${height}px`,
		}),
		[focus, hide, id, top, left, height]
	) as CSSProperties;

	return (
		<>
			<Resizable
				width={document.getElementById(id)?.parentElement?.offsetWidth!}
				onResize={(e: SyntheticEvent, data: ResizeCallbackData) => {
					setHeight(data.size.height);
				}}
				onResizeStart={() => ref.current?.blur()}
				onResizeStop={() => ref.current?.focus()}
				height={height}
				resizeHandles={['s']}
				minConstraints={[0, 300]}
				maxConstraints={[0, 800]}
				handle={<ResizableHandle styles={styles} />}
			>
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
						onFocus={(e) => {
							if (isMobile) {
								// for hiding the nav buttons because of mobile keyboard taking up screen
								setHideNav(true);
							}
							setFocus((prev) => ({ ...prev, [id]: true }));
							setErrors((prev) => ({ ...prev, [id]: '' }));
							// const targetSelection =
							// 	e.target.selectionDirection === 'forward'
							// 		? e.target.selectionEnd
							// 		: e.target.selectionStart;
							// const caret = getCaretCoordinates(e.target, targetSelection);
							// e.target.scrollTo(caret.left, caret.top);
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
				</div>
			</Resizable>
			{errors[id] && <span className={styles.error}>{errors[id]}</span>}
		</>
	);
};

export default Textarea;

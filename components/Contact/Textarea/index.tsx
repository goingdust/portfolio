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
	const { isMobile, isTablet } = useWindowSize();
	const { hideNav, setHideNav } = useContext(HideNavContext);
	const router = useRouter();
	const [height, setHeight] = useState<number>(isMobile ? 200 : isTablet ? 250 : 300);
	const minHeight = useMemo(() => (isMobile ? 250 : isTablet ? 300 : 345), [isMobile, isTablet]);
	const maxHeight = useMemo(() => (isMobile ? 500 : isTablet ? 600 : 700), [isMobile, isTablet]);

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

  // CSS variables
	const style = useMemo(
		() => ({
			'--caret-top': `${top}px`,
			'--caret-left': `${left}px`,
			'--caret-hidden': hide || !focus[id] ? 'hidden' : 'visible',
		}),
		[focus, hide, id, top, left]
	) as CSSProperties;

	const styleHeight = useMemo(
		() => ({
			'--textarea-height': `${height}px`,
		}),
		[height]
	) as CSSProperties;

	return (
		<>
			<Resizable
				width={0}
				onResize={(e: SyntheticEvent, data: ResizeCallbackData) => {
					setHeight(data.size.height);
				}}
				onResizeStart={() => ref.current?.blur()}
				height={height}
				resizeHandles={['s']}
				minConstraints={[0, minHeight]}
				maxConstraints={[0, maxHeight]}
				handle={
					<ResizableHandle
						styles={styles}
						height={height}
						minHeight={minHeight}
						maxHeight={maxHeight}
					/>
				}
			>
				<div
					className={`${styles.caret} ${contactStyles.textarea} ${
						focus[id] ? contactStyles.textareaFocus : contactStyles.textareaBlur
					}`}
					style={{...style, ...styleHeight}}
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

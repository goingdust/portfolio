import React, { MutableRefObject, useMemo, useState } from 'react';

const ResizableHandle = React.forwardRef(
	(
		props: {
			handleAxis?: string;
			styles?: { readonly [key: string]: string };
			height?: number;
			minHeight?: number;
			maxHeight?: number;
		},
		ref
	) => {
		const { handleAxis, styles, height, minHeight, maxHeight } = props;
		const [className, setClassName] = useState<string | undefined>('');
		const resizeProps = useMemo(() => {
			const newProps = { ...props };
			delete newProps.styles;
			delete newProps.height;
			delete newProps.minHeight;
			delete newProps.maxHeight;
			delete newProps.handleAxis;
			return newProps;
		}, [props]);

		const icon = useMemo(() => {
			return height! <= minHeight! ? (
				<div className={className}>↧</div>
			) : height! >= maxHeight! ? (
				<div className={className}>↥</div>
			) : (
				<div className={className}>↨</div>
			);
		}, [className, height, maxHeight, minHeight]);

		return (
			<button
				ref={ref as MutableRefObject<HTMLButtonElement | null>}
				type='button'
				className={`${styles?.dragButton} handle-${handleAxis}`}
				aria-label='Adjust Message Box Height'
				aria-haspopup='true'
				{...resizeProps}
				onTouchStart={() => setClassName(styles?.dragMe)}
				onTouchEnd={() => setClassName(styles?.dragMeNot)}
				onMouseEnter={() => setClassName(styles?.dragMe)}
				onMouseLeave={() => setClassName(styles?.dragMeNot)}
			>
				{icon}
			</button>
		);
	}
);

ResizableHandle.displayName = 'ResizableHandle';

export default ResizableHandle;

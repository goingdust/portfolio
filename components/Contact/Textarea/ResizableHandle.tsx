import React, { MutableRefObject, useState } from 'react';

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
		const resizeProps = {
			...props,
		};
		delete resizeProps.styles;
		delete resizeProps.height;
		delete resizeProps.minHeight;
		delete resizeProps.maxHeight;
		delete resizeProps.handleAxis;

		const [className, setClassName] = useState<string | undefined>('');
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
				{height! <= minHeight! ? (
					<div className={className}>↧</div>
				) : height! >= maxHeight! ? (
					<div className={className}>↥</div>
				) : (
					<div className={className}>↨</div>
				)}
			</button>
		);
	}
);

ResizableHandle.displayName = 'ResizableHandle';

export default ResizableHandle;

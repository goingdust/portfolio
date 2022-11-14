import React, { MutableRefObject, useState } from 'react';

const ResizableHandle = React.forwardRef(
	(
		props: {
			styles: { readonly [key: string]: string };
			height: number;
			minHeight: number;
			maxHeight: number;
		},
		ref
	) => {
		const { styles, height, minHeight, maxHeight } = props;
    const [className, setClassName] = useState('');
		return (
			<button
				ref={ref as MutableRefObject<HTMLButtonElement | null>}
				type='button'
				className={styles.dragButton}
				aria-label='Adjust Message Box Height'
        aria-haspopup="true"
				{...props}
        onTouchStart={() => setClassName(styles.dragMe)}
        onTouchEnd={() => setClassName(styles.dragMeNot)}
        onMouseEnter={() => setClassName(styles.dragMe)}
        onMouseLeave={() => setClassName(styles.dragMeNot)}
			>
				{height <= minHeight ? (
					<div className={className}>↧</div>
				) : height >= maxHeight ? (
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

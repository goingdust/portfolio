import React, { MutableRefObject } from 'react';

const ResizableHandle = React.forwardRef(
	(props: { styles: { readonly [key: string]: string } }, ref) => {
		const { styles } = props;
		return (
			<button
				ref={ref as MutableRefObject<HTMLButtonElement | null>}
				type='button'
				className={styles.dragButton}
        aria-label="Adjust Message Box Height"
        {...props}
			>
				<div />
        <div />
			</button>
		);
	}
);

ResizableHandle.displayName = 'ResizableHandle';

export default ResizableHandle;

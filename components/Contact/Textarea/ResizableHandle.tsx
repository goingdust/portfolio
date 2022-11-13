import React, { MutableRefObject } from 'react';

const ResizableHandle = React.forwardRef(
	(props: { styles: { readonly [key: string]: string } }, ref) => {
		const { styles } = props;
		return (
			<button
				ref={ref as MutableRefObject<HTMLButtonElement | null>}
				type='button'
				className={styles.dragButton}
        {...props}
			>
				<div />
			</button>
		);
	}
);

ResizableHandle.displayName = 'ResizableHandle';

export default ResizableHandle;

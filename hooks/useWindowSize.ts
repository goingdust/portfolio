import { useEffect, useState } from 'react';

const useWindowSize = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);

	const handleWindowSizeChange = () => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	const isMobile = width <= 667;
	const isTablet = width <= 1024 && width >= 668;
	const isDesktop = width >= 1025;

	return { isMobile, isTablet, isDesktop, windowWidth: width };
};

export default useWindowSize;

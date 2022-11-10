import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type HideNavContextType = {
	hideNav: boolean;
	setHideNav: Dispatch<SetStateAction<boolean>>;
};

const HideNavContext = createContext({} as HideNavContextType);
const { Provider } = HideNavContext;

const HideNavProvider = ({ children }: { children: ReactNode }) => {
	const [hideNav, setHideNav] = useState(false);
	return <Provider value={{ hideNav, setHideNav }}>{children}</Provider>;
};

export { HideNavContext, HideNavProvider };

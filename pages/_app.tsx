import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { HideNavProvider } from '../contexts/HideNavProvider';

function MyApp({ Component, pageProps }: AppProps) {
	const [isLoaderVisible, setIsLoaderVisible] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsLoaderVisible(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width, height=device-height, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
				/>
				<title>Dusty Luck</title>
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest' />
			</Head>
			{isLoaderVisible ? (
				<Loader />
			) : (
				<HideNavProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</HideNavProvider>
			)}
		</>
	);
}

export default MyApp;

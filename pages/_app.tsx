import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Head from 'next/head';
import { CSSProperties, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { HideNavProvider } from '../contexts/HideNavProvider';
import { useRouter } from 'next/router';
import BlocksLoader from '../components/BlocksLoader';

function MyApp({ Component, pageProps }: AppProps) {
	const [isLoaderVisible, setIsLoaderVisible] = useState(true);
	const [routeChanging, setRouteChanging] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsLoaderVisible(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		router.events.on('routeChangeStart', () => {
			setRouteChanging(true);
		});
		router.events.on('routeChangeComplete', () => {
			setRouteChanging(false);
		});
	}, [router.events]);

	const routeLoadingStyle = {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'--size-times': 1.5,
	} as CSSProperties;

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
						{routeChanging ? (
							<div style={routeLoadingStyle}>
								<BlocksLoader />
							</div>
						) : (
							<Component {...pageProps} />
						)}
					</Layout>
				</HideNavProvider>
			)}
		</>
	);
}

export default MyApp;

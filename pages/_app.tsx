import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';

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
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			{isLoaderVisible ? (
				<Loader />
			) : (
				<Layout>
					<Component {...pageProps} />
				</Layout>
			)}
		</>
	);
}

export default MyApp;

import '../styles/globals.scss';
import '../styles/text-animate.scss';
import '../styles/nav-button-animate.scss';
import 'animate.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Dusty Luck</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default MyApp;

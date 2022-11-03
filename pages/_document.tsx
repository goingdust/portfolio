import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
	return (
		<Html>
			<Head>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;

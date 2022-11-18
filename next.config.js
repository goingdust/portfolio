const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack(config) {
		config.resolve.alias = {
			...config.resolve.alias,
			'@styles': path.resolve(__dirname, 'styles'),
		};
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'raw.githubusercontent.com',
			},
			{ protocol: 'https', hostname: 'www.vectorlogo.zone' },
			{ protocol: 'https', hostname: 'cdn.worldvectorlogo.com' },
		],
	},
};

module.exports = nextConfig;

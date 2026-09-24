/** @type {import('next').NextConfig} */
const nextConfig = {
	// Storyblok tokens are only read on the server (see src/lib/storyblok.js),
	// so they are no longer exposed to the browser bundle.
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'a.storyblok.com' },
			{ protocol: 'https', hostname: 'a-us.storyblok.com' },
			{ protocol: 'https', hostname: 'a-ca.storyblok.com' },
			{ protocol: 'https', hostname: 'a-ap.storyblok.com' },
		],
	},
};

export default nextConfig;

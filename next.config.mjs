/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Images uploaded to Storyblok (all regions).
		remotePatterns: [
			{ protocol: 'https', hostname: 'a.storyblok.com' },
			{ protocol: 'https', hostname: 'a-us.storyblok.com' },
			{ protocol: 'https', hostname: 'a-ca.storyblok.com' },
			{ protocol: 'https', hostname: 'a-ap.storyblok.com' },
		],
	},
};

export default nextConfig;

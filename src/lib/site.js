/**
 * Global site settings. Everything page-specific lives in Storyblok;
 * these are the few things that rarely change.
 */
export const site = {
	name: 'Manouk Bislick',
	shortName: 'Manouk',
	role: 'Frontend developer',
	description:
		'Portfolio of Manouk Bislick — frontend developer crafting calm, thoughtful websites with Next.js, React and Storyblok.',
	url:
		process.env.NEXT_PUBLIC_SITE_URL ||
		(process.env.VERCEL_PROJECT_PRODUCTION_URL
			? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
			: 'http://localhost:3000'),
	email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@example.com',
	location: 'The Netherlands',
	nav: [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Contact', href: '/contact' },
	],
	socials: [
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
		{
			label: 'GitHub',
			href: 'https://github.com/ManoukBislick',
			icon: 'github',
		},
		{
			label: 'Instagram',
			href: 'https://www.instagram.com/',
			icon: 'instagram',
		},
	],
};

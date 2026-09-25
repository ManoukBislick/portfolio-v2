/**
 * Global site settings. All page content (texts, projects, blog posts) is in Storyblok.
 */
export const site = {
	name: 'Manouk Bislick',
	role: 'Frontend developer',
	description:
		'Manouk Bislick is a frontend developer in the Netherlands. Projects, notes and articles about CSS, React, Next.js and AI.',
	url:
		process.env.NEXT_PUBLIC_SITE_URL ||
		(process.env.VERCEL_PROJECT_PRODUCTION_URL
			? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
			: 'http://localhost:3000'),
	nav: [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Blog', href: '/blog' },
	],
	// Shown in the footer. Replace the LinkedIn URL with your own profile, or remove it.
	socials: [
		{ label: 'GitHub', href: 'https://github.com/ManoukBislick' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/' },
	],
};

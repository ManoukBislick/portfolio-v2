import { bold, doc, h, p, ul } from './richtext.js';

const img = (name, alt) => ({
	filename: `/images/placeholders/${name}.svg`,
	alt,
});

const project = (slug, content) => ({
	name: content.title,
	slug,
	full_slug: `projects/${slug}`,
	uuid: `fallback-project-${slug}`,
	content: { _uid: `project-${slug}`, component: 'project', ...content },
});

/** Placeholder projects. The first one is real — this very website. */
export const projects = [
	project('portfolio-v2', {
		title: 'This portfolio',
		summary:
			'A calm, green portfolio built with atomic design, a headless CMS and gentle GSAP animations.',
		cover: img('project-1', 'The homepage of this portfolio'),
		year: '2026',
		role: 'Design & development',
		client: 'Personal project',
		stack: 'Next.js, React, Storyblok, Tailwind CSS, GSAP, Vercel',
		tags: 'Next.js, Storyblok, Motion',
		tint: 'sage',
		featured: true,
		url: { linktype: 'url', url: '', cached_url: '' },
		gallery: [],
		body: doc(
			h(2, 'The idea'),
			p(
				'I wanted a portfolio that feels like a deep breath: light colours, lots of space, a classic serif paired with Poppins, and animations that are there when you look for them — never in the way.',
			),
			h(2, 'How it’s built'),
			ul(
				'Next.js App Router with React Server Components, deployed on Vercel.',
				'Every section is a Storyblok block, so pages can be rearranged without touching code.',
				'An atomic design system in Tailwind CSS v4: atoms, molecules, organisms and templates.',
				'GSAP for split-text reveals, drawn botanical lines, a slow marquee and Flip-powered filters.',
			),
			p(
				bold('Respecting motion preferences: '),
				'all animations switch off automatically when someone prefers reduced motion.',
			),
		),
	}),
	project('sample-mission-driven-website', {
		title: 'Sample — Mission-driven website',
		summary:
			'Placeholder project. Replace it with a real case in Storyblok — an ExpressionEngine site you are proud of would be perfect here.',
		cover: img('project-2', 'Placeholder project cover'),
		year: '20XX',
		role: 'Frontend development',
		client: 'Client name',
		stack: 'ExpressionEngine, Sass, JavaScript',
		tags: 'ExpressionEngine, CSS, Sample',
		tint: 'blush',
		featured: true,
		gallery: [],
		body: doc(
			h(2, 'The challenge'),
			p('Describe the problem the client had and what success looked like.'),
			h(2, 'What I did'),
			p(
				'Walk through your approach: the structure, the tricky CSS, the details you are proud of.',
			),
			h(2, 'The result'),
			p('Share the outcome — a quote, a number or simply what you learned.'),
		),
	}),
	project('sample-design-system', {
		title: 'Sample — A small design system',
		summary:
			'Placeholder project. A great spot for a component library, style guide or a set of reusable templates.',
		cover: img('project-3', 'Placeholder project cover'),
		year: '20XX',
		role: 'Design system & CSS',
		client: 'Client name',
		stack: 'Tailwind CSS, Storybook, Figma',
		tags: 'Tailwind CSS, Design systems, Sample',
		tint: 'cream',
		featured: false,
		gallery: [],
		body: doc(
			p(
				'Tell the story of this project in a few short sections, with images in the gallery below.',
			),
		),
	}),
	project('sample-storyblok-starter', {
		title: 'Sample — Storyblok starter',
		summary:
			'Placeholder project. Show off a headless build: content modelling, the Visual Editor and a fast frontend.',
		cover: img('project-4', 'Placeholder project cover'),
		year: '20XX',
		role: 'Frontend development',
		client: 'Side project',
		stack: 'Storyblok, Next.js, React',
		tags: 'Storyblok, Next.js, Sample',
		tint: 'sage',
		featured: false,
		gallery: [],
		body: doc(
			p(
				'Tell the story of this project in a few short sections, with images in the gallery below.',
			),
		),
	}),
];

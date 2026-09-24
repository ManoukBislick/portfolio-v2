import { doc, h, italic, p } from './richtext.js';

/**
 * Placeholder content in the exact shape Storyblok returns.
 * Used when no Storyblok token is configured (or a story doesn't exist yet),
 * and pushed into Storyblok as starting content by `npm run storyblok:setup`.
 * Replace everything here with your own words in Storyblok.
 */

const img = (name, alt) => ({
	filename: `/images/placeholders/${name}.svg`,
	alt,
});
const link = (path) => ({ linktype: 'url', url: path, cached_url: path });

let counter = 0;
const uid = (prefix) => `${prefix}-${String(++counter).padStart(3, '0')}`;

const story = (slug, name, body, extra = {}) => ({
	name,
	slug: slug.split('/').filter(Boolean).pop() || slug,
	full_slug: slug,
	uuid: `fallback-${slug.replace(/\//g, '-') || 'root'}`,
	content: { _uid: uid('page'), component: 'page', body, ...extra },
});

const cta = {
	_uid: uid('cta'),
	component: 'cta',
	title: 'Have an idea that needs a *gentle* touch?',
	text: 'I’d love to hear about it. Tell me what you’re building and let’s see how I can help.',
	button_label: 'Get in touch',
	button_link: link('/contact'),
};

export const home = story(
	'home',
	'Home',
	[
		{
			_uid: uid('hero'),
			component: 'hero',
			availability: 'Open to new projects',
			eyebrow: 'Frontend developer · The Netherlands',
			headline: 'Hi, I’m Manouk. I build *calm*, thoughtful websites.',
			intro:
				'I turn ideas into clear, accessible and quietly delightful interfaces — with clean CSS, React and Next.js, and a CMS that editors actually enjoy.',
			images: [
				img('portrait-1', 'Portrait of Manouk'),
				img('portrait-2', 'Manouk at work'),
				img('portrait-3', 'Manouk outdoors'),
			],
			badge_text: 'Frontend developer · Calm websites · ',
			primary_label: 'See my work',
			primary_link: link('/projects'),
			secondary_label: 'About me',
			secondary_link: link('/about'),
		},
		{
			_uid: uid('marquee'),
			component: 'marquee',
			items:
				'Next.js\nReact\nStoryblok\nTailwind CSS\nGSAP\nAccessible CSS\nExpressionEngine\nAI-assisted workflows',
		},
		{
			_uid: uid('pillars'),
			component: 'pillars',
			eyebrow: 'What I do',
			title: 'Small details, *big* calm.',
			items: [
				{
					_uid: uid('pillar'),
					component: 'pillar',
					icon: 'code',
					title: 'Frontend development',
					text: 'Semantic HTML, modern CSS and React components that are fast, accessible and a joy to maintain.',
				},
				{
					_uid: uid('pillar'),
					component: 'pillar',
					icon: 'layers',
					title: 'Headless CMS',
					text: 'Content models in Storyblok and ExpressionEngine that give editors freedom without breaking the design.',
				},
				{
					_uid: uid('pillar'),
					component: 'pillar',
					icon: 'sparkle',
					title: 'Motion & detail',
					text: 'Subtle animations with GSAP that guide attention instead of stealing it.',
				},
			],
		},
		{
			_uid: uid('featured'),
			component: 'featured_projects',
			eyebrow: 'Selected work',
			title: 'Projects I’m *proud* of',
			intro: '',
			count: '2',
			link_label: 'All projects',
		},
		cta,
	],
	{ seo_title: '', seo_description: '' },
);

export const about = story('about', 'About', [
	{
		_uid: uid('page-hero'),
		component: 'page_hero',
		eyebrow: 'About me',
		title: 'A frontend developer with a *soft spot* for calm design.',
		intro:
			'I’m Manouk — I build websites that feel light, load fast and are easy to look after. Below you’ll find my story, where I’ve worked, what I studied and the tools I reach for every day.',
	},
	{
		_uid: uid('text-image'),
		component: 'text_image',
		eyebrow: 'My story',
		title: 'From pixel-pushing to *purposeful* products',
		image: img('portrait-2', 'Portrait of Manouk'),
		caption: 'Somewhere between a cup of tea and a pull request.',
		reverse: false,
		body: doc(
			p(
				'This is placeholder text — replace it with your own story in Storyblok. Start with how you got into web development: the first site you built, the moment CSS finally “clicked”, or the person who showed you the ropes.',
			),
			p(
				'Today I work on websites for purpose-driven organisations, mostly on ExpressionEngine, with a strong focus on clean and accessible CSS. On the side I’m exploring ',
				italic('AI-assisted development'),
				', Next.js, React and Storyblok — this portfolio is one of those experiments.',
			),
			h(3, 'What I care about'),
			p(
				'Websites that respect people’s time and attention. Calm layouts, readable type, quick load times and motion that helps rather than distracts.',
			),
		),
	},
	{
		_uid: uid('facts'),
		component: 'facts',
		items: [
			{
				_uid: uid('fact'),
				component: 'fact',
				value: '100%',
				label: 'Hand-crafted, accessible CSS',
			},
			{
				_uid: uid('fact'),
				component: 'fact',
				value: '3',
				label: 'Favourite tools: Next.js, React & Storyblok',
			},
			{
				_uid: uid('fact'),
				component: 'fact',
				value: '1',
				label: 'Favourite font family — Poppins, of course',
			},
			{
				_uid: uid('fact'),
				component: 'fact',
				value: '0',
				label: 'Animations that shout for attention',
			},
		],
	},
	{
		_uid: uid('timeline'),
		component: 'timeline',
		eyebrow: 'Experience',
		title: 'Where I’ve *worked*',
		intro:
			'Replace the years and descriptions with your own experience in Storyblok.',
		items: [
			{
				_uid: uid('item'),
				component: 'timeline_item',
				period: '20XX — Now',
				title: 'Frontend Developer',
				place: '0to9 — Values-Driven Creativity',
				description:
					'Building and maintaining websites for purpose-driven clients, mostly on ExpressionEngine. I focus on clean, accessible CSS and the small details that make a site feel finished.',
			},
			{
				_uid: uid('item'),
				component: 'timeline_item',
				period: '20XX — 20XX',
				title: 'Your previous role',
				place: 'Company name',
				description:
					'Describe what you worked on, what you learned and what you are proud of.',
			},
			{
				_uid: uid('item'),
				component: 'timeline_item',
				period: '20XX',
				title: 'Internship',
				place: 'Company name',
				description:
					'A short line about your internship and the projects you contributed to.',
			},
		],
	},
	{
		_uid: uid('timeline'),
		component: 'timeline',
		eyebrow: 'Education',
		title: 'What I *studied*',
		intro: '',
		items: [
			{
				_uid: uid('item'),
				component: 'timeline_item',
				period: '20XX — 20XX',
				title: 'Your degree or programme',
				place: 'School or university',
				description:
					'What you studied, your graduation project, or a course that shaped the way you work.',
			},
			{
				_uid: uid('item'),
				component: 'timeline_item',
				period: 'Always',
				title: 'Self-taught & curious',
				place: 'Courses, conferences and side projects',
				description:
					'I keep learning by building — currently exploring AI-assisted development, Next.js and Storyblok.',
			},
		],
	},
	{
		_uid: uid('skills'),
		component: 'skills',
		eyebrow: 'Skills',
		title: 'My *toolbox*',
		intro:
			'The tools and techniques I use every day, and the ones I’m growing into.',
		groups: [
			{
				_uid: uid('group'),
				component: 'skill_group',
				title: 'Frontend',
				skills: 'HTML\nCSS & Sass\nTailwind CSS\nJavaScript\nReact\nNext.js',
			},
			{
				_uid: uid('group'),
				component: 'skill_group',
				title: 'CMS & content',
				skills: 'Storyblok\nExpressionEngine\nHeadless CMS\nContent modelling',
			},
			{
				_uid: uid('group'),
				component: 'skill_group',
				title: 'Motion & design',
				skills: 'GSAP\nFigma\nAtomic design\nDesign systems',
			},
			{
				_uid: uid('group'),
				component: 'skill_group',
				title: 'Ways of working',
				skills:
					'Accessibility (WCAG)\nPerformance\nGit & code review\nAI-assisted development',
			},
		],
	},
	{
		_uid: uid('featured'),
		component: 'featured_projects',
		eyebrow: 'Proud of',
		title: 'A few projects I *love*',
		intro:
			'Pick your favourites in Storyblok — or tick “featured” on a project.',
		count: '4',
		link_label: 'See all projects',
	},
	cta,
]);

export const projects = story('projects/', 'Projects', [
	{
		_uid: uid('page-hero'),
		component: 'page_hero',
		eyebrow: 'Projects',
		title: 'Work that *grew* with care.',
		intro:
			'A selection of websites, experiments and side projects. Filter by what you’re curious about.',
	},
	{ _uid: uid('grid'), component: 'project_grid', show_filter: true },
	cta,
]);

export const blog = story('blog/', 'Blog', [
	{
		_uid: uid('page-hero'),
		component: 'page_hero',
		eyebrow: 'Blog',
		title: 'Notes on *AI*, Next.js, React & Storyblok',
		intro:
			'A new article every month about what I’m learning, building and wondering about.',
	},
	{ _uid: uid('articles'), component: 'article_index', feature_first: true },
]);

export const contact = story('contact', 'Contact', [
	{
		_uid: uid('page-hero'),
		component: 'page_hero',
		eyebrow: 'Contact',
		title: 'Let’s make something *calm* together.',
		intro:
			'Have a project in mind, a question about Storyblok or just want to say hi? Leave a message — I read every single one.',
	},
	{
		_uid: uid('contact'),
		component: 'contact_section',
		availability: 'Open to new projects',
		email: '',
		response_time: 'Usually within two working days',
		location: 'The Netherlands',
		success_message: '',
	},
]);

export const pages = { home, about, projects, blog, contact };

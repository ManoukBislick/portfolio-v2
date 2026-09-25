/**
 * Starting content for Storyblok. `npm run storyblok:setup` turns this into stories,
 * uploads the placeholder images and converts the Markdown to rich text.
 * After the first run Storyblok is the place to edit; this file is only used again
 * when you run the setup with --force.
 */

/** A placeholder image from /public, uploaded to the asset library during setup. */
const image = (file, alt = '', title = '') => ({
	$asset: `public/images/placeholders/${file}`,
	alt,
	title,
});

/** A link to another story, resolved to that story during setup. */
const storyLink = (fullSlug) => ({ $story: fullSlug });

/**
 * Markdown that becomes a rich text field. The common indentation is removed,
 * so the text can be indented along with the code around it.
 */
const richText = (strings, ...values) => {
	const lines = String.raw({ raw: strings }, ...values)
		.replace(/^\n/, '')
		.split('\n');
	const indent = Math.min(
		...lines
			.filter((line) => line.trim())
			.map((line) => line.match(/^\t*/)[0].length),
	);
	return {
		$markdown: lines
			.map((line) => line.slice(indent))
			.join('\n')
			.trimEnd(),
	};
};

const skills = (...list) => list.join('\n');

// Pages -------------------------------------------------------------------

export const home = {
	component: 'page',
	body: [
		{
			component: 'hero',
			headline: 'Hi, I’m Manouk.',
			intro:
				'I’m a frontend developer in the Netherlands. At work I build websites with a lot of attention to CSS. In my own time I explore Next.js, React, Storyblok and AI, and I write about it here.',
			images: [
				image('portrait-1.svg', 'Portrait of Manouk'),
				image('portrait-2.svg', 'Manouk at work'),
			],
			buttons: [
				{
					component: 'button',
					label: 'View projects',
					link: storyLink('projects/'),
					style: 'primary',
				},
				{
					component: 'button',
					label: 'About me',
					link: storyLink('about'),
					style: 'link',
				},
			],
		},
		{
			component: 'featured_projects',
			title: 'Selected projects',
			count: '2',
			link_label: 'All projects',
		},
		{
			component: 'latest_articles',
			title: 'Recent writing',
			count: '3',
			link_label: 'All articles',
		},
	],
	seo_title: '',
	seo_description: '',
};

export const about = {
	component: 'page',
	body: [
		{
			component: 'page_hero',
			title: 'About me',
			intro:
				'I’m Manouk, a frontend developer from the Netherlands. Here you can read a bit about my background, where I’ve worked and what I work with.',
		},
		{
			component: 'text_image',
			title: 'My story',
			image: image('portrait-3.svg', 'Portrait of Manouk'),
			caption: '',
			reverse: false,
			body: richText`
				This is placeholder text. Replace it with your own story: how you got into web development, the first site you built, or the moment CSS finally made sense.

				These days I build and maintain websites for purpose-driven organisations, with a lot of attention to clean and accessible CSS. In my own time I’m exploring Next.js, React, Storyblok and AI. This portfolio is one of those experiments.

				### What I care about

				Websites that load fast, are easy to read and work for everyone, including people who use a keyboard or a screen reader.
			`,
		},
		{
			component: 'timeline',
			title: 'Experience',
			items: [
				{
					component: 'timeline_item',
					period: '20XX – now',
					title: 'Frontend developer',
					place: '0to9',
					description:
						'Building and maintaining websites for purpose-driven clients, with a focus on clean, accessible CSS.',
				},
				{
					component: 'timeline_item',
					period: '20XX – 20XX',
					title: 'Your previous role',
					place: 'Company name',
					description: 'What you worked on and what you learned.',
				},
				{
					component: 'timeline_item',
					period: '20XX',
					title: 'Internship',
					place: 'Company name',
					description: 'A short line about your internship.',
				},
			],
		},
		{
			component: 'timeline',
			title: 'Education',
			items: [
				{
					component: 'timeline_item',
					period: '20XX – 20XX',
					title: 'Your degree or programme',
					place: 'School or university',
					description: 'What you studied, or your graduation project.',
				},
			],
		},
		{
			component: 'skills',
			title: 'Skills',
			groups: [
				{
					component: 'skill_group',
					title: 'Frontend',
					skills: skills(
						'HTML',
						'CSS and Sass',
						'Tailwind CSS',
						'JavaScript',
						'React',
						'Next.js',
					),
				},
				{
					component: 'skill_group',
					title: 'CMS',
					skills: skills('Storyblok', 'Headless CMS', 'Content modelling'),
				},
				{
					component: 'skill_group',
					title: 'Design and motion',
					skills: skills('GSAP', 'Figma', 'Atomic design', 'Design systems'),
				},
				{
					component: 'skill_group',
					title: 'Ways of working',
					skills: skills(
						'Accessibility (WCAG)',
						'Performance',
						'Git and code review',
						'Working with AI tools',
					),
				},
			],
		},
		{
			component: 'featured_projects',
			title: 'Projects',
			count: '4',
			link_label: 'All projects',
		},
	],
	seo_title: 'About',
	seo_description: 'Background, work experience, education and skills.',
};

export const projectsPage = {
	component: 'page',
	body: [
		{
			component: 'page_hero',
			title: 'Projects',
			intro: 'Websites, experiments and side projects I’ve worked on.',
		},
		{ component: 'project_grid', show_filter: true },
	],
	seo_title: 'Projects',
	seo_description: 'Websites, experiments and side projects by Manouk Bislick.',
};

export const blogPage = {
	component: 'page',
	body: [
		{
			component: 'page_hero',
			title: 'Blog',
			intro:
				'Notes on AI, Next.js, React and Storyblok. A new post every month.',
		},
		{
			component: 'article_list',
			empty_text: 'No articles yet. The first one is on its way.',
		},
	],
	seo_title: 'Blog',
	seo_description:
		'Notes on AI, Next.js, React and Storyblok. A new post every month.',
};

// Projects ----------------------------------------------------------------

export const projects = [
	{
		slug: 'portfolio-v2',
		content: {
			component: 'project',
			title: 'This portfolio',
			summary:
				'My own site, built with Next.js, Tailwind CSS and GSAP. The pages, projects and blog posts come from Storyblok.',
			cover: image('project-1.svg', 'The homepage of this portfolio'),
			year: '2026',
			role: 'Design and development',
			client: 'Personal project',
			stack: 'Next.js, React, Storyblok, Tailwind CSS, GSAP, Vercel',
			tags: 'Next.js, Storyblok, CSS, Motion',
			featured: true,
			order: '1',
			body: richText`
				## Why I built it

				I wanted one place for my own projects and for writing about what I'm learning. Light colours, plenty of white space, Poppins for the text and a classic serif for the headings.

				## How it works

				- Next.js App Router with React Server Components, hosted on Vercel.
				- All content lives in Storyblok. A page is a stack of sections that I can add, remove and reorder in the Visual Editor.
				- Every Storyblok section has its own React component. The components follow atomic design (atoms, molecules, organisms and templates) and are styled with Tailwind CSS v4.
				- GSAP runs the animations: headings that appear line by line, images that slide open and a filter that moves the project cards into place.

				All animations are switched off for visitors who have _reduce motion_ turned on in their system settings.
			`,
			gallery: [],
			seo_description: '',
		},
	},
	{
		slug: 'sample-mission-driven-website',
		content: {
			component: 'project',
			title: 'Sample project: a website for a non-profit',
			summary: 'Placeholder. Replace this with a project you’re proud of.',
			cover: image('project-2.svg', 'Placeholder image'),
			year: '20XX',
			role: 'Frontend development',
			client: 'Client name',
			stack: 'HTML, Sass, JavaScript',
			tags: 'CSS, Accessibility, Sample',
			featured: true,
			order: '2',
			body: richText`
				## The question

				What did the client need, and what would count as a good result?

				## What I did

				Describe your approach: the structure, the tricky bits of CSS, the details you spent the most time on.

				## The result

				What came out of it? A quote from the client, a number, or simply what you learned.
			`,
			gallery: [],
			seo_description: '',
		},
	},
	{
		slug: 'sample-design-system',
		content: {
			component: 'project',
			title: 'Sample project: a small design system',
			summary:
				'Placeholder. For example a set of reusable components with design tokens for colour, type and spacing.',
			cover: image('project-3.svg', 'Placeholder image'),
			year: '20XX',
			role: 'Design and frontend',
			client: 'Side project',
			stack: 'Figma, CSS custom properties, React',
			tags: 'CSS, React, Sample',
			featured: false,
			order: '',
			body: richText`
				## The idea

				Why you started it and what problem it solves.

				## How it's built

				Tokens, components, documentation: what you made and the choices behind it.
			`,
			gallery: [],
			seo_description: '',
		},
	},
	{
		slug: 'sample-headless-cms-build',
		content: {
			component: 'project',
			title: 'Sample project: a headless CMS build',
			summary:
				'Placeholder. For example a small site with Next.js and Storyblok, built to learn how a headless CMS works.',
			cover: image('project-4.svg', 'Placeholder image'),
			year: '20XX',
			role: 'Development',
			client: 'Learning project',
			stack: 'Next.js, Storyblok, Tailwind CSS',
			tags: 'Next.js, Storyblok, Sample',
			featured: false,
			order: '',
			body: richText`
				## What I wanted to learn

				A sentence or two about the goal.

				## What I learned

				The surprises, the things you'd do differently next time.
			`,
			gallery: [],
			seo_description: '',
		},
	},
];

// Blog --------------------------------------------------------------------

export const articles = [
	{
		slug: 'building-a-calm-portfolio',
		publish: true,
		content: {
			component: 'article',
			title: 'How I built this portfolio',
			date: '2026-09-24 00:00',
			excerpt:
				'A look at the stack, the component structure and the animations behind this site, and how the content gets from Storyblok onto the page.',
			tags: 'Next.js, Storyblok, GSAP, CSS',
			cover: image('article-1.svg', 'Illustration of a small plant'),
			seo_description:
				'The stack and structure behind my portfolio: Next.js, Storyblok, Tailwind CSS v4, atomic design and GSAP animations.',
			body: richText`
				I wanted a portfolio that doesn't shout. Light colours, lots of space, and animations you only notice when you look for them. This post walks through how it's put together.

				## Starting with a mood

				I started with colours and type before I drew a single layout: a cream background, a few sage greens and a dark green for the text. For type I paired Poppins, my favourite for years, with Cormorant Garamond for the headings. The serif adds some warmth without extra decoration.

				For motion I had one rule: an animation has to help you read. Headings appear line by line and images slide open once. Nothing bounces.

				## The stack

				- Next.js with the App Router and React Server Components.
				- Storyblok for all the content: the pages, the projects and the blog posts.
				- Tailwind CSS v4 for the colours, type scale and utilities.
				- GSAP for the animations. SplitText, ScrollTrigger, DrawSVG and Flip are all part of the free package now.
				- Vercel for hosting.

				## Atomic design

				The components follow Brad Frost's _Atomic Design_. Atoms are the small pieces like \`Button\`, \`Heading\` and \`Tag\`. Molecules combine a few of them, like \`ProjectCard\` or \`ArticleCard\`. Organisms are whole sections such as \`Hero\`, \`Timeline\` or \`ProjectGrid\`, and templates are the layouts for a single project or article.

				None of these components know about Storyblok. They get their content as props, so I can reuse them anywhere.

				## From Storyblok to the page

				In Storyblok a page is a list of sections: a hero, a timeline, a list of projects. Each section type has a small React component that takes the Storyblok data and passes it on to the organism:

				\`\`\`jsx
				export default function TimelineBlok({ blok }) {
				  return (
				    <Timeline
				      attrs={storyblokEditable(blok)}
				      title={blok.title}
				      items={blok.items.map(toTimelineItem)}
				    />
				  );
				}
				\`\`\`

				\`storyblokEditable\` adds a few data attributes, and those make the section clickable in the Visual Editor. Changes show up in the preview while I type.

				The content model itself is code as well. One script creates all the components in Storyblok, so the fields in Storyblok and the props in React stay in step.

				## Motion and reduced motion

				Each animation lives in a small client component (\`Reveal\`, \`SplitReveal\`, \`ImageReveal\`) and runs inside \`gsap.matchMedia()\`:

				\`\`\`js
				const mm = gsap.matchMedia();
				mm.add('(prefers-reduced-motion: no-preference)', () => {
				  gsap.from(el, { autoAlpha: 0, y: 24, duration: 1, ease: 'power2.out' });
				});
				\`\`\`

				If someone prefers reduced motion, nothing moves and everything is visible straight away. To prevent a flash of content before GSAP starts, a small script in the \`<head>\` adds a class only when motion is allowed. It removes that class again if GSAP hasn't started after a few seconds, so the content can't get stuck invisible.

				## What's next

				I'll write a new post every month, mostly about AI in my workflow, Next.js, React and Storyblok.
			`,
		},
	},
];

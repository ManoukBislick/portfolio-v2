/**
 * The Storyblok content model for this site, as code.
 * `npm run storyblok:setup` pushes these components to your space.
 * Keep in sync with src/components/bloks/registry.js.
 */

// ---------------------------------------------------------------- field helpers
const f = (type, display_name, extra = {}) => ({
	type,
	display_name,
	...extra,
});
const text = (name, extra) => f('text', name, extra);
const textarea = (name, extra) => f('textarea', name, extra);
const richtext = (name, extra) => f('richtext', name, extra);
const markdown = (name, extra) =>
	f('markdown', name, { rich_markdown: true, ...extra });
const image = (name, extra) =>
	f('asset', name, { filetypes: ['images'], ...extra });
const images = (name, extra) =>
	f('multiasset', name, { filetypes: ['images'], ...extra });
const link = (name, extra) =>
	f('multilink', name, { email_link_type: true, show_anchor: false, ...extra });
const bool = (name, extra) => f('boolean', name, extra);
const date = (name, extra) =>
	f('datetime', name, { disable_time: true, ...extra });
const choice = (name, options, extra) =>
	f('option', name, {
		source: 'self',
		options: options.map(([value, label]) => ({ value, name: label })),
		...extra,
	});
const bloks = (name, whitelist, extra) =>
	f('bloks', name, {
		restrict_components: true,
		component_whitelist: whitelist,
		...extra,
	});

const ACCENT_HINT =
	'Wrap a word in *asterisks* to show it as an italic green accent.';

/** Give every field its position so the editor shows them in the order written here. */
const schema = (fields) =>
	Object.fromEntries(
		Object.entries(fields).map(([key, field], pos) => [key, { pos, ...field }]),
	);

export const SECTION_BLOKS = [
	'hero',
	'page_hero',
	'marquee',
	'pillars',
	'text_image',
	'facts',
	'timeline',
	'skills',
	'featured_projects',
	'project_grid',
	'article_index',
	'latest_articles',
	'rich_text',
	'cta',
	'contact_section',
];

export const GROUPS = {
	types: 'Content types',
	sections: 'Sections',
	items: 'Items',
};

export const components = [
	// ------------------------------------------------------------ content types
	{
		name: 'page',
		display_name: 'Page',
		is_root: true,
		is_nestable: false,
		group: 'types',
		schema: schema({
			body: bloks('Sections', SECTION_BLOKS),
			seo_title: text('SEO title', {
				description: 'Leave empty to use the default title.',
			}),
			seo_description: textarea('SEO description', { max_length: 160 }),
		}),
	},
	{
		name: 'project',
		display_name: 'Project',
		is_root: true,
		is_nestable: false,
		group: 'types',
		preview_field: 'title',
		schema: schema({
			title: text('Title', { required: true, description: ACCENT_HINT }),
			summary: textarea('Summary', {
				description: 'One or two sentences for the project card.',
			}),
			cover: image('Cover image'),
			year: text('Year'),
			role: text('My role'),
			client: text('Client'),
			stack: text('Stack', {
				description: 'Comma separated, e.g. Next.js, Storyblok, GSAP',
			}),
			tags: text('Tags', {
				description: 'Comma separated — used for the filter on /projects.',
			}),
			tint: choice(
				'Card colour',
				[
					['sage', 'Sage'],
					['cream', 'Cream'],
					['blush', 'Blush'],
				],
				{ default_value: 'sage' },
			),
			featured: bool('Featured', {
				description: 'Show in “featured projects” sections.',
			}),
			url: link('Live site'),
			body: richtext('Case study'),
			gallery: images('Gallery'),
			seo_description: textarea('SEO description', { max_length: 160 }),
		}),
	},
	{
		name: 'article',
		display_name: 'Article',
		is_root: true,
		is_nestable: false,
		group: 'types',
		preview_field: 'title',
		schema: schema({
			title: text('Title', { required: true }),
			excerpt: textarea('Excerpt', {
				description: 'Shown on the blog overview.',
			}),
			date: date('Publish date'),
			cover: image('Cover image'),
			tags: text('Tags', { description: 'Comma separated' }),
			body: markdown('Article (Markdown)'),
			seo_description: textarea('SEO description', { max_length: 160 }),
		}),
	},

	// ------------------------------------------------------------ sections
	{
		name: 'hero',
		display_name: 'Hero (home)',
		is_nestable: true,
		group: 'sections',
		preview_field: 'headline',
		schema: schema({
			availability: text('Availability badge', {
				description: 'e.g. “Open to new projects”. Leave empty to hide.',
			}),
			eyebrow: text('Eyebrow'),
			headline: text('Headline', { required: true, description: ACCENT_HINT }),
			intro: textarea('Intro'),
			images: images('Photos of you', {
				description: 'Up to three: arch, circle and small card.',
			}),
			badge_text: text('Rotating badge text'),
			primary_label: text('Primary button label'),
			primary_link: link('Primary button link'),
			secondary_label: text('Secondary button label'),
			secondary_link: link('Secondary button link'),
		}),
	},
	{
		name: 'page_hero',
		display_name: 'Page hero',
		is_nestable: true,
		group: 'sections',
		preview_field: 'title',
		schema: schema({
			eyebrow: text('Eyebrow'),
			title: text('Title', { required: true, description: ACCENT_HINT }),
			intro: textarea('Intro'),
		}),
	},
	{
		name: 'marquee',
		display_name: 'Marquee',
		is_nestable: true,
		group: 'sections',
		schema: schema({
			items: textarea('Words', { description: 'One per line.' }),
		}),
	},
	{
		name: 'pillars',
		display_name: 'Pillars (what I do)',
		is_nestable: true,
		group: 'sections',
		preview_field: 'title',
		schema: schema({
			eyebrow: text('Eyebrow'),
			title: text('Title', { description: ACCENT_HINT }),
			intro: textarea('Intro'),
			items: bloks('Pillars', ['pillar'], { maximum: 6 }),
		}),
	},
	{
		name: 'text_image',
		display_name: 'Text + image',
		is_nestable: true,
		group: 'sections',
		preview_field: 'title',
		schema: schema({
			eyebrow: text('Eyebrow'),
			title: text('Title', { description: ACCENT_HINT }),
			body: richtext('Text'),
			image: image('Image'),
			caption: text('Caption'),
			reverse: bool('Image on the right'),
		}),
	},
	{
		name: 'facts',
		display_name: 'Facts',
		is_nestable: true,
		group: 'sections',
		schema: schema({ items: bloks('Facts', ['fact'], { maximum: 4 }) }),
	},
	{
		name: 'timeline',
		display_name: 'Timeline',
		is_nestable: true,
		group: 'sections',
		preview_field: 'title',
		schema: schema({
			eyebrow: text('Eyebrow'),
			title: text('Title', { description: ACCENT_HINT }),
			intro: textarea('Intro'),
			items: bloks('Items', ['timeline_item']),
		}),
	},
	{
		name: 'skills',
		display_name: 'Skills',
		is_nestable: true,
		group: 'sections',
		preview_field: 'title',
		schema: schema({
			eyebrow: text('Eyebrow'),
			title: text('Title', { description: ACCENT_HINT }),
			intro: textarea('Intro'),
			groups: bloks('Skill groups', ['skill_group']),
		}),
	},
	{
		name: 'featured_projects',
		display_name: 'Featured projects',
		is_nestable: true,
		group: 'sections',
		preview_field: 'title',
		schema: schema({
			eyebrow: text('Eyebrow'),
			title: text('Title', { description: ACCENT_HINT }),
			intro: textarea('Intro'),
			projects: f('options', 'Hand-picked projects', {
				source: 'internal_stories',
				filter_content_type: ['project'],
				folder_slug: 'projects/',
				description:
					'Optional. When empty, projects marked “Featured” are shown.',
			}),
			count: f('number', 'Maximum number', { default_value: '4' }),
			link_label: text('Link label', { default_value: 'All projects' }),
		}),
	},
	{
		name: 'project_grid',
		display_name: 'Project overview',
		is_nestable: true,
		group: 'sections',
		schema: schema({
			show_filter: bool('Show tag filter', { default_value: true }),
		}),
	},
	{
		name: 'article_index',
		display_name: 'Blog overview',
		is_nestable: true,
		group: 'sections',
		schema: schema({
			feature_first: bool('Feature the newest article', {
				default_value: true,
			}),
		}),
	},
	{
		name: 'latest_articles',
		display_name: 'Latest articles',
		is_nestable: true,
		group: 'sections',
		preview_field: 'title',
		schema: schema({
			eyebrow: text('Eyebrow'),
			title: text('Title', { description: ACCENT_HINT }),
			count: f('number', 'Number of articles', { default_value: '3' }),
			link_label: text('Link label', { default_value: 'All articles' }),
		}),
	},
	{
		name: 'rich_text',
		display_name: 'Text',
		is_nestable: true,
		group: 'sections',
		preview_field: 'title',
		schema: schema({
			eyebrow: text('Eyebrow'),
			title: text('Title', { description: ACCENT_HINT }),
			body: richtext('Text'),
		}),
	},
	{
		name: 'cta',
		display_name: 'Call to action',
		is_nestable: true,
		group: 'sections',
		preview_field: 'title',
		schema: schema({
			title: text('Title', { required: true, description: ACCENT_HINT }),
			text: textarea('Text'),
			button_label: text('Button label'),
			button_link: link('Button link'),
		}),
	},
	{
		name: 'contact_section',
		display_name: 'Contact form',
		is_nestable: true,
		group: 'sections',
		schema: schema({
			availability: text('Availability badge'),
			email: text('Email address', {
				description: 'Leave empty to use NEXT_PUBLIC_CONTACT_EMAIL.',
			}),
			response_time: text('Response time'),
			location: text('Location'),
			success_message: textarea('Success message'),
		}),
	},

	// ------------------------------------------------------------ items
	{
		name: 'pillar',
		display_name: 'Pillar',
		is_nestable: true,
		group: 'items',
		preview_field: 'title',
		schema: schema({
			icon: choice('Icon', [
				['code', 'Code'],
				['layers', 'Layers'],
				['sparkle', 'Sparkle'],
				['leaf', 'Leaf'],
				['sprout', 'Sprout'],
				['heart', 'Heart'],
			]),
			title: text('Title'),
			text: textarea('Text'),
		}),
	},
	{
		name: 'fact',
		display_name: 'Fact',
		is_nestable: true,
		group: 'items',
		preview_field: 'label',
		schema: schema({
			value: text('Value', {
				description: 'Numbers count up, e.g. “40+” or “100%”.',
			}),
			label: text('Label'),
		}),
	},
	{
		name: 'timeline_item',
		display_name: 'Timeline item',
		is_nestable: true,
		group: 'items',
		preview_field: 'title',
		schema: schema({
			period: text('Period', { description: 'e.g. 2021 — Now' }),
			title: text('Title / role'),
			place: text('Company or school'),
			description: textarea('Description'),
		}),
	},
	{
		name: 'skill_group',
		display_name: 'Skill group',
		is_nestable: true,
		group: 'items',
		preview_field: 'title',
		schema: schema({
			title: text('Title'),
			skills: textarea('Skills', { description: 'One per line.' }),
		}),
	},
];

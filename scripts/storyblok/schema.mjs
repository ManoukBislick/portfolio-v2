/**
 * The Storyblok content model for this site, written as code.
 * `npm run storyblok:setup` creates or updates these components in your space.
 * Every component here has a React counterpart in src/components/bloks/registry.js.
 */

// Field helpers ------------------------------------------------------------

const field = (type, display_name, extra = {}) => ({
	type,
	display_name,
	...extra,
});
const text = (name, extra) => field('text', name, extra);
const textarea = (name, extra) => field('textarea', name, extra);
const richtext = (name, extra) => field('richtext', name, extra);
const number = (name, extra) => field('number', name, extra);
const bool = (name, extra) => field('boolean', name, extra);
const date = (name, extra) =>
	field('datetime', name, { disable_time: true, ...extra });
const image = (name, extra) =>
	field('asset', name, { filetypes: ['images'], ...extra });
const images = (name, extra) =>
	field('multiasset', name, { filetypes: ['images'], ...extra });
const link = (name, extra) =>
	field('multilink', name, {
		email_link_type: false,
		show_anchor: false,
		...extra,
	});
const choice = (name, options, extra) =>
	field('option', name, {
		source: 'self',
		exclude_empty_option: true,
		options: options.map(([value, label]) => ({ value, name: label })),
		...extra,
	});
const bloks = (name, whitelist, extra) =>
	field('bloks', name, {
		restrict_type: '',
		restrict_components: true,
		component_whitelist: whitelist,
		...extra,
	});
const tab = (name, keys) => ({ type: 'tab', display_name: name, keys });

/** Number the fields so the editor shows them in the order written here. */
const schema = (fields) =>
	Object.fromEntries(
		Object.entries(fields).map(([key, value], pos) => [key, { ...value, pos }]),
	);

const ACCENT = 'Put *asterisks* around a word to make it an italic accent.';
const LIST = 'Comma separated, for example: Next.js, React, Storyblok';

// Groups in the block library ---------------------------------------------

export const GROUPS = {
	types: 'Content types',
	sections: 'Sections',
	items: 'Items',
};

/** Sections you can add to a page, in the order they appear in the picker. */
export const SECTIONS = [
	'hero',
	'page_hero',
	'text_image',
	'rich_text',
	'timeline',
	'skills',
	'featured_projects',
	'latest_articles',
	'project_grid',
	'article_list',
];

// Components ---------------------------------------------------------------

export const components = [
	// Content types ---------------------------------------------------------
	{
		name: 'page',
		display_name: 'Page',
		is_root: true,
		is_nestable: false,
		group: 'types',
		icon: 'block-doc',
		schema: schema({
			body: bloks('Sections', SECTIONS),
			seo_title: text('SEO title', {
				description:
					'Title in the browser tab and in Google. Leave empty to use the page title.',
			}),
			seo_description: textarea('SEO description', {
				max_length: 160,
				description: 'One or two sentences for Google and social media.',
			}),
			'tab-seo': tab('SEO', ['seo_title', 'seo_description']),
		}),
	},
	{
		name: 'project',
		display_name: 'Project',
		is_root: true,
		is_nestable: false,
		group: 'types',
		icon: 'block-image',
		preview_field: 'title',
		schema: schema({
			title: text('Title', { required: true, description: ACCENT }),
			summary: textarea('Summary', {
				description: 'One or two sentences for the project card.',
			}),
			cover: image('Cover image'),
			year: text('Year'),
			role: text('My role'),
			client: text('Client'),
			stack: text('Built with', { description: LIST }),
			tags: text('Tags', {
				description: `${LIST}. Used for the filter on the Projects page.`,
			}),
			url: link('Live site'),
			featured: bool('Featured', {
				description: 'Show this project in the "Selected projects" sections.',
			}),
			order: number('Order', {
				description: 'Lower numbers come first. Leave empty to sort by year.',
			}),
			body: richtext('Case study'),
			gallery: images('Gallery', {
				description: 'The image title is shown as a caption.',
			}),
			seo_description: textarea('SEO description', { max_length: 160 }),
			'tab-seo': tab('SEO', ['seo_description']),
		}),
	},
	{
		name: 'article',
		display_name: 'Article',
		is_root: true,
		is_nestable: false,
		group: 'types',
		icon: 'block-text-c',
		preview_field: 'title',
		schema: schema({
			title: text('Title', { required: true, description: ACCENT }),
			date: date('Date', {
				description: 'Shown above the article and used for sorting.',
			}),
			excerpt: textarea('Excerpt', {
				description: 'One or two sentences for the blog overview.',
			}),
			tags: text('Tags', { description: LIST }),
			cover: image('Cover image'),
			body: richtext('Text'),
			seo_description: textarea('SEO description', { max_length: 160 }),
			'tab-seo': tab('SEO', ['seo_description']),
		}),
	},

	// Sections --------------------------------------------------------------
	{
		name: 'hero',
		display_name: 'Hero',
		is_root: false,
		is_nestable: true,
		group: 'sections',
		icon: 'block-star',
		preview_field: 'headline',
		schema: schema({
			headline: text('Headline', { required: true, description: ACCENT }),
			intro: textarea('Intro'),
			images: images('Photos', {
				description: 'Two photos: a large one and a small one.',
			}),
			buttons: bloks('Buttons', ['button'], { maximum: 2 }),
		}),
	},
	{
		name: 'page_hero',
		display_name: 'Page intro',
		is_root: false,
		is_nestable: true,
		group: 'sections',
		icon: 'block-text-img-l',
		preview_field: 'title',
		schema: schema({
			title: text('Title', { required: true, description: ACCENT }),
			intro: textarea('Intro'),
		}),
	},
	{
		name: 'text_image',
		display_name: 'Text and image',
		is_root: false,
		is_nestable: true,
		group: 'sections',
		icon: 'block-text-img-r-l',
		preview_field: 'title',
		schema: schema({
			title: text('Title', { description: ACCENT }),
			body: richtext('Text'),
			image: image('Photo'),
			caption: text('Caption'),
			reverse: bool('Photo on the right'),
		}),
	},
	{
		name: 'rich_text',
		display_name: 'Text',
		is_root: false,
		is_nestable: true,
		group: 'sections',
		icon: 'block-text-l',
		schema: schema({
			body: richtext('Text'),
		}),
	},
	{
		name: 'timeline',
		display_name: 'Timeline',
		is_root: false,
		is_nestable: true,
		group: 'sections',
		icon: 'block-list',
		preview_field: 'title',
		schema: schema({
			title: text('Title', {
				description: 'For example Experience or Education.',
			}),
			intro: textarea('Intro'),
			items: bloks('Items', ['timeline_item']),
		}),
	},
	{
		name: 'skills',
		display_name: 'Skills',
		is_root: false,
		is_nestable: true,
		group: 'sections',
		icon: 'block-table',
		preview_field: 'title',
		schema: schema({
			title: text('Title'),
			intro: textarea('Intro'),
			groups: bloks('Groups', ['skill_group']),
		}),
	},
	{
		name: 'featured_projects',
		display_name: 'Selected projects',
		is_root: false,
		is_nestable: true,
		group: 'sections',
		icon: 'block-image',
		preview_field: 'title',
		schema: schema({
			title: text('Title'),
			intro: textarea('Intro'),
			projects: field('options', 'Projects', {
				source: 'internal_stories',
				folder_slug: 'projects/',
				filter_content_type: ['project'],
				description:
					'Pick projects by hand, or leave empty to show the ones marked as Featured.',
			}),
			count: number('How many', {
				default_value: '2',
				description: 'Only used when no projects are picked above.',
			}),
			link_label: text('Link text', {
				default_value: 'All projects',
				description:
					'Links to the Projects page. Leave empty to hide the link.',
			}),
		}),
	},
	{
		name: 'latest_articles',
		display_name: 'Recent articles',
		is_root: false,
		is_nestable: true,
		group: 'sections',
		icon: 'block-text-c',
		preview_field: 'title',
		schema: schema({
			title: text('Title'),
			count: number('How many', { default_value: '3' }),
			link_label: text('Link text', {
				default_value: 'All articles',
				description: 'Links to the Blog page. Leave empty to hide the link.',
			}),
		}),
	},
	{
		name: 'project_grid',
		display_name: 'All projects',
		is_root: false,
		is_nestable: true,
		group: 'sections',
		icon: 'block-image',
		schema: schema({
			show_filter: bool('Show tag filter', { default_value: true }),
		}),
	},
	{
		name: 'article_list',
		display_name: 'All articles',
		is_root: false,
		is_nestable: true,
		group: 'sections',
		icon: 'block-text-c',
		schema: schema({
			empty_text: text('Text when there are no articles', {
				default_value: 'No articles yet. The first one is on its way.',
			}),
		}),
	},

	// Items -----------------------------------------------------------------
	{
		name: 'button',
		display_name: 'Button',
		is_root: false,
		is_nestable: true,
		group: 'items',
		icon: 'block-arrow-pointer',
		preview_field: 'label',
		schema: schema({
			label: text('Text', { required: true }),
			link: link('Link', { required: true }),
			style: choice(
				'Style',
				[
					['primary', 'Button'],
					['secondary', 'Outlined button'],
					['link', 'Text link with arrow'],
				],
				{ default_value: 'primary' },
			),
		}),
	},
	{
		name: 'timeline_item',
		display_name: 'Timeline item',
		is_root: false,
		is_nestable: true,
		group: 'items',
		icon: 'block-list',
		preview_field: 'title',
		schema: schema({
			period: text('Period', { description: 'For example 2021 – now' }),
			title: text('Title', {
				required: true,
				description: 'Job title or programme',
			}),
			place: text('Place', { description: 'Company or school' }),
			description: textarea('Description'),
		}),
	},
	{
		name: 'skill_group',
		display_name: 'Skill group',
		is_root: false,
		is_nestable: true,
		group: 'items',
		icon: 'block-table',
		preview_field: 'title',
		schema: schema({
			title: text('Title', { required: true }),
			skills: textarea('Skills', { description: 'One skill per line.' }),
		}),
	},
];

/** Components that came with the Storyblok blueprint and are no longer used. */
export const BLUEPRINT_COMPONENTS = ['teaser', 'grid', 'feature'];

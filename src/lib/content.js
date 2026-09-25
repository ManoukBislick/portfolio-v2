import { cache } from 'react';
import { draftMode } from 'next/headers';
import { getStoryblokApi, isStoryblokConfigured } from './storyblok';
import {
	formatDate,
	readingTime,
	resolveLink,
	richTextToPlain,
	toImage,
	toList,
} from './utils';

/**
 * Everything on the site comes from Storyblok:
 *   home, about, …        pages (content type `page`)
 *   projects/             the Projects page, and projects/<slug> for each project
 *   blog/                 the Blog page, and blog/<slug> for each article
 * Published content is cached for an hour, or until Storyblok calls /api/revalidate.
 */
export const REVALIDATE_SECONDS = 3600;

/** Drafts while developing and in the Visual Editor, published content otherwise. */
export async function getVersion() {
	if (process.env.NODE_ENV === 'development') return 'draft';
	try {
		return (await draftMode()).isEnabled ? 'draft' : 'published';
	} catch {
		// Outside a request, for example in generateStaticParams.
		return 'published';
	}
}

const fetchOptions = (version) =>
	version === 'draft'
		? { cache: 'no-store' }
		: { next: { revalidate: REVALIDATE_SECONDS, tags: ['storyblok'] } };

/** One story by its full slug, or null when it doesn't exist. */
export const getStory = cache(async (slug) => {
	if (!isStoryblokConfigured) return null;
	const version = await getVersion();
	try {
		const { data } = await getStoryblokApi().get(
			`cdn/stories/${slug}`,
			{ version },
			fetchOptions(version),
		);
		return data.story ?? null;
	} catch (error) {
		if (error?.status === 404) return null;
		throw new Error(
			`Could not load "${slug}" from Storyblok: ${error?.message || error?.response || error}`,
		);
	}
});

// cache() compares arguments by identity, so the params are passed as a string.
const getStoriesCached = cache(async (key) => {
	if (!isStoryblokConfigured) return [];
	const version = await getVersion();
	try {
		const { data } = await getStoryblokApi().get(
			'cdn/stories',
			{ version, per_page: 100, ...JSON.parse(key) },
			fetchOptions(version),
		);
		return data.stories ?? [];
	} catch (error) {
		throw new Error(
			`Could not load stories from Storyblok: ${error?.message || error?.response || error}`,
		);
	}
});

export const getStories = (params = {}) =>
	getStoriesCached(JSON.stringify(params));

/** Pages at the top level (like about), for the sitemap and static params. */
export async function getPageStories() {
	const stories = await getStories({ content_type: 'page', level: 1 });
	return stories.filter((story) => story.slug !== 'home');
}

/* ---------------------------------------------------------------
 * Projects
 * ------------------------------------------------------------- */

/** A project story as the props the project components expect. */
export function toProject(story) {
	const c = story.content ?? {};
	const title = c.title || story.name;
	const order = Number.parseFloat(c.order);
	return {
		id: story.uuid,
		slug: story.slug,
		href: `/projects/${story.slug}`,
		title,
		summary: c.summary || '',
		cover: toImage(c.cover, title),
		year: c.year ? String(c.year) : '',
		role: c.role || '',
		client: c.client || '',
		stack: toList(c.stack),
		tags: toList(c.tags),
		url: resolveLink(c.url) || null,
		featured: Boolean(c.featured),
		order: Number.isFinite(order) ? order : 999,
		gallery: (c.gallery ?? []).map((image) => toImage(image)).filter(Boolean),
		seoDescription: c.seo_description || c.summary || '',
		draft: !story.published_at,
	};
}

/** All project stories, by `order` first and then the newest year. */
export async function getProjectStories() {
	const stories = await getStories({
		starts_with: 'projects/',
		content_type: 'project',
	});
	return stories
		.map((story) => ({ story, project: toProject(story) }))
		.sort(
			(a, b) =>
				a.project.order - b.project.order ||
				b.project.year.localeCompare(a.project.year),
		)
		.map(({ story }) => story);
}

export async function getProjects() {
	return (await getProjectStories()).map(toProject);
}

/**
 * Projects for a "Selected projects" section: the ones picked in Storyblok,
 * otherwise the ones marked as featured, otherwise simply the first ones.
 */
export async function getFeaturedProjects({ uuids = [], limit = 4 } = {}) {
	const projects = await getProjects();
	if (uuids.length) {
		return uuids
			.map((uuid) => projects.find((project) => project.id === uuid))
			.filter(Boolean);
	}
	const featured = projects.filter((project) => project.featured);
	return (featured.length ? featured : projects).slice(0, limit);
}

/** The project after this one (wrapping around), for the "Next project" link. */
export async function getNextProject(slug) {
	const projects = await getProjects();
	if (projects.length < 2) return null;
	const index = projects.findIndex((project) => project.slug === slug);
	return projects[(index + 1) % projects.length];
}

/* ---------------------------------------------------------------
 * Blog articles
 * ------------------------------------------------------------- */

const articleDate = (story) =>
	story.content?.date || story.first_published_at || story.created_at || '';

/** An article story as the props the blog components expect. */
export function toArticle(story) {
	const c = story.content ?? {};
	const dateISO = String(articleDate(story)).slice(0, 10);
	return {
		id: story.uuid,
		slug: story.slug,
		href: `/blog/${story.slug}`,
		title: c.title || story.name,
		excerpt: c.excerpt || '',
		cover: toImage(c.cover),
		dateISO,
		date: formatDate(dateISO),
		readingTime: readingTime(richTextToPlain(c.body)),
		tags: toList(c.tags),
		seoDescription: c.seo_description || c.excerpt || '',
		draft: !story.published_at,
	};
}

/** All article stories, newest first. */
export async function getArticleStories() {
	const stories = await getStories({
		starts_with: 'blog/',
		content_type: 'article',
	});
	return [...stories].sort((a, b) =>
		String(articleDate(b)).localeCompare(String(articleDate(a))),
	);
}

export async function getArticles() {
	return (await getArticleStories()).map(toArticle);
}

/** The newer and older neighbours of an article, for the links at the bottom. */
export async function getAdjacentArticles(slug) {
	const articles = await getArticles();
	const index = articles.findIndex((article) => article.slug === slug);
	return {
		newer: index > 0 ? articles[index - 1] : null,
		older:
			index >= 0 && index < articles.length - 1 ? articles[index + 1] : null,
	};
}

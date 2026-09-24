import { cache } from 'react';
import { draftMode } from 'next/headers';
import { storyblokEditable } from '@storyblok/react/rsc';
import { getStoryblokApi, isStoryblokConfigured } from './storyblok';
import { getLocalArticles } from './local-articles';
import { formatDate, readingTime, resolveLink, toList } from './utils';
import { pages as fallbackPages } from '@/data/fallback/pages';
import { projects as fallbackProjects } from '@/data/fallback/projects';

export const REVALIDATE_SECONDS = 3600;

/* ---------------------------------------------------------------
 * Low-level fetching
 * ------------------------------------------------------------- */

/** Draft content in development and inside Draft Mode (Visual Editor), published otherwise. */
export async function getVersion() {
	if (process.env.NODE_ENV === 'development') return 'draft';
	try {
		const { isEnabled } = await draftMode();
		return isEnabled ? 'draft' : 'published';
	} catch {
		// Called outside a request (e.g. generateStaticParams).
		return 'published';
	}
}

function fetchOptions(version) {
	return version === 'draft'
		? { cache: 'no-store' }
		: { next: { revalidate: REVALIDATE_SECONDS, tags: ['storyblok'] } };
}

const fetchStory = cache(async (slug) => {
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
		if (error?.status !== 404)
			console.error(
				`[storyblok] Could not load "${slug}":`,
				error?.message || error,
			);
		return null;
	}
});

// Params are passed as a JSON string so React's cache() can dedupe identical requests.
const fetchStoriesCached = cache(async (paramsKey) => {
	if (!isStoryblokConfigured) return null;
	const params = JSON.parse(paramsKey);
	const version = await getVersion();
	try {
		const { data } = await getStoryblokApi().get(
			'cdn/stories',
			{ version, per_page: 100, ...params },
			fetchOptions(version),
		);
		return data.stories ?? [];
	} catch (error) {
		console.error(
			'[storyblok] Could not load stories:',
			error?.message || error,
		);
		return [];
	}
});

const fetchStories = (params) => fetchStoriesCached(JSON.stringify(params));

/* ---------------------------------------------------------------
 * Pages (home, about, projects, blog, contact)
 * ------------------------------------------------------------- */

const PAGE_SLUGS = {
	home: 'home',
	about: 'about',
	projects: 'projects/',
	blog: 'blog/',
	contact: 'contact',
};

/** A page story from Storyblok, or the built-in placeholder when it doesn't exist yet. */
export async function getPage(key) {
	const story = await fetchStory(PAGE_SLUGS[key] ?? key);
	return story ?? fallbackPages[key] ?? null;
}

/* ---------------------------------------------------------------
 * Projects
 * ------------------------------------------------------------- */

/** Map a project story to the props the UI components expect. */
export function toProjectCard(story) {
	const c = story.content ?? {};
	return {
		id: story.uuid,
		slug: story.slug,
		href: `/projects/${story.slug}`,
		title: c.title || story.name,
		summary: c.summary || '',
		cover: c.cover?.filename
			? {
					filename: c.cover.filename,
					alt: c.cover.alt || '',
					focus: c.cover.focus || '',
				}
			: null,
		year: c.year || '',
		tags: toList(c.tags),
		tint: c.tint || 'sage',
		featured: Boolean(c.featured),
		attrs: storyblokEditable(c),
	};
}

export function toProjectDetail(story) {
	const c = story.content ?? {};
	return {
		...toProjectCard(story),
		role: c.role || '',
		client: c.client || '',
		stack: toList(c.stack),
		url: resolveLink(c.url),
		gallery: (c.gallery ?? []).filter((image) => image?.filename),
		body: c.body,
		seoDescription: c.seo_description || c.summary || '',
	};
}

const sortProjects = (list) =>
	[...list].sort(
		(a, b) =>
			String(b.content?.year ?? '').localeCompare(
				String(a.content?.year ?? ''),
			) || 0,
	);

/** All project stories, newest first. */
export async function getProjectStories() {
	const stories = await fetchStories({
		starts_with: 'projects/',
		content_type: 'project',
	});
	return stories === null ? fallbackProjects : sortProjects(stories);
}

export async function getProjectStory(slug) {
	if (!isStoryblokConfigured)
		return fallbackProjects.find((item) => item.slug === slug) ?? null;
	return fetchStory(`projects/${slug}`);
}

/**
 * Projects for a "featured" section: hand-picked (by uuid) first,
 * otherwise the ones marked as featured, otherwise the newest.
 */
export async function getFeaturedProjects({ uuids = [], limit = 4 } = {}) {
	const all = await getProjectStories();
	let picked = [];
	if (uuids.length) {
		picked = uuids
			.map((uuid) => all.find((story) => story.uuid === uuid))
			.filter(Boolean);
	}
	if (!picked.length) picked = all.filter((story) => story.content?.featured);
	if (!picked.length) picked = all;
	return picked.slice(0, limit);
}

/* ---------------------------------------------------------------
 * Articles
 * ------------------------------------------------------------- */

const articleDate = (story) =>
	story.content?.date ||
	story.first_published_at ||
	story.published_at ||
	story.created_at ||
	'';

export function toArticleCard(story) {
	const c = story.content ?? {};
	return {
		id: story.uuid,
		slug: story.slug,
		href: `/blog/${story.slug}`,
		title: c.title || story.name,
		excerpt: c.excerpt || '',
		cover: c.cover?.filename
			? {
					filename: c.cover.filename,
					alt: c.cover.alt || '',
					focus: c.cover.focus || '',
				}
			: null,
		dateISO: articleDate(story),
		date: formatDate(articleDate(story)),
		readingTime: readingTime(c.body),
		tags: toList(c.tags),
		attrs: storyblokEditable(c),
	};
}

export function toArticleDetail(story) {
	const c = story.content ?? {};
	return {
		...toArticleCard(story),
		body: c.body || '',
		seoDescription: c.seo_description || c.excerpt || '',
	};
}

const sortArticles = (list) =>
	[...list].sort((a, b) =>
		String(articleDate(b)).localeCompare(String(articleDate(a))),
	);

/** All articles, newest first. Local Markdown drafts are used when Storyblok isn't configured. */
export async function getArticleStories() {
	const stories = await fetchStories({
		starts_with: 'blog/',
		content_type: 'article',
	});
	return stories === null ? getLocalArticles() : sortArticles(stories);
}

export async function getArticleStory(slug) {
	if (!isStoryblokConfigured)
		return (
			(await getLocalArticles()).find((item) => item.slug === slug) ?? null
		);
	return fetchStory(`blog/${slug}`);
}

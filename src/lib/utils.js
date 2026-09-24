/** Join class names, skipping falsy values. */
export function cn(...classes) {
	return classes.flat().filter(Boolean).join(' ');
}

/** Split a comma- or newline-separated Storyblok text field into a clean list. */
export function toList(value) {
	if (!value) return [];
	if (Array.isArray(value)) return value.filter(Boolean);
	return String(value)
		.split(/[\n,]/)
		.map((item) => item.trim())
		.filter(Boolean);
}

/** Format a Storyblok date string (`2026-10-05 09:00`) for display. */
export function formatDate(value, options = {}) {
	if (!value) return '';
	const date = new Date(String(value).replace(' ', 'T'));
	if (Number.isNaN(date.getTime())) return '';
	return new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		...options,
	}).format(date);
}

/** Rough reading time for markdown / plain text. */
export function readingTime(text = '') {
	const words = String(text).trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 220));
}

/**
 * Resolve a Storyblok multilink field (or a plain string) to an href.
 * Returns null when the link is empty.
 */
export function resolveLink(link) {
	if (!link) return null;
	if (typeof link === 'string') return link;
	if (link.linktype === 'email' && link.email) return `mailto:${link.email}`;
	if (link.linktype === 'story') {
		const slug = link.story?.full_slug ?? link.cached_url ?? '';
		if (!slug) return null;
		const clean = slug.replace(/\/$/, '');
		return clean === 'home' ? '/' : `/${clean}`;
	}
	const url = link.url || link.cached_url;
	return url || null;
}

/** Map a Storyblok full_slug to the route it lives on. */
export function slugToPath(fullSlug = '') {
	const clean = String(fullSlug).replace(/^\/|\/$/g, '');
	if (!clean || clean === 'home') return '/';
	return `/${clean}`;
}

/** Is this an external URL? */
export function isExternal(href = '') {
	return /^(https?:)?\/\//.test(href) || href.startsWith('mailto:');
}

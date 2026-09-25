/** Join class names, skipping falsy values. */
export function cn(...classes) {
	return classes.flat().filter(Boolean).join(' ');
}

/** Turn an array or a comma/newline separated string into a clean list. */
export function toList(value) {
	if (!value) return [];
	if (Array.isArray(value))
		return value.map((item) => String(item).trim()).filter(Boolean);
	return String(value)
		.split(/[\n,]/)
		.map((item) => item.trim())
		.filter(Boolean);
}

/** Format a date string (`2026-10-05`) for display. */
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

/** Is this an external URL? */
export function isExternal(href = '') {
	return /^(https?:)?\/\//.test(href) || href.startsWith('mailto:');
}

/** Turn a Storyblok link field into an href. Story links point to their page on this site. */
export function resolveLink(link) {
	if (!link) return '';
	if (typeof link === 'string') return link;
	if (link.linktype === 'email')
		return link.email ? `mailto:${link.email}` : '';
	if (link.linktype === 'story') {
		const slug = link.story?.full_slug ?? link.cached_url ?? '';
		const path = slug.replace(/\/$/, '');
		return !path || path === 'home' ? '/' : `/${path}`;
	}
	return link.url || link.cached_url || '';
}

/** All text in a Storyblok rich text document, for the reading time. */
export function richTextToPlain(node) {
	if (!node) return '';
	if (typeof node === 'string') return node;
	if (node.type === 'code_block') return '';
	if (node.text) return node.text;
	return (node.content ?? []).map(richTextToPlain).join(' ');
}

/** Does a rich text field contain anything? */
export function hasRichText(doc) {
	return (
		Boolean(richTextToPlain(doc).trim()) ||
		JSON.stringify(doc ?? {}).includes('"type":"image"')
	);
}

/** Storyblok stores the original size in the file name: /f/123/1600x1200/abc/photo.jpg */
export function imageSize(src = '') {
	const match = String(src).match(/\/(\d+)x(\d+)\//);
	return match ? { width: Number(match[1]), height: Number(match[2]) } : null;
}

/** Storyblok's focal point ("x1xy1:x2xy2") as a CSS object-position. */
function focusToPosition(focus, size) {
	if (!focus || !size) return undefined;
	const [start, end] = focus.split(':');
	if (!start || !end) return undefined;
	const [x1, y1] = start.split('x').map(Number);
	const [x2, y2] = end.split('x').map(Number);
	const x = (((x1 + x2) / 2 / size.width) * 100).toFixed(1);
	const y = (((y1 + y2) / 2 / size.height) * 100).toFixed(1);
	return `${x}% ${y}%`;
}

/** A Storyblok asset as { src, alt, position, caption } for the Picture atom. */
export function toImage(asset, fallbackAlt = '') {
	if (!asset?.filename) return null;
	return {
		src: asset.filename,
		alt: asset.alt || fallbackAlt,
		position: focusToPosition(asset.focus, imageSize(asset.filename)),
		caption: asset.title || '',
	};
}

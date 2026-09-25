// Test only: serves the seed content like the Storyblok CDN API would.
import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { markdownToStoryblokRichtext } from '@storyblok/richtext/markdown-parser';
import * as seed from './storyblok/seed.mjs';

const stories = [];
let id = 1000;
const known = new Map();
function add(full_slug, slug, name, content, extra = {}) {
	const story = { id: ++id, uuid: randomUUID(), name, slug, full_slug, content, published_at: extra.publish === false ? null : '2026-09-25T10:00:00.000Z', first_published_at: '2026-09-25T10:00:00.000Z', created_at: '2026-09-25T09:00:00.000Z', is_startpage: Boolean(extra.startpage) };
	stories.push(story); known.set(full_slug, story); return story;
}
function prep(v) {
	if (Array.isArray(v)) return v.map(prep);
	if (!v || typeof v !== 'object') return v;
	if ('$asset' in v) return { filename: v.$asset.replace(/^public/, ''), alt: v.alt, title: v.title || '', focus: '', fieldtype: 'asset' };
	if ('$story' in v) return { linktype: 'story', cached_url: v.$story, id: known.get(v.$story)?.uuid || '', fieldtype: 'multilink' };
	if ('$markdown' in v) return markdownToStoryblokRichtext(v.$markdown);
	const o = {}; for (const [k, c] of Object.entries(v)) o[k] = prep(c);
	if (o.component) o._uid = randomUUID();
	return o;
}
add('projects/', 'projects', 'Projects', prep(seed.projectsPage), { startpage: true });
for (const p of seed.projects) add(`projects/${p.slug}`, p.slug, p.content.title, prep(p.content));
add('blog/', 'blog', 'Blog', prep(seed.blogPage), { startpage: true });
for (const a of seed.articles) add(`blog/${a.slug}`, a.slug, a.content.title, prep(a.content), { publish: a.publish });
add('blog/an-unpublished-draft', 'an-unpublished-draft', 'Draft', prep({ component: 'article', title: 'An unpublished draft', date: '2026-10-01 00:00', excerpt: 'Only in draft.', body: { $markdown: 'Hello **draft**.' } }), { publish: false });
add('about', 'about', 'About', prep(seed.about));
add('home', 'home', 'Home', prep(seed.home));

const level = (s) => s.full_slug.replace(/\/$/, '').split('/').length + (s.is_startpage ? 0 : 0);
http.createServer((req, res) => {
	const url = new URL(req.url, 'http://x');
	const send = (code, body) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(body)); };
	const draft = url.searchParams.get('version') === 'draft';
	const visible = stories.filter((s) => draft || s.published_at);
	console.log(req.method, url.pathname, url.searchParams.get('version'), url.searchParams.get('starts_with') || '', url.searchParams.get('content_type') || '');
	if (url.pathname === '/v2/cdn/stories') {
		let list = visible;
		const sw = url.searchParams.get('starts_with'); if (sw) list = list.filter((s) => s.full_slug.startsWith(sw));
		const ct = url.searchParams.get('content_type'); if (ct) list = list.filter((s) => s.content.component === ct);
		const lv = url.searchParams.get('level'); if (lv) list = list.filter((s) => level(s) === Number(lv) && !s.full_slug.includes('/'));
		return send(200, { stories: list, cv: 1, rels: [], links: [] });
	}
	if (url.pathname.startsWith('/v2/cdn/stories/')) {
		const slug = decodeURIComponent(url.pathname.slice('/v2/cdn/stories/'.length));
		const story = visible.find((s) => s.full_slug === slug);
		return story ? send(200, { story, cv: 1, rels: [], links: [] }) : send(404, { error: 'not found' });
	}
	send(404, {});
}).listen(4010, () => console.log('mock on 4010'));

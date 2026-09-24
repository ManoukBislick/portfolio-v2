import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { toList } from './utils.js';

export const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/** Filenames look like `2026-10-my-article.md`. README/IDEAS files are skipped. */
const isArticleFile = (file) => /^\d{4}-\d{2}-.+\.md$/.test(file);

/**
 * Reads the Markdown drafts in content/blog and returns them as story-shaped
 * objects. Used as fallback when Storyblok is not configured (local preview),
 * and by scripts/blog/push-draft.mjs to create Storyblok drafts.
 */
export async function getLocalArticles() {
	let files = [];
	try {
		files = (await readdir(BLOG_DIR)).filter(isArticleFile);
	} catch {
		return [];
	}

	const articles = await Promise.all(
		files.map(async (file) => {
			const raw = await readFile(path.join(BLOG_DIR, file), 'utf8');
			const { data, content } = matter(raw);
			const slug =
				data.slug || file.replace(/^\d{4}-\d{2}-/, '').replace(/\.md$/, '');
			const date =
				data.date instanceof Date
					? data.date.toISOString().slice(0, 10)
					: String(data.date || file.slice(0, 7));
			return {
				name: data.title || slug,
				slug,
				full_slug: `blog/${slug}`,
				uuid: `local-article-${slug}`,
				first_published_at: date,
				content: {
					_uid: `article-${slug}`,
					component: 'article',
					title: data.title || slug,
					excerpt: data.excerpt || '',
					date,
					tags: toList(data.tags).join(', '),
					cover: data.cover
						? { filename: data.cover, alt: data.cover_alt || '' }
						: null,
					seo_description: data.seo_description || data.excerpt || '',
					body: content.trim(),
				},
			};
		}),
	);

	return articles.sort((a, b) =>
		String(b.content.date).localeCompare(String(a.content.date)),
	);
}

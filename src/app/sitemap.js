import { site } from '@/lib/site';
import { getArticleStories, getProjectStories } from '@/lib/content';

export const revalidate = 3600;

export default async function sitemap() {
	const [projects, articles] = await Promise.all([
		getProjectStories(),
		getArticleStories(),
	]);
	const now = new Date();
	const url = (path) => new URL(path, site.url).toString();

	return [
		...['/', '/about', '/projects', '/blog', '/contact'].map((path) => ({
			url: url(path),
			lastModified: now,
			changeFrequency: path === '/blog' ? 'weekly' : 'monthly',
			priority: path === '/' ? 1 : 0.8,
		})),
		...projects.map((story) => ({
			url: url(`/projects/${story.slug}`),
			lastModified: story.published_at ? new Date(story.published_at) : now,
			changeFrequency: 'yearly',
			priority: 0.6,
		})),
		...articles.map((story) => ({
			url: url(`/blog/${story.slug}`),
			lastModified: story.published_at ? new Date(story.published_at) : now,
			changeFrequency: 'yearly',
			priority: 0.6,
		})),
	];
}

import { site } from '@/lib/site';
import { getArticles, getPageStories, getProjects } from '@/lib/content';

export const revalidate = 3600;

export default async function sitemap() {
	const [pages, projects, articles] = await Promise.all([
		getPageStories(),
		getProjects(),
		getArticles(),
	]);
	const now = new Date();
	const url = (path) => new URL(path, site.url).toString();

	return [
		...['/', ...pages.map((page) => `/${page.slug}`), '/projects', '/blog'].map(
			(path) => ({
				url: url(path),
				lastModified: now,
				changeFrequency: path === '/blog' ? 'weekly' : 'monthly',
				priority: path === '/' ? 1 : 0.8,
			}),
		),
		...projects.map((project) => ({
			url: url(project.href),
			lastModified: now,
			changeFrequency: 'yearly',
			priority: 0.6,
		})),
		...articles.map((article) => ({
			url: url(article.href),
			lastModified: article.dateISO ? new Date(article.dateISO) : now,
			changeFrequency: 'yearly',
			priority: 0.6,
		})),
	];
}

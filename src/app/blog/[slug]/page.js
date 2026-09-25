import { notFound } from 'next/navigation';
import { getArticleStories, getStory, toArticle } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import StoryRenderer from '@/components/bloks/StoryRenderer';

export const revalidate = 3600;

export async function generateStaticParams() {
	return (await getArticleStories()).map((story) => ({ slug: story.slug }));
}

async function load(slug) {
	const story = await getStory(`blog/${slug}`);
	return story?.content?.component === 'article' ? story : null;
}

export async function generateMetadata({ params }) {
	const story = await load((await params).slug);
	if (!story) return {};
	const article = toArticle(story);
	return pageMetadata({
		title: article.title.replace(/\*/g, ''),
		description: article.seoDescription,
		path: article.href,
		image: article.cover,
		type: 'article',
		publishedTime: article.dateISO || undefined,
	});
}

export default async function ArticlePage({ params }) {
	const story = await load((await params).slug);
	if (!story) notFound();
	return <StoryRenderer story={story} />;
}

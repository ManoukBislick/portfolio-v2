import { notFound } from 'next/navigation';
import StoryRenderer from '@/components/bloks/StoryRenderer';
import {
	getArticleStories,
	getArticleStory,
	toArticleDetail,
} from '@/lib/content';
import { storyMetadata } from '@/lib/metadata';

export const revalidate = 3600;

export async function generateStaticParams() {
	const stories = await getArticleStories();
	return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const story = await getArticleStory(slug);
	if (!story) return {};
	const article = toArticleDetail(story);
	const meta = storyMetadata(story, {
		title: article.title,
		description: article.seoDescription,
		path: article.href,
		image: article.cover,
	});
	return {
		...meta,
		openGraph: {
			...meta.openGraph,
			type: 'article',
			publishedTime: article.dateISO || undefined,
		},
	};
}

export default async function ArticlePage({ params }) {
	const { slug } = await params;
	const story = await getArticleStory(slug);
	if (!story) notFound();
	return <StoryRenderer story={story} />;
}

import { notFound } from 'next/navigation';
import { getPageStories, getStory } from '@/lib/content';
import { pageStoryMetadata } from '@/lib/metadata';
import StoryRenderer from '@/components/bloks/StoryRenderer';

/**
 * Every page at the top level of Storyblok, like /about.
 * A new page you publish in Storyblok works straight away at /<its slug>.
 */
export const revalidate = 3600;

export async function generateStaticParams() {
	return (await getPageStories()).map((story) => ({ slug: story.slug }));
}

async function load(slug) {
	if (slug === 'home') return null;
	const story = await getStory(slug);
	return story?.content?.component === 'page' ? story : null;
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const story = await load(slug);
	return story ? pageStoryMetadata(story, `/${slug}`) : {};
}

export default async function Page({ params }) {
	const story = await load((await params).slug);
	if (!story) notFound();
	return <StoryRenderer story={story} />;
}

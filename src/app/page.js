import { notFound } from 'next/navigation';
import { getStory } from '@/lib/content';
import { pageStoryMetadata } from '@/lib/metadata';
import StoryRenderer from '@/components/bloks/StoryRenderer';
import SetupNotice from '@/components/bloks/SetupNotice';

export const revalidate = 3600;

export async function generateMetadata() {
	return pageStoryMetadata(await getStory('home'), '/');
}

export default async function HomePage() {
	const story = await getStory('home');
	if (!story) {
		if (process.env.NODE_ENV === 'production') notFound();
		return <SetupNotice slug="home" />;
	}
	return <StoryRenderer story={story} />;
}

import StoryRenderer from '@/components/bloks/StoryRenderer';
import { getPage } from '@/lib/content';
import { storyMetadata } from '@/lib/metadata';

export const revalidate = 3600;

export async function generateMetadata() {
	return storyMetadata(await getPage('home'), { path: '/' });
}

export default async function HomePage() {
	return <StoryRenderer story={await getPage('home')} />;
}

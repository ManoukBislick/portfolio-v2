import StoryRenderer from '@/components/bloks/StoryRenderer';
import { getPage } from '@/lib/content';
import { storyMetadata } from '@/lib/metadata';

export const revalidate = 3600;

export async function generateMetadata() {
	return storyMetadata(await getPage('about'), {
		title: 'About',
		description:
			'Who I am, where I’ve worked, what I studied and the skills I bring.',
		path: '/about',
	});
}

export default async function AboutPage() {
	return <StoryRenderer story={await getPage('about')} />;
}

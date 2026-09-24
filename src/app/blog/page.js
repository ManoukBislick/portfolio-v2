import StoryRenderer from '@/components/bloks/StoryRenderer';
import { getPage } from '@/lib/content';
import { storyMetadata } from '@/lib/metadata';

export const revalidate = 3600;

export async function generateMetadata() {
	return storyMetadata(await getPage('blog'), {
		title: 'Blog',
		description: 'Monthly notes on AI, Next.js, React and Storyblok.',
		path: '/blog',
	});
}

export default async function BlogPage() {
	return <StoryRenderer story={await getPage('blog')} />;
}

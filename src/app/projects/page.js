import StoryRenderer from '@/components/bloks/StoryRenderer';
import { getPage } from '@/lib/content';
import { storyMetadata } from '@/lib/metadata';

export const revalidate = 3600;

export async function generateMetadata() {
	return storyMetadata(await getPage('projects'), {
		title: 'Projects',
		description: 'A selection of websites, experiments and side projects.',
		path: '/projects',
	});
}

export default async function ProjectsPage() {
	return <StoryRenderer story={await getPage('projects')} />;
}

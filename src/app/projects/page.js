import { getStory } from '@/lib/content';
import { pageStoryMetadata } from '@/lib/metadata';
import StoryRenderer from '@/components/bloks/StoryRenderer';

export const revalidate = 3600;

/** Used when the Projects folder in Storyblok has no start page (yet). */
const fallback = {
	content: {
		component: 'page',
		body: [
			{ _uid: 'projects-intro', component: 'page_hero', title: 'Projects' },
			{ _uid: 'projects-grid', component: 'project_grid', show_filter: true },
		],
	},
};

export async function generateMetadata() {
	return pageStoryMetadata(
		(await getStory('projects/')) ?? fallback,
		'/projects',
	);
}

export default async function ProjectsPage() {
	return <StoryRenderer story={(await getStory('projects/')) ?? fallback} />;
}

import { notFound } from 'next/navigation';
import StoryRenderer from '@/components/bloks/StoryRenderer';
import {
	getProjectStories,
	getProjectStory,
	toProjectDetail,
} from '@/lib/content';
import { storyMetadata } from '@/lib/metadata';

export const revalidate = 3600;

export async function generateStaticParams() {
	const stories = await getProjectStories();
	return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const story = await getProjectStory(slug);
	if (!story) return {};
	const project = toProjectDetail(story);
	return storyMetadata(story, {
		title: project.title,
		description: project.seoDescription,
		path: project.href,
		image: project.cover,
	});
}

export default async function ProjectPage({ params }) {
	const { slug } = await params;
	const story = await getProjectStory(slug);
	if (!story) notFound();
	return <StoryRenderer story={story} />;
}

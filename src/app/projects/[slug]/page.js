import { notFound } from 'next/navigation';
import { getProjectStories, getStory, toProject } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import StoryRenderer from '@/components/bloks/StoryRenderer';

export const revalidate = 3600;

export async function generateStaticParams() {
	return (await getProjectStories()).map((story) => ({ slug: story.slug }));
}

async function load(slug) {
	const story = await getStory(`projects/${slug}`);
	return story?.content?.component === 'project' ? story : null;
}

export async function generateMetadata({ params }) {
	const story = await load((await params).slug);
	if (!story) return {};
	const project = toProject(story);
	return pageMetadata({
		title: project.title.replace(/\*/g, ''),
		description: project.seoDescription,
		path: project.href,
		image: project.cover,
	});
}

export default async function ProjectPage({ params }) {
	const story = await load((await params).slug);
	if (!story) notFound();
	return <StoryRenderer story={story} />;
}

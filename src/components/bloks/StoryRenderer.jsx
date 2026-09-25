import { StoryblokServerComponent, StoryblokStory } from '@storyblok/react/rsc';
import { getVersion } from '@/lib/content';
import './registry';

/**
 * Renders a story with the component that belongs to its content type.
 * While developing and in the Visual Editor it also listens for changes,
 * so edits show up in the preview while you type.
 */
export default async function StoryRenderer({ story }) {
	if (!story?.content) return null;
	if ((await getVersion()) === 'draft' && story.id) {
		return <StoryblokStory story={story} meta={story} />;
	}
	return <StoryblokServerComponent blok={story.content} meta={story} />;
}

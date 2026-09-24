import { StoryblokStory } from '@storyblok/react/rsc';
import './registry';

/**
 * Renders a Storyblok story (or a placeholder story with the same shape)
 * and enables live editing inside the Storyblok Visual Editor.
 */
export default function StoryRenderer({ story }) {
	if (!story) return null;
	const meta = {
		uuid: story.uuid,
		slug: story.slug,
		full_slug: story.full_slug,
		name: story.name,
		first_published_at: story.first_published_at,
		published_at: story.published_at,
		created_at: story.created_at,
	};
	return <StoryblokStory story={story} meta={meta} />;
}

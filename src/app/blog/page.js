import { getStory } from '@/lib/content';
import { pageStoryMetadata } from '@/lib/metadata';
import StoryRenderer from '@/components/bloks/StoryRenderer';

export const revalidate = 3600;

/** Used when the Blog folder in Storyblok has no start page (yet). */
const fallback = {
	content: {
		component: 'page',
		body: [
			{ _uid: 'blog-intro', component: 'page_hero', title: 'Blog' },
			{ _uid: 'blog-list', component: 'article_list' },
		],
	},
};

export async function generateMetadata() {
	return pageStoryMetadata((await getStory('blog/')) ?? fallback, '/blog');
}

export default async function BlogPage() {
	return <StoryRenderer story={(await getStory('blog/')) ?? fallback} />;
}

import StoryRenderer from '@/components/bloks/StoryRenderer';
import { getPage } from '@/lib/content';
import { storyMetadata } from '@/lib/metadata';

export const revalidate = 3600;

export async function generateMetadata() {
	return storyMetadata(await getPage('contact'), {
		title: 'Contact',
		description:
			'Have a project in mind or just want to say hi? Send me a message.',
		path: '/contact',
	});
}

export default async function ContactPage() {
	return <StoryRenderer story={await getPage('contact')} />;
}

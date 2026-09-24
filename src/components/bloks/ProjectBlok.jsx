import { storyblokEditable } from '@storyblok/react/rsc';
import { getProjectStories, toProjectDetail } from '@/lib/content';
import { RichText } from '@/components/organisms';
import ProjectTemplate from '@/components/templates/ProjectTemplate';

/** Content type `project`: a full case study page. */
export default async function ProjectBlok({ blok, meta: story }) {
	const project = toProjectDetail({ ...story, content: blok });
	const all = await getProjectStories();
	const index = all.findIndex((item) => item.slug === story?.slug);
	const nextStory = all.length > 1 ? all[(index + 1) % all.length] : null;
	const next = nextStory
		? {
				href: `/projects/${nextStory.slug}`,
				title: nextStory.content?.title || nextStory.name,
				cover: nextStory.content?.cover,
			}
		: null;

	return (
		<ProjectTemplate
			attrs={storyblokEditable(blok)}
			project={project}
			body={<RichText document={blok.body} />}
			next={next}
		/>
	);
}

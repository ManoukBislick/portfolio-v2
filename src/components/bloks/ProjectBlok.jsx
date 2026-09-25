import { storyblokEditable } from '@storyblok/react/rsc';
import { getNextProject, toProject } from '@/lib/content';
import ProjectTemplate from '@/components/templates/ProjectTemplate';
import RichText from './RichText';

/** Content type `project`: one project page. */
export default async function ProjectBlok({ blok, meta }) {
	const project = toProject({ ...meta, content: blok });
	const next = await getNextProject(project.slug);

	return (
		<ProjectTemplate
			attrs={storyblokEditable(blok)}
			project={project}
			body={<RichText document={blok.body} />}
			next={next}
		/>
	);
}

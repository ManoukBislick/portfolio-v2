import { storyblokEditable } from '@storyblok/react/rsc';
import { getProjects } from '@/lib/content';
import { Container } from '@/components/atoms';
import { ProjectGrid } from '@/components/organisms';

/** Every project. */
export default async function ProjectGridBlok({ blok }) {
	// Only send what the cards need to the (client-side) grid.
	const projects = (await getProjects()).map(({ gallery, ...card }) => card);

	return (
		<section className="pb-8" {...storyblokEditable(blok)}>
			<Container>
				<ProjectGrid projects={projects} />
			</Container>
		</section>
	);
}

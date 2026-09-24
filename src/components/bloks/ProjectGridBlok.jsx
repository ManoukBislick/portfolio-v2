import { storyblokEditable } from '@storyblok/react/rsc';
import { getProjectStories, toProjectCard } from '@/lib/content';
import { Container } from '@/components/atoms';
import { ProjectGrid } from '@/components/organisms';

export default async function ProjectGridBlok({ blok }) {
	const projects = (await getProjectStories()).map(toProjectCard);
	return (
		<section className="pb-16 sm:pb-24" {...storyblokEditable(blok)}>
			<Container>
				<ProjectGrid
					projects={projects}
					showFilter={blok.show_filter !== false}
				/>
			</Container>
		</section>
	);
}

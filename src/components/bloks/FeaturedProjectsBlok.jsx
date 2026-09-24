import { storyblokEditable } from '@storyblok/react/rsc';
import { cn } from '@/lib/utils';
import { getFeaturedProjects, toProjectCard } from '@/lib/content';
import { Button, Container } from '@/components/atoms';
import { ProjectCard, SectionHeader } from '@/components/molecules';
import Reveal from '@/components/animations/Reveal';

/** Fetches its own projects: hand-picked in Storyblok, or the featured ones. */
export default async function FeaturedProjectsBlok({ blok }) {
	const limit = Number(blok.count) || 4;
	const uuids = Array.isArray(blok.projects)
		? blok.projects
				.map((item) => (typeof item === 'string' ? item : item?.uuid))
				.filter(Boolean)
		: [];
	const projects = (await getFeaturedProjects({ uuids, limit })).map(
		toProjectCard,
	);
	if (!projects.length) return null;

	return (
		<section className="py-20 sm:py-28" {...storyblokEditable(blok)}>
			<Container>
				<SectionHeader
					eyebrow={blok.eyebrow}
					title={blok.title}
					intro={blok.intro}
					size="xl"
					action={
						blok.link_label ? (
							<Button href="/projects" variant="secondary">
								{blok.link_label}
							</Button>
						) : null
					}
				/>
				<div className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2">
					{projects.map((project, index) => (
						<Reveal
							key={project.id}
							delay={(index % 2) * 0.12}
							className={cn(index % 2 === 1 && 'md:mt-24')}
						>
							<ProjectCard
								{...project}
								aspect={
									index % 4 === 0 || index % 4 === 3 ? 'portrait' : 'landscape'
								}
							/>
						</Reveal>
					))}
				</div>
			</Container>
		</section>
	);
}

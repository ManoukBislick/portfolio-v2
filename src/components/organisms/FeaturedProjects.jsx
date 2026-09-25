import { cn } from '@/lib/utils';
import { Button, Container } from '@/components/atoms';
import { ProjectCard, SectionHeader } from '@/components/molecules';
import Reveal from '@/components/animations/Reveal';

/** A few projects in a two-column grid, with a link to the full overview. */
export default function FeaturedProjects({
	title,
	intro,
	linkLabel,
	projects = [],
	attrs,
	className,
}) {
	if (!projects.length) return null;

	return (
		<section className={cn('py-12 sm:py-16', className)} {...attrs}>
			<Container>
				<SectionHeader
					title={title}
					intro={intro}
					action={
						linkLabel ? (
							<Button href="/projects" variant="link" arrow>
								{linkLabel}
							</Button>
						) : null
					}
				/>
				<Reveal
					stagger={0.1}
					className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2"
				>
					{projects.map((project) => (
						<ProjectCard key={project.id} {...project} />
					))}
				</Reveal>
			</Container>
		</section>
	);
}

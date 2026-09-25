import { cn } from '@/lib/utils';
import { Container } from '@/components/atoms';
import { SectionHeader } from '@/components/molecules';
import Reveal from '@/components/animations/Reveal';

/** Skills in a few plain columns. */
export default function Skills({
	title,
	intro,
	groups = [],
	attrs,
	className,
}) {
	return (
		<section className={cn('py-12 sm:py-16', className)} {...attrs}>
			<Container>
				<SectionHeader title={title} intro={intro} />
				<Reveal
					stagger={0.06}
					className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
				>
					{groups.map((group) => (
						<div key={group.id ?? group.title} {...group.attrs}>
							<h3 className="font-sans text-sm font-medium text-sage-950">
								{group.title}
							</h3>
							<ul className="mt-3 flex flex-col gap-1.5 text-sage-800">
								{group.skills.map((skill) => (
									<li key={skill}>{skill}</li>
								))}
							</ul>
						</div>
					))}
				</Reveal>
			</Container>
		</section>
	);
}

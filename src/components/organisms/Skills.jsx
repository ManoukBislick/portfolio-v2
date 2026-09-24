import { cn } from '@/lib/utils';
import { Container } from '@/components/atoms';
import { SectionHeader, SkillGroup } from '@/components/molecules';
import Reveal from '@/components/animations/Reveal';

const ICONS = ['code', 'layers', 'sprout', 'heart'];

/** Skills grouped in soft cards on a pale sage background. */
export default function Skills({
	eyebrow,
	title,
	intro,
	groups = [],
	className,
	attrs,
}) {
	return (
		<section className={cn('py-8 sm:py-12', className)} {...attrs}>
			<Container>
				<div className="rounded-[2.5rem] bg-sage-50 px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
					<SectionHeader
						eyebrow={eyebrow}
						title={title}
						intro={intro}
						size="xl"
					/>
					<Reveal stagger={0.1} className="mt-12 grid gap-5 md:grid-cols-2">
						{groups.map((group, index) => (
							<SkillGroup
								key={group.id}
								icon={ICONS[index % ICONS.length]}
								{...group}
							/>
						))}
					</Reveal>
				</div>
			</Container>
		</section>
	);
}

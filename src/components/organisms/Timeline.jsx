import { cn } from '@/lib/utils';
import { Container } from '@/components/atoms';
import { SectionHeader, TimelineItem } from '@/components/molecules';
import Reveal from '@/components/animations/Reveal';

/** Experience or education as a simple list: period on the left, details on the right. */
export default function Timeline({
	title,
	intro,
	items = [],
	attrs,
	className,
}) {
	return (
		<section className={cn('py-12 sm:py-16', className)} {...attrs}>
			<Container>
				<SectionHeader title={title} intro={intro} />
				<Reveal as="ol" stagger={0.08}>
					{items.map((item, index) => (
						<TimelineItem key={item.id ?? `${item.title}-${index}`} {...item} />
					))}
				</Reveal>
			</Container>
		</section>
	);
}

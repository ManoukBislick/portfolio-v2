import { cn } from '@/lib/utils';
import { Container } from '@/components/atoms';
import { SectionHeader, TimelineItem } from '@/components/molecules';
import Reveal from '@/components/animations/Reveal';
import ScrollLine from '@/components/animations/ScrollLine';

/** Experience or education along a line that fills up while you scroll. */
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
				<div className="relative mt-4">
					<ScrollLine className="top-8 bottom-8" />
					<Reveal as="ol" stagger={0.1}>
						{items.map((item, index) => (
							<TimelineItem
								key={item.id ?? `${item.title}-${index}`}
								{...item}
							/>
						))}
					</Reveal>
				</div>
			</Container>
		</section>
	);
}

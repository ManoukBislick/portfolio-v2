import { cn } from '@/lib/utils';
import { Container } from '@/components/atoms';
import { SectionHeader, TimelineItem } from '@/components/molecules';
import Reveal from '@/components/animations/Reveal';
import ScrollLine from '@/components/animations/ScrollLine';

/** Experience or education, told as a line that grows while you read. */
export default function Timeline({
	eyebrow,
	title,
	intro,
	items = [],
	className,
	attrs,
}) {
	return (
		<section className={cn('py-16 sm:py-24', className)} {...attrs}>
			<Container className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
				<div className="lg:sticky lg:top-32 lg:self-start">
					<SectionHeader
						eyebrow={eyebrow}
						title={title}
						intro={intro}
						size="xl"
					/>
				</div>
				<div className="relative">
					<ScrollLine />
					<Reveal as="ol" stagger={0.14} className="relative">
						{items.map((item) => (
							<TimelineItem key={item.id} {...item} />
						))}
					</Reveal>
				</div>
			</Container>
		</section>
	);
}

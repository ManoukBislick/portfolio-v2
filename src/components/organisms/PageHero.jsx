import { cn } from '@/lib/utils';
import { Container } from '@/components/atoms';
import { SectionHeader } from '@/components/molecules';
import BotanicalLine from '@/components/animations/BotanicalLine';

/** Calm opening for inner pages: big serif title, short intro, a growing branch. */
export default function PageHero({ eyebrow, title, intro, className, attrs }) {
	return (
		<section
			className={cn(
				'relative overflow-hidden pt-36 pb-12 sm:pt-44 sm:pb-20',
				className,
			)}
			{...attrs}
		>
			<Container className="relative">
				<SectionHeader
					as="h1"
					size="display"
					eyebrow={eyebrow}
					title={title}
					intro={intro}
					onLoad
				/>
				<BotanicalLine
					onLoad
					delay={0.5}
					className="pointer-events-none absolute -top-16 right-8 hidden h-80 w-auto lg:block xl:right-16"
				/>
			</Container>
		</section>
	);
}

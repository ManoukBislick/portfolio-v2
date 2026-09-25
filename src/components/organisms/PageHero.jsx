import { cn } from '@/lib/utils';
import { Container, Text, withAccents } from '@/components/atoms';
import Reveal from '@/components/animations/Reveal';
import SplitReveal from '@/components/animations/SplitReveal';
import BotanicalLine from '@/components/animations/BotanicalLine';

/** Title and a short intro at the top of inner pages, with a small branch growing next to it. */
export default function PageHero({ title, intro, attrs, className }) {
	return (
		<section
			className={cn('pt-6 pb-12 sm:pt-14 sm:pb-16', className)}
			{...attrs}
		>
			<Container className="relative">
				<div className="flex max-w-3xl flex-col gap-5">
					<SplitReveal as="h1" onLoad className="text-title">
						{withAccents(title)}
					</SplitReveal>
					{intro ? (
						<Reveal onLoad delay={0.3}>
							<Text size="lead">{intro}</Text>
						</Reveal>
					) : null}
				</div>
				<BotanicalLine
					onLoad
					delay={0.5}
					flip
					className="pointer-events-none absolute -top-6 right-8 hidden h-48 w-auto md:block"
				/>
			</Container>
		</section>
	);
}

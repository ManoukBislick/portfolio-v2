import { cn } from '@/lib/utils';
import { Container, Text, withAccents } from '@/components/atoms';
import Reveal from '@/components/animations/Reveal';

/** Title and a short intro at the top of inner pages. */
export default function PageHero({ title, intro, attrs, className }) {
	return (
		<section
			className={cn('pt-6 pb-12 sm:pt-14 sm:pb-16', className)}
			{...attrs}
		>
			<Container>
				<Reveal onLoad className="flex max-w-3xl flex-col gap-5">
					<h1 className="text-title">{withAccents(title)}</h1>
					{intro ? <Text size="lead">{intro}</Text> : null}
				</Reveal>
			</Container>
		</section>
	);
}

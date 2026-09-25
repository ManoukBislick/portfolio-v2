import { cn } from '@/lib/utils';
import { Text, withAccents } from '@/components/atoms';
import Reveal from '@/components/animations/Reveal';
import SplitReveal from '@/components/animations/SplitReveal';

/** Section title that rises in line by line, with an optional intro and a link on the right. */
export default function SectionHeader({
	title,
	intro,
	action,
	as = 'h2',
	className,
}) {
	return (
		<div
			className={cn(
				'flex flex-col gap-4 border-b border-sage-900/10 pb-5 sm:flex-row sm:items-end sm:justify-between',
				className,
			)}
		>
			<div className="flex max-w-2xl flex-col gap-3">
				{title ? (
					<SplitReveal as={as} className="text-3xl leading-tight sm:text-4xl">
						{withAccents(title)}
					</SplitReveal>
				) : null}
				{intro ? (
					<Reveal delay={0.15}>
						<Text>{intro}</Text>
					</Reveal>
				) : null}
			</div>
			{action ? (
				<Reveal delay={0.25} className="shrink-0">
					{action}
				</Reveal>
			) : null}
		</div>
	);
}

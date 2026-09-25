import { cn } from '@/lib/utils';
import { Text, withAccents } from '@/components/atoms';
import Reveal from '@/components/animations/Reveal';

/** Section title with an optional intro and a link on the right. */
export default function SectionHeader({
	title,
	intro,
	action,
	as: Element = 'h2',
	className,
}) {
	return (
		<Reveal
			className={cn(
				'flex flex-col gap-4 border-b border-sage-900/10 pb-5 sm:flex-row sm:items-end sm:justify-between',
				className,
			)}
		>
			<div className="flex max-w-2xl flex-col gap-3">
				<Element className="text-3xl leading-tight sm:text-4xl">
					{withAccents(title)}
				</Element>
				{intro ? <Text>{intro}</Text> : null}
			</div>
			{action ? <div className="shrink-0">{action}</div> : null}
		</Reveal>
	);
}

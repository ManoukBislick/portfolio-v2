import { cn } from '@/lib/utils';

/** One entry in a list of jobs or studies. */
export default function TimelineItem({
	period,
	title,
	place,
	description,
	attrs,
	className,
}) {
	return (
		<li
			className={cn(
				'grid gap-1 border-b border-sage-900/10 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8',
				className,
			)}
			{...attrs}
		>
			<p className="text-sm text-sage-600 tabular-nums">{period}</p>
			<div className="flex flex-col gap-1">
				<h3 className="text-xl leading-snug sm:text-2xl">
					{title}
					{place ? (
						<span className="font-sans text-base text-sage-700">
							{' '}
							· {place}
						</span>
					) : null}
				</h3>
				{description ? (
					<p className="max-w-2xl text-sage-800">{description}</p>
				) : null}
			</div>
		</li>
	);
}

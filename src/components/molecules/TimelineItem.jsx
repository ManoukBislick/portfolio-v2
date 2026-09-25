import { cn } from '@/lib/utils';

/** One entry in a list of jobs or studies, with a dot on the timeline. */
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
				'relative grid gap-1 py-6 pl-8 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:pl-10',
				className,
			)}
			{...attrs}
		>
			<span
				aria-hidden="true"
				className="absolute top-[1.95rem] left-0 size-2.5 -translate-x-1/2 rounded-full border border-sage-500 bg-cream-50 ring-4 ring-cream-50"
			/>
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

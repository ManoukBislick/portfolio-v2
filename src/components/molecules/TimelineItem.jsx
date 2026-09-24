import { cn } from '@/lib/utils';

/** One step in a career or education timeline. */
export default function TimelineItem({
	period,
	title,
	place,
	description,
	className,
	attrs,
}) {
	return (
		<li
			className={cn(
				'relative grid gap-2 pb-12 pl-10 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-10 md:pl-12',
				className,
			)}
			{...attrs}
		>
			<span
				aria-hidden="true"
				data-timeline-dot=""
				className="absolute top-2 left-0 size-3 -translate-x-1/2 rounded-full border border-sage-500 bg-cream-50 ring-4 ring-cream-50"
			/>
			<p className="pt-0.5 text-xs tracking-[0.18em] text-sage-600 uppercase">
				{period}
			</p>
			<div className="flex flex-col gap-1.5">
				<h3 className="font-serif text-2xl leading-snug sm:text-3xl">
					{title}
				</h3>
				{place ? (
					<p className="text-sm font-normal text-sage-700">{place}</p>
				) : null}
				{description ? (
					<p className="mt-2 max-w-2xl text-base leading-relaxed text-sage-800">
						{description}
					</p>
				) : null}
			</div>
		</li>
	);
}

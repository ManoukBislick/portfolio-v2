import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Picture } from '@/components/atoms';

/** A project preview: image with a slow zoom on hover, title with year, summary and tags. */
export default function ProjectCard({
	href,
	title,
	summary,
	cover,
	year,
	tags = [],
	priority = false,
	className,
}) {
	return (
		<article className={cn('group', className)}>
			<Link href={href} className="block">
				<div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sage-100">
					<Picture
						image={cover}
						alt={cover?.alt || title}
						fill
						priority={priority}
						sizes="(min-width: 768px) 45vw, 100vw"
						className="transition-transform duration-[1600ms] ease-[var(--ease-calm)] group-hover:scale-[1.04]"
					/>
					<span
						aria-hidden="true"
						className="absolute right-4 bottom-4 grid size-11 translate-y-3 place-items-center rounded-full bg-cream-50 text-lg text-sage-900 opacity-0 transition-all duration-700 ease-[var(--ease-calm)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
					>
						↗
					</span>
				</div>
				<div className="mt-4 flex items-baseline justify-between gap-4">
					<h3 className="text-2xl leading-snug transition-colors duration-500 group-hover:text-sage-700">
						{title}
					</h3>
					{year ? (
						<span className="shrink-0 text-sm text-sage-600 tabular-nums">
							{year}
						</span>
					) : null}
				</div>
			</Link>
			{summary ? (
				<p className="mt-1 max-w-xl text-sm leading-relaxed text-sage-700">
					{summary}
				</p>
			) : null}
			{tags.length ? (
				<p className="mt-2 text-xs text-sage-600">{tags.join(' · ')}</p>
			) : null}
		</article>
	);
}

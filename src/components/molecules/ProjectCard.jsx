import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Picture } from '@/components/atoms';

/** A project preview: image, title with year, one-line summary and tags. */
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
						className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
					/>
				</div>
				<div className="mt-4 flex items-baseline justify-between gap-4">
					<h3 className="text-2xl leading-snug decoration-sage-300 underline-offset-4 group-hover:underline">
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

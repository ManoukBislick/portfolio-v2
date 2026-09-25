import Link from 'next/link';
import { cn } from '@/lib/utils';

/** One row in a list of articles: date on the left, title and excerpt on the right. */
export default function ArticleCard({
	href,
	title,
	excerpt,
	date,
	dateISO,
	readingTime,
	draft = false,
	className,
}) {
	return (
		<article
			className={cn(
				'group border-t border-sage-900/10 first:border-t-0',
				className,
			)}
		>
			<Link
				href={href}
				className="grid gap-2 py-7 sm:grid-cols-[10rem_1fr] sm:gap-8"
			>
				<p className="text-sm text-sage-600 tabular-nums">
					{date ? <time dateTime={dateISO}>{date}</time> : null}
					{draft ? (
						<span className="ml-2 rounded bg-blush-200 px-1.5 py-0.5 text-xs text-sage-900">
							Draft
						</span>
					) : null}
				</p>
				<div className="flex flex-col gap-1.5">
					<h3 className="flex items-baseline justify-between gap-6 text-2xl leading-snug transition-colors duration-500 group-hover:text-sage-700">
						<span>{title}</span>
						<span
							aria-hidden="true"
							className="shrink-0 -translate-x-3 text-xl text-sage-600 opacity-0 transition-all duration-500 ease-[var(--ease-calm)] group-hover:translate-x-0 group-hover:opacity-100"
						>
							→
						</span>
					</h3>
					{excerpt ? (
						<p className="max-w-2xl text-sm leading-relaxed text-sage-700">
							{excerpt}
						</p>
					) : null}
					{readingTime ? (
						<p className="text-xs text-sage-600">{readingTime} min read</p>
					) : null}
				</div>
			</Link>
		</article>
	);
}

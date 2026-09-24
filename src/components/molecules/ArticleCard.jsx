import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icon, SbImage, Tag } from '@/components/atoms';

function Meta({ date, readingTime }) {
	return (
		<p className="flex items-center gap-3 text-xs tracking-[0.18em] text-sage-600 uppercase">
			{date ? <time>{date}</time> : null}
			{date && readingTime ? <span aria-hidden="true">·</span> : null}
			{readingTime ? <span>{readingTime} min read</span> : null}
		</p>
	);
}

/**
 * Blog preview. `feature` shows a large card with image,
 * `row` a quiet list row that fits many articles.
 */
export default function ArticleCard({
	href,
	title,
	excerpt,
	cover,
	date,
	readingTime,
	tags = [],
	variant = 'row',
	className,
	attrs,
}) {
	if (variant === 'feature') {
		return (
			<article className={cn('group', className)} {...attrs}>
				<Link
					href={href}
					className="grid gap-8 rounded-[2rem] md:grid-cols-2 md:items-center md:gap-14"
				>
					<div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-sage-100">
						<SbImage
							image={cover}
							alt={cover?.alt || ''}
							fill
							sizes="(min-width: 768px) 50vw, 100vw"
							className="transition-transform duration-[1600ms] ease-[var(--ease-calm)] group-hover:scale-[1.04]"
						/>
					</div>
					<div className="flex flex-col gap-5">
						<Meta date={date} readingTime={readingTime} />
						<h3 className="font-serif text-4xl leading-[1.05] sm:text-5xl">
							{title}
						</h3>
						{excerpt ? (
							<p className="text-lg leading-relaxed text-sage-700">{excerpt}</p>
						) : null}
						{tags.length ? (
							<ul className="flex flex-wrap gap-2">
								{tags.map((tag) => (
									<li key={tag}>
										<Tag tone="soft">{tag}</Tag>
									</li>
								))}
							</ul>
						) : null}
						<span className="mt-2 inline-flex items-center gap-2 text-sm text-sage-900">
							<span className="link-underline group-hover:bg-[length:100%_1px]">
								Read article
							</span>
							<Icon
								name="arrow-right"
								className="size-4 transition-transform duration-500 group-hover:translate-x-1"
							/>
						</span>
					</div>
				</Link>
			</article>
		);
	}

	return (
		<article
			className={cn('group border-t border-sage-900/10', className)}
			{...attrs}
		>
			<Link
				href={href}
				className="grid gap-3 py-8 transition-[padding] duration-700 ease-[var(--ease-calm)] md:grid-cols-[12rem_1fr_auto] md:items-baseline md:gap-10 md:hover:pl-3"
			>
				<Meta date={date} readingTime={readingTime} />
				<div className="flex flex-col gap-2">
					<h3 className="font-serif text-3xl leading-tight transition-colors duration-500 group-hover:text-sage-700">
						{title}
					</h3>
					{excerpt ? (
						<p className="max-w-2xl text-sm leading-relaxed text-sage-700">
							{excerpt}
						</p>
					) : null}
				</div>
				<span className="hidden size-11 place-items-center rounded-full border border-sage-900/15 transition-colors duration-500 group-hover:border-sage-900 group-hover:bg-sage-900 group-hover:text-cream-50 md:grid">
					<Icon name="arrow-right" className="size-4" />
				</span>
			</Link>
		</article>
	);
}

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icon, SbImage, Tag } from '@/components/atoms';

const aspects = {
	portrait: 'aspect-[4/5]',
	landscape: 'aspect-[4/3]',
	wide: 'aspect-[16/10]',
};

const tints = {
	sage: 'bg-sage-100',
	cream: 'bg-cream-200',
	blush: 'bg-blush-100',
};

/** A project preview: soft-cornered image, gentle zoom on hover, title and tags. */
export default function ProjectCard({
	href,
	title,
	summary,
	cover,
	year,
	tags = [],
	tint = 'sage',
	aspect = 'landscape',
	priority = false,
	className,
	attrs,
}) {
	return (
		<article className={cn('group', className)} {...attrs}>
			<Link
				href={href}
				className="block rounded-[2rem] focus-visible:outline-offset-8"
			>
				<div
					className={cn(
						'relative overflow-hidden rounded-[2rem]',
						aspects[aspect],
						tints[tint] ?? tints.sage,
					)}
				>
					<SbImage
						image={cover}
						alt={cover?.alt || title}
						fill
						priority={priority}
						sizes="(min-width: 1024px) 45vw, 100vw"
						className="transition-transform duration-[1600ms] ease-[var(--ease-calm)] group-hover:scale-[1.04]"
					/>
					{year ? (
						<span className="absolute top-5 left-5">
							<Tag tone="light">{year}</Tag>
						</span>
					) : null}
					<span className="absolute right-5 bottom-5 grid size-12 translate-y-3 place-items-center rounded-full bg-cream-50 text-sage-900 opacity-0 transition-all duration-700 ease-[var(--ease-calm)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
						<Icon name="arrow-up-right" className="size-5" />
					</span>
				</div>

				<div className="mt-6 flex flex-col gap-2">
					<h3 className="font-serif text-3xl leading-tight transition-colors duration-500 group-hover:text-sage-700">
						{title}
					</h3>
					{summary ? (
						<p className="max-w-xl text-sm leading-relaxed text-sage-700">
							{summary}
						</p>
					) : null}
				</div>
			</Link>

			{tags.length ? (
				<ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
					{tags.map((tag) => (
						<li key={tag}>
							<Tag>{tag}</Tag>
						</li>
					))}
				</ul>
			) : null}
		</article>
	);
}

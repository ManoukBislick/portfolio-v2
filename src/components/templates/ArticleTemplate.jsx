import Link from 'next/link';
import { site } from '@/lib/site';
import { Container, Picture, Text, withAccents } from '@/components/atoms';
import Reveal from '@/components/animations/Reveal';
import SplitReveal from '@/components/animations/SplitReveal';
import ImageReveal from '@/components/animations/ImageReveal';

function Pager({ label, article, align = 'left' }) {
	if (!article) return <span />;
	return (
		<Link
			href={article.href}
			className={`group flex flex-col gap-1 ${align === 'right' ? 'sm:text-right' : ''}`}
		>
			<span className="text-sm text-sage-600">{label}</span>
			<span className="text-xl leading-snug decoration-sage-300 underline-offset-4 group-hover:underline">
				{article.title}
			</span>
		</Link>
	);
}

/**
 * Layout for a single blog article.
 * `body` is the text, already rendered (see bloks/ArticleBlok).
 */
export default function ArticleTemplate({
	article,
	body,
	previous,
	next,
	attrs,
}) {
	const {
		title,
		excerpt,
		cover,
		date,
		dateISO,
		readingTime,
		tags = [],
		draft,
	} = article;

	return (
		<article {...attrs}>
			<header className="pt-6 pb-10 sm:pt-12">
				<Container narrow className="flex flex-col gap-6">
					<Reveal onLoad>
						<Link
							href="/blog"
							className="text-sm text-sage-700 hover:text-sage-950"
						>
							← All articles
						</Link>
					</Reveal>
					<div className="flex flex-col gap-5">
						<Reveal onLoad delay={0.05}>
							<p className="text-sm text-sage-600">
								{draft ? (
									<span className="mr-2 rounded bg-blush-200 px-1.5 py-0.5 text-xs text-sage-900">
										Not published yet
									</span>
								) : null}
								{date ? <time dateTime={dateISO}>{date}</time> : null}
								{readingTime ? <span> · {readingTime} min read</span> : null}
							</p>
						</Reveal>
						<SplitReveal as="h1" onLoad delay={0.1} className="text-title">
							{withAccents(title)}
						</SplitReveal>
						<Reveal onLoad delay={0.4} className="flex flex-col gap-5">
							{excerpt ? <Text size="lead">{excerpt}</Text> : null}
							{tags.length ? (
								<p className="text-sm text-sage-600">{tags.join(' · ')}</p>
							) : null}
						</Reveal>
					</div>
				</Container>
			</header>

			{cover?.src ? (
				<Container narrow>
					<ImageReveal
						onLoad
						delay={0.2}
						className="aspect-[16/9] rounded-lg bg-sage-100"
					>
						<div className="relative size-full">
							<Picture
								image={cover}
								fill
								priority
								sizes="(min-width: 768px) 720px, 100vw"
							/>
						</div>
					</ImageReveal>
				</Container>
			) : null}

			<Container narrow className="py-10 sm:py-14">
				<Reveal>{body}</Reveal>

				<p className="mt-14 border-t border-sage-900/10 pt-6 text-sm text-sage-700">
					Written by {site.name}. More on the{' '}
					<Link
						href="/blog"
						className="underline decoration-sage-300 underline-offset-4 hover:decoration-sage-800"
					>
						blog
					</Link>
					.
				</p>

				{previous || next ? (
					<nav
						aria-label="More articles"
						className="mt-10 grid gap-8 sm:grid-cols-2"
					>
						<Pager label="Older" article={previous} />
						<Pager label="Newer" article={next} align="right" />
					</nav>
				) : null}
			</Container>
		</article>
	);
}

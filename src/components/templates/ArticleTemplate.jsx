import Link from 'next/link';
import { site } from '@/lib/site';
import {
	Container,
	Icon,
	SbImage,
	Tag,
	Text,
	withAccents,
} from '@/components/atoms';
import { Markdown } from '@/components/organisms';
import Reveal from '@/components/animations/Reveal';
import SplitReveal from '@/components/animations/SplitReveal';
import ImageReveal from '@/components/animations/ImageReveal';

function Pager({ label, article, align = 'left' }) {
	if (!article) return <span />;
	return (
		<Link
			href={article.href}
			className={`group flex flex-col gap-2 rounded-[2rem] border border-sage-900/10 p-6 transition-colors duration-500 hover:bg-sage-50 ${align === 'right' ? 'text-right' : ''}`}
		>
			<span className="text-[0.7rem] font-medium tracking-[0.22em] text-sage-600 uppercase">
				{label}
			</span>
			<span className="font-serif text-2xl leading-snug">{article.title}</span>
		</Link>
	);
}

/** Layout for a single blog article. */
export default function ArticleTemplate({ article, previous, next, attrs }) {
	const { title, excerpt, cover, date, readingTime, tags = [], body } = article;

	return (
		<article {...attrs}>
			<header className="pt-32 pb-12 sm:pt-40 sm:pb-16">
				<Container narrow className="flex flex-col gap-7">
					<Reveal onLoad y={10}>
						<Link
							href="/blog"
							className="group inline-flex items-center gap-2 text-sm text-sage-700 hover:text-sage-950"
						>
							<Icon
								name="arrow-left"
								className="size-4 transition-transform duration-500 group-hover:-translate-x-1"
							/>
							All articles
						</Link>
					</Reveal>
					<Reveal onLoad y={10} delay={0.05}>
						<p className="flex items-center gap-3 text-xs tracking-[0.18em] text-sage-600 uppercase">
							{date ? <time>{date}</time> : null}
							{date && readingTime ? <span aria-hidden="true">·</span> : null}
							{readingTime ? <span>{readingTime} min read</span> : null}
						</p>
					</Reveal>
					<SplitReveal as="h1" onLoad delay={0.1} className="text-title">
						{withAccents(title)}
					</SplitReveal>
					{excerpt ? (
						<Reveal onLoad delay={0.35}>
							<Text size="lead">{excerpt}</Text>
						</Reveal>
					) : null}
					{tags.length ? (
						<Reveal onLoad delay={0.45} className="flex flex-wrap gap-2">
							{tags.map((tag) => (
								<Tag key={tag} tone="soft">
									{tag}
								</Tag>
							))}
						</Reveal>
					) : null}
				</Container>
			</header>

			{cover?.filename ? (
				<Container>
					<ImageReveal
						onLoad
						delay={0.3}
						className="aspect-[16/9] rounded-[2.5rem] bg-sage-100"
					>
						<div className="relative size-full">
							<SbImage
								image={cover}
								fill
								priority
								sizes="(min-width: 1280px) 1200px, 100vw"
							/>
						</div>
					</ImageReveal>
				</Container>
			) : null}

			<Container narrow className="py-14 sm:py-20">
				<Reveal>
					<Markdown>{body}</Markdown>
				</Reveal>

				<Reveal className="mt-16 flex items-center gap-5 rounded-[2rem] bg-sage-50 p-6 sm:p-8">
					<span className="relative size-16 shrink-0 overflow-hidden rounded-full bg-sage-200">
						<SbImage
							image="/images/placeholders/portrait-2.svg"
							alt=""
							fill
							sizes="4rem"
						/>
					</span>
					<div className="flex flex-col gap-1">
						<p className="font-serif text-2xl">Written by {site.name}</p>
						<p className="text-sm text-sage-700">
							{site.role} writing about AI, Next.js, React and Storyblok.{' '}
							<Link href="/contact" className="link-underline text-sage-900">
								Say hello
							</Link>
						</p>
					</div>
				</Reveal>

				{previous || next ? (
					<nav
						aria-label="More articles"
						className="mt-10 grid gap-4 sm:grid-cols-2"
					>
						<Pager label="Previous" article={previous} />
						<Pager label="Next" article={next} align="right" />
					</nav>
				) : null}
			</Container>
		</article>
	);
}

import Link from 'next/link';
import {
	Button,
	Container,
	Icon,
	SbImage,
	Tag,
	Text,
	withAccents,
} from '@/components/atoms';
import { MetaList } from '@/components/molecules';
import { Gallery } from '@/components/organisms';
import Reveal from '@/components/animations/Reveal';
import SplitReveal from '@/components/animations/SplitReveal';
import ImageReveal from '@/components/animations/ImageReveal';

/** Layout for a single project case study. */
export default function ProjectTemplate({ project, body, next, attrs }) {
	const {
		title,
		summary,
		cover,
		year,
		role,
		client,
		stack = [],
		tags = [],
		url,
		gallery = [],
	} = project;

	return (
		<article {...attrs}>
			<header className="pt-32 pb-12 sm:pt-40 sm:pb-16">
				<Container className="flex flex-col gap-8">
					<Reveal onLoad y={10}>
						<Link
							href="/projects"
							className="group inline-flex items-center gap-2 text-sm text-sage-700 hover:text-sage-950"
						>
							<Icon
								name="arrow-left"
								className="size-4 transition-transform duration-500 group-hover:-translate-x-1"
							/>
							All projects
						</Link>
					</Reveal>
					<SplitReveal
						as="h1"
						onLoad
						delay={0.1}
						className="max-w-5xl text-display"
					>
						{withAccents(title)}
					</SplitReveal>
					<div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
						{summary ? (
							<Reveal onLoad delay={0.4}>
								<Text size="lead" className="max-w-2xl">
									{summary}
								</Text>
							</Reveal>
						) : null}
						<Reveal
							onLoad
							delay={0.5}
							className="flex flex-wrap gap-2 lg:justify-end"
						>
							{tags.map((tag) => (
								<Tag key={tag}>{tag}</Tag>
							))}
						</Reveal>
					</div>
				</Container>
			</header>

			{cover?.filename ? (
				<Container>
					<ImageReveal
						onLoad
						delay={0.3}
						className="aspect-[4/3] rounded-[2.5rem] bg-sage-100 sm:aspect-[16/9]"
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

			<Container className="py-14 sm:py-20">
				<Reveal className="flex flex-col gap-10">
					<MetaList
						items={[
							{ label: 'Year', value: year },
							{ label: 'Role', value: role },
							{ label: 'Client', value: client },
							{ label: 'Stack', value: stack },
						]}
					/>
					{url ? (
						<div>
							<Button href={url} variant="secondary" icon="arrow-up-right">
								Visit the live site
							</Button>
						</div>
					) : null}
				</Reveal>
			</Container>

			{body ? (
				<Container narrow className="pb-8">
					<Reveal>{body}</Reveal>
				</Container>
			) : null}

			<Gallery images={gallery} />

			{next ? (
				<Container className="pt-12 sm:pt-20">
					<Link
						href={next.href}
						className="group grid items-center gap-8 rounded-[2.5rem] bg-sage-50 p-6 transition-colors duration-700 hover:bg-sage-100 sm:grid-cols-[1fr_auto] sm:p-10"
					>
						<div className="flex flex-col gap-3">
							<p className="text-[0.7rem] font-medium tracking-[0.22em] text-sage-600 uppercase">
								Next project
							</p>
							<p className="font-serif text-title transition-transform duration-700 ease-[var(--ease-calm)] group-hover:translate-x-2">
								{next.title}
							</p>
						</div>
						<div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-sage-100 sm:w-64">
							<SbImage
								image={next.cover}
								fill
								sizes="16rem"
								className="transition-transform duration-[1600ms] ease-[var(--ease-calm)] group-hover:scale-105"
							/>
						</div>
					</Link>
				</Container>
			) : null}
		</article>
	);
}

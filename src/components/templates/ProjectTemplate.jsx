import Link from 'next/link';
import {
	Button,
	Container,
	Picture,
	Text,
	withAccents,
} from '@/components/atoms';
import { MetaList } from '@/components/molecules';
import { Gallery } from '@/components/organisms';
import Reveal from '@/components/animations/Reveal';
import ImageReveal from '@/components/animations/ImageReveal';

/**
 * Layout for a single project page.
 * `body` is the case study, already rendered (see bloks/ProjectBlok).
 */
export default function ProjectTemplate({ project, body, next, attrs }) {
	const {
		title,
		summary,
		cover,
		year,
		role,
		client,
		stack = [],
		url,
		gallery = [],
	} = project;

	return (
		<article {...attrs}>
			<header className="pt-6 pb-10 sm:pt-12">
				<Container className="flex flex-col gap-6">
					<Reveal onLoad>
						<Link
							href="/projects"
							className="text-sm text-sage-700 hover:text-sage-950"
						>
							← All projects
						</Link>
					</Reveal>
					<Reveal onLoad delay={0.05} className="flex max-w-3xl flex-col gap-5">
						<h1 className="text-title">{withAccents(title)}</h1>
						{summary ? <Text size="lead">{summary}</Text> : null}
					</Reveal>
				</Container>
			</header>

			{cover?.src ? (
				<Container>
					<ImageReveal
						onLoad
						delay={0.2}
						className="aspect-[16/10] rounded-lg bg-sage-100"
					>
						<div className="relative size-full">
							<Picture
								image={cover}
								fill
								priority
								sizes="(min-width: 1152px) 1100px, 100vw"
							/>
						</div>
					</ImageReveal>
				</Container>
			) : null}

			<Container className="py-10">
				<Reveal className="flex flex-col gap-6">
					<MetaList
						items={[
							{ label: 'Year', value: year },
							{ label: 'Role', value: role },
							{ label: 'Client', value: client },
							{ label: 'Built with', value: stack },
						]}
					/>
					{url ? (
						<div>
							<Button href={url} variant="link" arrow>
								Visit the live site
							</Button>
						</div>
					) : null}
				</Reveal>
			</Container>

			{body ? (
				<Container narrow className="pb-6">
					<Reveal>{body}</Reveal>
				</Container>
			) : null}

			<Gallery images={gallery} />

			{next ? (
				<Container className="pt-10">
					<Link
						href={next.href}
						className="group flex items-center justify-between gap-6 border-t border-sage-900/10 pt-8"
					>
						<div className="flex flex-col gap-1">
							<p className="text-sm text-sage-600">Next project</p>
							<p className="text-2xl decoration-sage-300 underline-offset-4 group-hover:underline sm:text-3xl">
								{next.title}
							</p>
						</div>
						<span aria-hidden="true" className="text-2xl text-sage-600">
							→
						</span>
					</Link>
				</Container>
			) : null}
		</article>
	);
}

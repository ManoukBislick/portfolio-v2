import Link from 'next/link';
import { site } from '@/lib/site';
import { Container, withAccents } from '@/components/atoms';
import Reveal from '@/components/animations/Reveal';
import SplitReveal from '@/components/animations/SplitReveal';
import BotanicalLine from '@/components/animations/BotanicalLine';

const columnTitle = 'mb-5 text-xs tracking-[0.18em] text-sage-400 uppercase';

/** Dark green footer with a branch that grows in as you reach the bottom of the page. */
export default function SiteFooter() {
	const year = new Date().getFullYear();

	return (
		<footer className="relative mt-24 overflow-hidden rounded-t-[2.5rem] bg-sage-950 text-cream-100 sm:mt-32 sm:rounded-t-[3.5rem]">
			<BotanicalLine
				className="pointer-events-none absolute -right-8 -bottom-12 h-[22rem] text-sage-700 sm:right-10 sm:h-[26rem]"
				leafFill="var(--color-sage-900)"
			/>

			<Container className="relative py-20 sm:py-28">
				<div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
					<div className="flex flex-col items-start gap-8">
						<SplitReveal
							as="p"
							className="max-w-3xl font-serif text-title text-cream-50"
						>
							{withAccents('Thanks for *stopping by*.', 'text-sage-300')}
						</SplitReveal>
						<Reveal delay={0.2} className="flex flex-col items-start gap-6">
							<p className="max-w-md text-cream-100/80">
								I write a new post every month about AI, Next.js, React and
								Storyblok.
							</p>
							<Link
								href="/blog"
								className="group inline-flex items-center gap-3 rounded-full bg-cream-50 px-6 py-3.5 text-sm font-medium text-sage-950 transition-colors duration-500 hover:bg-sage-200"
							>
								Read the blog
								<span
									aria-hidden="true"
									className="transition-transform duration-500 ease-[var(--ease-calm)] group-hover:translate-x-1"
								>
									→
								</span>
							</Link>
						</Reveal>
					</div>

					<Reveal stagger={0.08} className="grid grid-cols-2 gap-10 text-sm">
						<nav aria-label="Footer">
							<p className={columnTitle}>Pages</p>
							<ul className="flex flex-col gap-3">
								{site.nav.map((item) => (
									<li key={item.href}>
										<Link
											href={item.href}
											className="link-underline text-cream-100 hover:text-cream-50"
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>
						<div>
							<p className={columnTitle}>Elsewhere</p>
							<ul className="flex flex-col gap-3">
								{site.socials.map((link) => (
									<li key={link.href}>
										<a
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="link-underline text-cream-100 hover:text-cream-50"
										>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					</Reveal>
				</div>

				<div className="mt-20 flex flex-col gap-3 border-t border-cream-50/10 pt-8 text-xs text-sage-300 sm:flex-row sm:items-center sm:justify-between">
					<p>
						© {year} {site.name}
					</p>
					<p>Built with Next.js, Storyblok and GSAP. Hosted on Vercel.</p>
				</div>
			</Container>
		</footer>
	);
}

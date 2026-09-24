import Link from 'next/link';
import { site } from '@/lib/site';
import {
	Container,
	Eyebrow,
	Icon,
	StatusDot,
	withAccents,
} from '@/components/atoms';
import { SocialLinks } from '@/components/molecules';
import SplitReveal from '@/components/animations/SplitReveal';
import BotanicalLine from '@/components/animations/BotanicalLine';
import Magnetic from '@/components/animations/Magnetic';

export default function SiteFooter() {
	const year = new Date().getFullYear();

	return (
		<footer className="relative mt-24 overflow-hidden rounded-t-[2.5rem] bg-sage-950 text-cream-100 sm:mt-32 sm:rounded-t-[3.5rem]">
			<BotanicalLine
				className="pointer-events-none absolute -right-6 -bottom-10 h-[26rem] text-sage-700 sm:right-10"
				leafFill="var(--color-sage-900)"
			/>

			<Container className="relative py-20 sm:py-28">
				<div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
					<div className="flex flex-col gap-8">
						<Eyebrow className="text-sage-300">Get in touch</Eyebrow>
						<SplitReveal
							as="p"
							className="max-w-3xl font-serif text-title text-cream-50"
						>
							{withAccents(
								"Let's grow something *beautiful* together.",
								'text-sage-300',
							)}
						</SplitReveal>
						<div className="flex flex-wrap items-center gap-6">
							<Magnetic>
								<Link
									href="/contact"
									className="group inline-flex items-center gap-3 rounded-full bg-cream-50 px-7 py-4 text-sm text-sage-950 transition-colors duration-500 hover:bg-sage-200"
								>
									Start a conversation
									<Icon
										name="arrow-up-right"
										className="size-4 transition-transform duration-500 group-hover:rotate-45"
									/>
								</Link>
							</Magnetic>
							<a
								href={`mailto:${site.email}`}
								className="link-underline font-serif text-2xl text-cream-50 italic"
							>
								{site.email}
							</a>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-10 text-sm">
						<nav aria-label="Footer">
							<p className="mb-5 text-[0.7rem] tracking-[0.22em] text-sage-400 uppercase">
								Pages
							</p>
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
							<p className="mb-5 text-[0.7rem] tracking-[0.22em] text-sage-400 uppercase">
								Elsewhere
							</p>
							<SocialLinks tone="light" />
							<p className="mt-8 inline-flex items-center gap-3 text-cream-100/80">
								<StatusDot /> Open to new projects
							</p>
						</div>
					</div>
				</div>

				<div className="mt-20 flex flex-col gap-3 border-t border-cream-50/10 pt-8 text-xs text-sage-300 sm:flex-row sm:items-center sm:justify-between">
					<p>
						© {year} {site.name}. All rights reserved.
					</p>
					<p>Built with Next.js, Storyblok &amp; GSAP — hosted on Vercel.</p>
				</div>
			</Container>
		</footer>
	);
}

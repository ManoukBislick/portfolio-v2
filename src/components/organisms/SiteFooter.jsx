import Link from 'next/link';
import { site } from '@/lib/site';
import { Container, SocialIcon, withAccents } from '@/components/atoms';
import Reveal from '@/components/animations/Reveal';
import SplitReveal from '@/components/animations/SplitReveal';

/** Dark green footer with a thank-you note, social links and the page links. */
export default function SiteFooter() {
	const year = new Date().getFullYear();

	return (
		<footer className="relative mt-24 overflow-hidden rounded-t-[2.5rem] bg-sage-950 text-cream-100 sm:mt-32 sm:rounded-t-[3.5rem]">
			<Container className="py-20 sm:py-28">
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
								Say hi, or follow along over here.
							</p>
							<ul className="flex items-center gap-4">
								{site.socials.map((link) => (
									<li key={link.href}>
										<a
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={link.label}
											className="flex size-14 items-center justify-center rounded-full border border-cream-50/20 text-cream-50 transition-colors duration-500 hover:border-cream-50 hover:bg-cream-50 hover:text-sage-950"
										>
											<SocialIcon name={link.icon} className="size-5" />
										</a>
									</li>
								))}
							</ul>
						</Reveal>
					</div>

					<Reveal className="text-sm">
						<nav aria-label="Footer">
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

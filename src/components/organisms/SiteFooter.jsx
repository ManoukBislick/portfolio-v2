import Link from 'next/link';
import { site } from '@/lib/site';
import { Container } from '@/components/atoms';

export default function SiteFooter() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-24 border-t border-sage-900/10 sm:mt-32">
			<Container className="flex flex-col gap-6 py-10 text-sm text-sage-700 sm:flex-row sm:items-center sm:justify-between">
				<p>
					© {year} {site.name}
				</p>
				<nav aria-label="Footer">
					<ul className="flex flex-wrap gap-x-6 gap-y-2">
						{site.nav.map((item) => (
							<li key={item.href}>
								<Link href={item.href} className="hover:text-sage-950">
									{item.label}
								</Link>
							</li>
						))}
						{site.socials.map((link) => (
							<li key={link.href}>
								<a
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-sage-950"
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</Container>
		</footer>
	);
}

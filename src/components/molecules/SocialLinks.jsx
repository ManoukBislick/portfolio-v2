import { cn } from '@/lib/utils';
import { site } from '@/lib/site';
import { Icon } from '@/components/atoms';

export default function SocialLinks({
	links = site.socials,
	tone = 'dark',
	className,
}) {
	return (
		<ul className={cn('flex items-center gap-3', className)}>
			{links.map((link) => (
				<li key={link.href}>
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={link.label}
						className={cn(
							'grid size-11 place-items-center rounded-full border transition-colors duration-500',
							tone === 'dark'
								? 'border-sage-900/15 text-sage-800 hover:border-sage-900 hover:bg-sage-900 hover:text-cream-50'
								: 'border-cream-50/20 text-cream-100 hover:border-cream-50 hover:bg-cream-50 hover:text-sage-950',
						)}
					>
						<Icon name={link.icon} className="size-[1.1rem]" />
					</a>
				</li>
			))}
		</ul>
	);
}

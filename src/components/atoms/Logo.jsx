import Link from 'next/link';
import { cn } from '@/lib/utils';
import { site } from '@/lib/site';

export default function Logo({ className, onClick }) {
	return (
		<Link
			href="/"
			onClick={onClick}
			className={cn(
				'group inline-flex items-baseline font-serif text-2xl tracking-tight',
				className,
			)}
			aria-label={`${site.name} — home`}
		>
			<span>{site.shortName}</span>
			<em className="text-sage-500 transition-transform duration-700 ease-[var(--ease-calm)] group-hover:-translate-y-1">
				.
			</em>
		</Link>
	);
}

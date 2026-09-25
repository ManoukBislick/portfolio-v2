import Link from 'next/link';
import { cn } from '@/lib/utils';
import { site } from '@/lib/site';

export default function Logo({ className, onClick }) {
	return (
		<Link
			href="/"
			onClick={onClick}
			className={cn(
				'font-serif text-xl tracking-tight text-sage-950 sm:text-2xl',
				className,
			)}
		>
			{site.name}
		</Link>
	);
}

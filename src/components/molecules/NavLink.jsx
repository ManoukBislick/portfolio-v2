'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function isActivePath(pathname, href) {
	if (href === '/') return pathname === '/';
	return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavLink({ href, children, className, onClick }) {
	const pathname = usePathname() || '/';
	const active = isActivePath(pathname, href);

	return (
		<Link
			href={href}
			onClick={onClick}
			aria-current={active ? 'page' : undefined}
			className={cn(
				'link-underline pb-0.5 transition-colors duration-500',
				active ? 'text-sage-950' : 'text-sage-700 hover:text-sage-950',
				className,
			)}
		>
			{children}
		</Link>
	);
}

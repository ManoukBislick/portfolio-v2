'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { site } from '@/lib/site';
import { Logo } from '@/components/atoms';
import { NavLink } from '@/components/molecules';
import { isActivePath } from '@/components/molecules/NavLink';
import { gsap, useGSAP, MOTION_OK } from '@/components/animations/gsap';

export default function SiteHeader() {
	const [open, setOpen] = useState(false);
	const menuRef = useRef(null);
	const menuTl = useRef(null);
	const pathname = usePathname() || '/';

	// Mobile menu: fades in, links rise one after another.
	useGSAP(() => {
		const menu = menuRef.current;
		if (!menu) return;
		const links = menu.querySelectorAll('[data-menu-item]');
		const reduce = !window.matchMedia(MOTION_OK).matches;

		menuTl.current = gsap
			.timeline({ paused: true })
			.set(menu, { display: 'flex' })
			.fromTo(
				menu,
				{ autoAlpha: 0 },
				{ autoAlpha: 1, duration: reduce ? 0 : 0.35, ease: 'power1.out' },
			)
			.fromTo(
				links,
				{ y: reduce ? 0 : 16, autoAlpha: 0 },
				{
					y: 0,
					autoAlpha: 1,
					duration: reduce ? 0 : 0.5,
					stagger: reduce ? 0 : 0.05,
					ease: 'power2.out',
				},
				reduce ? 0 : 0.1,
			);
	});

	useEffect(() => {
		const tl = menuTl.current;
		if (tl) {
			if (open) tl.timeScale(1).play();
			else tl.timeScale(1.6).reverse();
		}
		document.documentElement.style.overflow = open ? 'hidden' : '';

		if (!open) return;
		const onKey = (event) => event.key === 'Escape' && setOpen(false);
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [open]);

	const close = () => setOpen(false);

	return (
		<>
			<header className="relative z-50">
				<a
					href="#main"
					className="sr-only rounded bg-sage-900 px-4 py-2 text-cream-50 focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
				>
					Skip to content
				</a>

				<div className="container-page flex items-center justify-between py-6 sm:py-8">
					<Logo onClick={close} />

					<nav aria-label="Main" className="hidden sm:block">
						<ul className="flex items-center gap-8 text-sm">
							{site.nav.map((item) => (
								<li key={item.href}>
									<NavLink href={item.href}>{item.label}</NavLink>
								</li>
							))}
						</ul>
					</nav>

					<button
						type="button"
						onClick={() => setOpen((value) => !value)}
						aria-expanded={open}
						aria-controls="mobile-menu"
						className="text-sm font-medium text-sage-900 underline decoration-sage-300 underline-offset-[6px] sm:hidden"
					>
						{open ? 'Close' : 'Menu'}
					</button>
				</div>
			</header>

			<div
				ref={menuRef}
				id="mobile-menu"
				className="fixed inset-0 z-40 hidden flex-col bg-cream-50 px-5 pt-28 pb-10 sm:hidden"
				aria-hidden={!open}
				inert={!open}
			>
				<nav aria-label="Mobile">
					<ul className="flex flex-col gap-2">
						{site.nav.map((item) => {
							const active = isActivePath(pathname, item.href);
							return (
								<li key={item.href}>
									<Link
										href={item.href}
										onClick={close}
										data-menu-item=""
										aria-current={active ? 'page' : undefined}
										className={cn(
											'block py-1 font-serif text-4xl',
											active ? 'text-sage-600' : 'text-sage-950',
										)}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
		</>
	);
}

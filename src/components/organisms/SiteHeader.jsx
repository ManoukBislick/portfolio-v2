'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { site } from '@/lib/site';
import { Button, Icon, Logo, StatusDot } from '@/components/atoms';
import { NavLink, SocialLinks } from '@/components/molecules';
import { isActivePath } from '@/components/molecules/NavLink';
import {
	gsap,
	ScrollTrigger,
	useGSAP,
	EASE,
} from '@/components/animations/gsap';

export default function SiteHeader() {
	const [open, setOpen] = useState(false);
	const headerRef = useRef(null);
	const menuRef = useRef(null);
	const menuTl = useRef(null);
	const openRef = useRef(false);
	const pathname = usePathname() || '/';

	useGSAP(
		() => {
			const header = headerRef.current;
			const menu = menuRef.current;
			if (!header || !menu) return;

			// Hide the header while scrolling down, bring it back when scrolling up.
			let hidden = false;
			const setHidden = (value) => {
				if (value === hidden) return;
				hidden = value;
				gsap.to(header, {
					yPercent: value ? -120 : 0,
					duration: 0.7,
					ease: 'power3.out',
					overwrite: true,
				});
			};
			const trigger = ScrollTrigger.create({
				start: 0,
				end: 'max',
				onUpdate: (self) => {
					const y = self.scroll();
					header.dataset.scrolled = y > 24 ? 'true' : 'false';
					if (openRef.current) return setHidden(false);
					setHidden(self.direction === 1 && y > 220);
				},
			});

			// Full-screen menu: a soft circle that opens from the menu button.
			const tl = gsap
				.timeline({ paused: true })
				.set(menu, { display: 'flex' })
				.fromTo(
					menu,
					{ clipPath: 'circle(0% at calc(100% - 2.75rem) 2.75rem)' },
					{
						clipPath: 'circle(150% at calc(100% - 2.75rem) 2.75rem)',
						duration: 0.9,
						ease: 'power3.inOut',
					},
				)
				.fromTo(
					menu.querySelectorAll('[data-menu-item]'),
					{ yPercent: 110, opacity: 0 },
					{ yPercent: 0, opacity: 1, duration: 0.9, ease: EASE, stagger: 0.06 },
					0.35,
				);

			menuTl.current = tl;
			return () => trigger.kill();
		},
		{ scope: headerRef },
	);

	useEffect(() => {
		openRef.current = open;
		const tl = menuTl.current;
		if (tl) {
			// Close a little faster than it opens; near-instant when motion is reduced.
			const reduce = window.matchMedia(
				'(prefers-reduced-motion: reduce)',
			).matches;
			const speed = reduce ? 8 : 1;
			if (open) tl.timeScale(speed).play();
			else tl.timeScale(speed * 1.8).reverse();
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
			<header
				ref={headerRef}
				data-scrolled="false"
				className="group/header fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-700 data-[scrolled=true]:bg-cream-50/80 data-[scrolled=true]:shadow-[0_1px_0_rgba(37,52,39,0.06)] data-[scrolled=true]:backdrop-blur-md"
			>
				<a
					href="#main"
					className="sr-only rounded-full bg-sage-900 px-4 py-2 text-cream-50 focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70]"
				>
					Skip to content
				</a>

				<div className="container-page flex items-center justify-between py-4 sm:py-5">
					<Logo className="relative z-[60]" onClick={close} />

					<nav aria-label="Main" className="hidden md:block">
						<ul className="flex items-center gap-8 rounded-full border border-sage-900/8 bg-cream-50/60 px-7 py-3 text-sm backdrop-blur-md">
							{site.nav.map((item) => (
								<li key={item.href}>
									<NavLink href={item.href}>{item.label}</NavLink>
								</li>
							))}
						</ul>
					</nav>

					<div className="hidden md:block">
						<Button
							href="/contact"
							variant="secondary"
							icon="arrow-up-right"
							className="py-2.5!"
						>
							Let&apos;s talk
						</Button>
					</div>

					<button
						type="button"
						onClick={() => setOpen((value) => !value)}
						aria-expanded={open}
						aria-controls="mobile-menu"
						aria-label={open ? 'Close menu' : 'Open menu'}
						className={cn(
							'relative z-[60] grid size-12 place-items-center rounded-full border transition-colors duration-500 md:hidden',
							open
								? 'border-sage-900 bg-sage-900 text-cream-50'
								: 'border-sage-900/15 bg-cream-50/70 text-sage-900 backdrop-blur-md',
						)}
					>
						<Icon name={open ? 'close' : 'menu'} className="size-5" />
					</button>
				</div>
			</header>

			<div
				ref={menuRef}
				id="mobile-menu"
				className="fixed inset-0 z-40 hidden flex-col justify-between overflow-y-auto bg-cream-100 px-5 pt-28 pb-10 sm:px-8 md:hidden"
				aria-hidden={!open}
				inert={!open}
			>
				<nav aria-label="Mobile">
					<ul className="flex flex-col gap-1">
						{site.nav.map((item, index) => {
							const active = isActivePath(pathname, item.href);
							return (
								<li key={item.href} className="overflow-hidden">
									<Link
										href={item.href}
										onClick={close}
										data-menu-item=""
										aria-current={active ? 'page' : undefined}
										className="flex items-baseline gap-4 py-1 font-serif text-5xl text-sage-950 sm:text-6xl"
									>
										<span className="font-sans text-xs text-sage-500">
											0{index + 1}
										</span>
										<span className={cn(active && 'italic text-sage-600')}>
											{item.label}
										</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				<div className="flex flex-col gap-6 overflow-hidden">
					<p
						data-menu-item=""
						className="inline-flex items-center gap-3 text-sm text-sage-700"
					>
						<StatusDot /> Open to new projects
					</p>
					<div data-menu-item="">
						<a
							href={`mailto:${site.email}`}
							className="font-serif text-2xl text-sage-900 link-underline"
						>
							{site.email}
						</a>
					</div>
					<div data-menu-item="">
						<SocialLinks />
					</div>
				</div>
			</div>
		</>
	);
}

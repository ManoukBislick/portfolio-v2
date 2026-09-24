'use client';

import { Fragment, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/atoms';
import { gsap, useGSAP, MOTION_OK } from '@/components/animations/gsap';

/** An endless, slow ribbon of words. Slows to a crawl on hover. */
export default function Marquee({ items = [], speed = 40, className, attrs }) {
	const ref = useRef(null);
	const trackRef = useRef(null);

	useGSAP(
		() => {
			const track = trackRef.current;
			if (!track) return;
			const mm = gsap.matchMedia();

			mm.add(MOTION_OK, () => {
				const loop = gsap.to(track, {
					xPercent: -50,
					duration: speed,
					ease: 'none',
					repeat: -1,
				});
				const slow = () =>
					gsap.to(loop, { timeScale: 0.2, duration: 1.2, ease: 'power2.out' });
				const resume = () =>
					gsap.to(loop, { timeScale: 1, duration: 1.2, ease: 'power2.inOut' });
				const el = ref.current;
				el.addEventListener('pointerenter', slow);
				el.addEventListener('pointerleave', resume);
				return () => {
					el.removeEventListener('pointerenter', slow);
					el.removeEventListener('pointerleave', resume);
				};
			});

			return () => mm.revert();
		},
		{ scope: ref, dependencies: [items.length, speed] },
	);

	if (!items.length) return null;

	const row = (hidden) => (
		<ul
			className="flex shrink-0 items-center"
			aria-hidden={hidden || undefined}
		>
			{items.map((item, index) => (
				<Fragment key={`${item}-${index}`}>
					<li className="px-6 font-serif text-4xl whitespace-nowrap text-sage-900 italic sm:px-10 sm:text-6xl">
						{item}
					</li>
					<li aria-hidden="true" className="text-sage-400">
						<Icon name="sparkle" className="size-5 sm:size-6" />
					</li>
				</Fragment>
			))}
		</ul>
	);

	return (
		<section
			ref={ref}
			aria-label="Things I love working with"
			className={cn(
				'relative overflow-hidden border-y border-sage-900/8 bg-sage-50 py-8 sm:py-10',
				className,
			)}
			{...attrs}
		>
			<div ref={trackRef} className="flex w-max">
				{row(false)}
				{row(true)}
			</div>
			<span
				aria-hidden="true"
				className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-sage-50"
			/>
			<span
				aria-hidden="true"
				className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-sage-50"
			/>
		</section>
	);
}

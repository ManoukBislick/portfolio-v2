'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap, useGSAP, MOTION_OK, markGsapReady } from './gsap';

const STEM = 'M80 355 C 78 300, 88 250, 78 200 S 84 90, 80 20';

const LEAVES = [
	'M79 300 C 58 292, 42 274, 38 252 C 58 256, 74 272, 79 300 Z',
	'M81 262 C 102 254, 118 236, 122 214 C 102 218, 86 234, 81 262 Z',
	'M79 222 C 60 214, 46 198, 42 178 C 60 182, 74 196, 79 222 Z',
	'M80 182 C 98 174, 112 158, 115 140 C 98 144, 85 158, 80 182 Z',
	'M80 142 C 64 136, 52 122, 49 106 C 64 109, 76 122, 80 142 Z',
	'M80 106 C 94 100, 104 88, 107 74 C 94 77, 84 88, 80 106 Z',
	'M80 22 C 72 30, 70 44, 80 56 C 90 44, 88 30, 80 22 Z',
];

/**
 * A hand-drawn branch that grows itself: the stem draws first,
 * then each leaf unfurls and softly fills with colour.
 */
export default function BotanicalLine({
	className,
	onLoad = false,
	delay = 0.3,
	flip = false,
	leafFill = 'var(--color-sage-100)',
}) {
	const ref = useRef(null);

	useGSAP(
		() => {
			markGsapReady();
			const svg = ref.current;
			if (!svg) return;
			const mm = gsap.matchMedia();

			mm.add(MOTION_OK, () => {
				const stem = svg.querySelector('[data-stem]');
				const leaves = svg.querySelectorAll('[data-leaf]');

				gsap.set([stem, ...leaves], { drawSVG: '0%' });
				gsap.set(leaves, { fillOpacity: 0 });
				gsap.set(svg, { autoAlpha: 1 });

				const tl = gsap.timeline({
					delay,
					scrollTrigger: onLoad
						? undefined
						: { trigger: svg, start: 'top 85%', once: true },
				});

				tl.to(stem, { drawSVG: '100%', duration: 2.6, ease: 'power2.inOut' })
					.to(
						leaves,
						{
							drawSVG: '100%',
							duration: 1.6,
							ease: 'power2.out',
							stagger: 0.16,
						},
						0.5,
					)
					.to(
						leaves,
						{ fillOpacity: 1, duration: 1.8, ease: 'sine.out', stagger: 0.12 },
						1.4,
					);
			});

			return () => mm.revert();
		},
		{ scope: ref },
	);

	return (
		<svg
			ref={ref}
			data-reveal=""
			viewBox="0 0 160 360"
			fill="none"
			aria-hidden="true"
			className={cn('text-sage-500', flip && '-scale-x-100', className)}
		>
			<path
				data-stem=""
				d={STEM}
				stroke="currentColor"
				strokeWidth="1.2"
				strokeLinecap="round"
			/>
			{LEAVES.map((d) => (
				<path
					key={d}
					data-leaf=""
					d={d}
					stroke="currentColor"
					strokeWidth="1.2"
					strokeLinejoin="round"
					fill={leafFill}
				/>
			))}
		</svg>
	);
}

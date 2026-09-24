'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap, useGSAP, MOTION_OK, markGsapReady } from './gsap';

/**
 * Unveils an image from the bottom up while it settles from a slight zoom —
 * like a curtain being drawn open slowly.
 */
export default function ImageReveal({
	children,
	className,
	delay = 0,
	duration = 1.8,
	onLoad = false,
	start = 'top 85%',
	...rest
}) {
	const ref = useRef(null);

	useGSAP(
		() => {
			markGsapReady();
			const el = ref.current;
			if (!el) return;
			const inner = el.firstElementChild;
			const mm = gsap.matchMedia();

			mm.add(MOTION_OK, () => {
				gsap.set(el, { autoAlpha: 1 });
				const tl = gsap.timeline({
					delay,
					scrollTrigger: onLoad
						? undefined
						: { trigger: el, start, once: true },
				});
				tl.fromTo(
					el,
					{ clipPath: 'inset(100% 0% 0% 0%)' },
					{
						clipPath: 'inset(0% 0% 0% 0%)',
						duration,
						ease: 'expo.inOut',
						// Remove the clip afterwards so rounded corners and shadows render normally.
						clearProps: 'clipPath',
					},
				);
				if (inner) {
					tl.fromTo(
						inner,
						{ scale: 1.25 },
						{ scale: 1, duration: duration + 0.6, ease: 'expo.out' },
						0,
					);
				}
			});

			return () => mm.revert();
		},
		{ scope: ref },
	);

	return (
		<div
			ref={ref}
			data-reveal=""
			className={cn('overflow-hidden', className)}
			{...rest}
		>
			{children}
		</div>
	);
}

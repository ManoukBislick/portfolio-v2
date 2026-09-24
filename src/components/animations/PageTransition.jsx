'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK, markGsapReady } from './gsap';

/** Soft fade-and-rise every time a new page mounts. */
export default function PageTransition({ children }) {
	const ref = useRef(null);

	useGSAP(
		() => {
			markGsapReady();
			const el = ref.current;
			if (!el) return;
			const mm = gsap.matchMedia();
			mm.add(MOTION_OK, () => {
				gsap.fromTo(
					el,
					{ opacity: 0, y: 14 },
					{
						opacity: 1,
						y: 0,
						duration: 1,
						ease: 'power2.out',
						clearProps: 'transform',
					},
				);
			});
			mm.add('(prefers-reduced-motion: reduce)', () => {
				gsap.set(el, { opacity: 1 });
			});
			return () => mm.revert();
		},
		{ scope: ref },
	);

	return (
		<div ref={ref} data-page="">
			{children}
		</div>
	);
}

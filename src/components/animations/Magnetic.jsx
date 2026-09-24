'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from './gsap';

/** Gently pulls its child towards the pointer. Only on fine pointers. */
export default function Magnetic({ children, strength = 0.25, className }) {
	const ref = useRef(null);

	useGSAP(
		() => {
			const el = ref.current;
			if (!el) return;
			const mm = gsap.matchMedia();

			mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
				const xTo = gsap.quickTo(el, 'x', {
					duration: 0.8,
					ease: 'power3.out',
				});
				const yTo = gsap.quickTo(el, 'y', {
					duration: 0.8,
					ease: 'power3.out',
				});

				const onMove = (event) => {
					const rect = el.getBoundingClientRect();
					xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
					yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
				};
				const onLeave = () => {
					xTo(0);
					yTo(0);
				};

				el.addEventListener('pointermove', onMove);
				el.addEventListener('pointerleave', onLeave);
				return () => {
					el.removeEventListener('pointermove', onMove);
					el.removeEventListener('pointerleave', onLeave);
				};
			});

			return () => mm.revert();
		},
		{ scope: ref },
	);

	return (
		<span ref={ref} className={className ?? 'inline-block'}>
			{children}
		</span>
	);
}

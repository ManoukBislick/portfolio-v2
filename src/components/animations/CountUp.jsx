'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from './gsap';

/**
 * Counts the leading number of a value ("40+", "8 yrs") up from zero
 * when it scrolls into view. Non-numeric values are shown as-is.
 */
export default function CountUp({ value, className }) {
	const ref = useRef(null);
	const text = String(value ?? '');
	const match = text.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);

	useGSAP(
		() => {
			const el = ref.current;
			if (!el || !match) return;
			const [, prefix, number, suffix] = match;
			const target = Number(number.replace(',', '.'));
			const decimals = number.includes('.') || number.includes(',') ? 1 : 0;
			const mm = gsap.matchMedia();

			mm.add(MOTION_OK, () => {
				const counter = { value: 0 };
				el.textContent = `${prefix}0${suffix}`;
				gsap.to(counter, {
					value: target,
					duration: 2.2,
					ease: 'power2.out',
					scrollTrigger: { trigger: el, start: 'top 90%', once: true },
					onUpdate: () => {
						el.textContent = `${prefix}${counter.value.toFixed(decimals)}${suffix}`;
					},
				});
				return () => {
					el.textContent = text;
				};
			});

			return () => mm.revert();
		},
		{ scope: ref, dependencies: [text] },
	);

	return (
		<span ref={ref} className={className}>
			{text}
		</span>
	);
}

'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from './gsap';

/** A slow, breathing up-and-down drift — like a leaf on water. */
export default function Float({
	as: Tag = 'div',
	children,
	className,
	amount = 12,
	rotate = 1.5,
	duration = 4.5,
	delay = 0,
	...rest
}) {
	const ref = useRef(null);

	useGSAP(
		() => {
			const el = ref.current;
			if (!el) return;
			const mm = gsap.matchMedia();
			mm.add(MOTION_OK, () => {
				gsap.to(el, {
					y: -amount,
					rotation: rotate,
					duration,
					delay,
					ease: 'sine.inOut',
					yoyo: true,
					repeat: -1,
				});
			});
			return () => mm.revert();
		},
		{ scope: ref },
	);

	return (
		<Tag ref={ref} className={className} {...rest}>
			{children}
		</Tag>
	);
}

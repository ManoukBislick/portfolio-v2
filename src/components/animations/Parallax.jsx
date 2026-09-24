'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from './gsap';

/** Drifts its content slowly against the scroll direction. */
export default function Parallax({
	as: Tag = 'div',
	children,
	className,
	speed = 12,
	...rest
}) {
	const ref = useRef(null);

	useGSAP(
		() => {
			const el = ref.current;
			if (!el) return;
			const mm = gsap.matchMedia();
			mm.add(MOTION_OK, () => {
				gsap.fromTo(
					el,
					{ yPercent: -speed / 2 },
					{
						yPercent: speed / 2,
						ease: 'none',
						scrollTrigger: {
							trigger: el,
							start: 'top bottom',
							end: 'bottom top',
							scrub: 0.8,
						},
					},
				);
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

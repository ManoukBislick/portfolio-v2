'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK, EASE, markGsapReady } from './gsap';

/**
 * Fades and lifts its content into view once it scrolls into the viewport.
 * Pass `stagger` to reveal the direct children one after another instead.
 */
export default function Reveal({
	as: Tag = 'div',
	children,
	className,
	delay = 0,
	y = 32,
	duration = 1.3,
	stagger,
	start = 'top 88%',
	onLoad = false,
	...rest
}) {
	const ref = useRef(null);

	useGSAP(
		() => {
			markGsapReady();
			const el = ref.current;
			if (!el) return;

			const mm = gsap.matchMedia();
			mm.add(MOTION_OK, () => {
				const targets = stagger ? Array.from(el.children) : el;
				if (stagger) gsap.set(el, { autoAlpha: 1 });

				gsap.fromTo(
					targets,
					{ autoAlpha: 0, y },
					{
						autoAlpha: 1,
						y: 0,
						duration,
						delay,
						ease: EASE,
						stagger: stagger || 0,
						scrollTrigger: onLoad
							? undefined
							: { trigger: el, start, once: true },
					},
				);
			});

			return () => mm.revert();
		},
		{ scope: ref },
	);

	return (
		<Tag ref={ref} data-reveal="" className={className} {...rest}>
			{children}
		</Tag>
	);
}

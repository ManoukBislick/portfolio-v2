'use client';

import { useRef } from 'react';
import {
	gsap,
	SplitText,
	useGSAP,
	MOTION_OK,
	EASE,
	markGsapReady,
} from './gsap';

/**
 * Reveals text line by line, each line rising out of its own mask.
 * Works with nested markup such as <em> accents.
 */
export default function SplitReveal({
	as: Tag = 'h2',
	children,
	className,
	delay = 0,
	stagger = 0.1,
	duration = 1.4,
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
				gsap.set(el, { autoAlpha: 1 });

				const split = SplitText.create(el, {
					type: 'words,lines',
					mask: 'lines',
					linesClass: 'split-line',
					autoSplit: true,
					onSplit(self) {
						return gsap.from(self.lines, {
							yPercent: 105,
							duration,
							delay,
							stagger,
							ease: EASE,
							scrollTrigger: onLoad
								? undefined
								: { trigger: el, start, once: true },
						});
					},
				});

				return () => split.revert();
			});

			return () => mm.revert();
		},
		{ scope: ref },
	);

	return (
		<Tag ref={ref} data-split="" className={className} {...rest}>
			{children}
		</Tag>
	);
}

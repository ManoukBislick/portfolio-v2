'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap, useGSAP, MOTION_OK } from './gsap';

/** A vertical line that fills up while you scroll past its parent. */
export default function ScrollLine({ className }) {
	const ref = useRef(null);

	useGSAP(
		() => {
			const line = ref.current;
			if (!line) return;
			const mm = gsap.matchMedia();
			mm.add(MOTION_OK, () => {
				gsap.fromTo(
					line,
					{ scaleY: 0 },
					{
						scaleY: 1,
						ease: 'none',
						transformOrigin: 'top center',
						scrollTrigger: {
							trigger: line.parentElement.parentElement,
							start: 'top 75%',
							end: 'bottom 55%',
							scrub: 0.6,
						},
					},
				);
			});
			return () => mm.revert();
		},
		{ scope: ref },
	);

	return (
		<span
			aria-hidden="true"
			className={cn(
				'absolute top-2 bottom-2 left-0 w-px bg-sage-200',
				className,
			)}
		>
			<span ref={ref} className="absolute inset-0 origin-top bg-sage-500" />
		</span>
	);
}

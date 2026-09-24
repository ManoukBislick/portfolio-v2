'use client';

import { useId, useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap, useGSAP, MOTION_OK } from './gsap';

/** A circular text badge that turns slowly, like a record on low speed. */
export default function RotatingBadge({
	text = 'Frontend developer · Calm websites · ',
	className,
	children,
}) {
	const ref = useRef(null);
	const id = useId().replace(/:/g, '');

	useGSAP(
		() => {
			const ring = ref.current?.querySelector('[data-ring]');
			if (!ring) return;
			const mm = gsap.matchMedia();
			mm.add(MOTION_OK, () => {
				gsap.to(ring, {
					rotation: 360,
					duration: 36,
					ease: 'none',
					repeat: -1,
					transformOrigin: '50% 50%',
				});
			});
			return () => mm.revert();
		},
		{ scope: ref },
	);

	return (
		<div
			ref={ref}
			className={cn(
				'relative grid size-32 place-items-center rounded-full bg-cream-50/90 text-sage-800 shadow-[0_20px_60px_-30px_rgba(37,52,39,0.45)] backdrop-blur-sm',
				className,
			)}
		>
			<svg
				viewBox="0 0 120 120"
				className="absolute inset-0 size-full"
				aria-hidden="true"
			>
				<defs>
					<path
						id={`ring-${id}`}
						d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
					/>
				</defs>
				<g data-ring="">
					<text className="fill-current text-[9.5px] tracking-[0.22em] uppercase">
						<textPath href={`#ring-${id}`} textLength="272">
							{text}
						</textPath>
					</text>
				</g>
			</svg>
			<span className="relative">{children}</span>
		</div>
	);
}

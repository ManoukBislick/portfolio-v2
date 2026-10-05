'use client';

import { useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/atoms';
import { SectionHeader } from '@/components/molecules';
import {
	gsap,
	Draggable,
	useGSAP,
	MOTION_OK,
	markGsapReady,
} from '@/components/animations/gsap';

/** A small coloured dot per group, in order. The stickers themselves all look the same. */
const DOTS = [
	'bg-sage-500',
	'bg-blush-300',
	'bg-sage-900',
	'bg-cream-50 ring-1 ring-sage-500',
];

/**
 * Skills as calm, rounded stickers, grouped and marked with a coloured dot.
 * They fade in when you scroll to them, can be dragged around and glide
 * back, and the buttons above highlight one group at a time.
 */
export default function Skills({
	title,
	intro,
	groups = [],
	attrs,
	className,
}) {
	const [active, setActive] = useState(null);
	const board = useRef(null);

	const stickers = useMemo(
		() =>
			groups.flatMap((group, groupIndex) =>
				group.skills.map((skill) => ({
					key: `${group.id ?? group.title}-${skill}`,
					skill,
					group: group.title,
					groupIndex,
					dot: DOTS[groupIndex % DOTS.length],
				})),
			),
		[groups],
	);

	useGSAP(
		() => {
			markGsapReady();
			const el = board.current;
			if (!el) return;
			const items = el.querySelectorAll('[data-sticker]');
			const mm = gsap.matchMedia();

			mm.add(MOTION_OK, () => {
				gsap.set(el, { autoAlpha: 1 });
				gsap.from(items, {
					y: 16,
					autoAlpha: 0,
					duration: 0.9,
					ease: 'power2.out',
					stagger: 0.03,
					scrollTrigger: { trigger: el, start: 'top 85%', once: true },
				});
			});

			// Drag a sticker and let go: it glides back to its spot.
			mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
				const draggables = Draggable.create(items, {
					zIndexBoost: true,
					onRelease() {
						gsap.to(this.target, {
							x: 0,
							y: 0,
							duration: 0.9,
							ease: 'power3.out',
						});
					},
				});
				return () => draggables.forEach((draggable) => draggable.kill());
			});

			return () => mm.revert();
		},
		{ scope: board },
	);

	const toggle = (index) =>
		setActive((current) => (current === index ? null : index));

	return (
		<section className={cn('py-12 sm:py-16', className)} {...attrs}>
			<Container>
				<SectionHeader title={title} intro={intro} />

				<div
					role="group"
					aria-label="Highlight a group of skills"
					className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm"
				>
					{groups.map((group, index) => (
						<button
							key={group.id ?? group.title}
							type="button"
							onClick={() => toggle(index)}
							aria-pressed={active === index}
							className={cn(
								'inline-flex items-center gap-2 transition-colors duration-300',
								active === index
									? 'text-sage-950'
									: 'text-sage-600 hover:text-sage-950',
							)}
							{...group.attrs}
						>
							<span
								aria-hidden="true"
								className={cn(
									'size-2.5 rounded-full transition-transform duration-300',
									DOTS[index % DOTS.length],
									active === index && 'scale-150',
								)}
							/>
							<span
								className={cn(
									'underline-offset-[6px]',
									active === index && 'underline decoration-sage-400',
								)}
							>
								{group.title}
							</span>
						</button>
					))}
				</div>

				<ul ref={board} data-reveal="" className="mt-8 flex flex-wrap gap-2.5">
					{stickers.map((sticker) => {
						const dimmed = active !== null && active !== sticker.groupIndex;
						return (
							<li
								key={sticker.key}
								data-sticker=""
								className="relative [@media(hover:hover)]:cursor-grab [@media(hover:hover)]:active:cursor-grabbing"
							>
								<span
									className={cn(
										'flex items-center gap-2 rounded-full px-4 py-2 text-sm ring-1 ring-sage-900/10 transition-[background-color,opacity,translate] duration-500 ease-[var(--ease-calm)] ring-inset select-none hover:-translate-y-0.5',
										active === sticker.groupIndex
											? 'bg-sage-100 text-sage-950'
											: 'bg-cream-100 text-sage-900',
										dimmed && 'opacity-35',
									)}
								>
									<span
										aria-hidden="true"
										className={cn('size-1.5 rounded-full', sticker.dot)}
									/>
									<span className="sr-only">{sticker.group}: </span>
									{sticker.skill}
								</span>
							</li>
						);
					})}
				</ul>

				<p className="mt-6 hidden text-xs text-sage-600 motion-reduce:hidden! [@media(hover:hover)]:block">
					You can drag them around.
				</p>
			</Container>
		</section>
	);
}

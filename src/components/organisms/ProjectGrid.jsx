'use client';

import { useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ProjectCard } from '@/components/molecules';
import {
	gsap,
	Flip,
	useGSAP,
	MOTION_OK,
	markGsapReady,
} from '@/components/animations/gsap';

const ALL = 'All';
const ASPECTS = ['portrait', 'landscape', 'landscape', 'portrait'];

/**
 * The full project overview with calm tag filters.
 * Cards glide to their new place with GSAP Flip when the filter changes.
 */
export default function ProjectGrid({
	projects = [],
	showFilter = true,
	emptyText,
	className,
}) {
	const [active, setActive] = useState(ALL);
	const gridRef = useRef(null);
	const flipState = useRef(null);

	const tags = useMemo(() => {
		const all = new Set();
		projects.forEach((project) => project.tags?.forEach((tag) => all.add(tag)));
		return [ALL, ...Array.from(all).sort((a, b) => a.localeCompare(b))];
	}, [projects]);

	const visible =
		active === ALL
			? projects
			: projects.filter((project) => project.tags?.includes(active));

	// First reveal on scroll.
	useGSAP(
		() => {
			markGsapReady();
			const grid = gridRef.current;
			if (!grid) return;
			const mm = gsap.matchMedia();
			mm.add(MOTION_OK, () => {
				gsap.set(grid, { autoAlpha: 1 });
				gsap.fromTo(
					grid.children,
					{ autoAlpha: 0, y: 48 },
					{
						autoAlpha: 1,
						y: 0,
						duration: 1.4,
						ease: 'expo.out',
						stagger: 0.12,
						scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
					},
				);
			});
			return () => mm.revert();
		},
		{ scope: gridRef },
	);

	// Animate from the previous layout to the new one after each filter change.
	useGSAP(
		() => {
			if (!flipState.current || !gridRef.current) return;
			const reduce = window.matchMedia(
				'(prefers-reduced-motion: reduce)',
			).matches;
			Flip.from(flipState.current, {
				targets: gridRef.current.children,
				duration: reduce ? 0 : 0.9,
				ease: 'power3.inOut',
				absolute: true,
				stagger: 0.04,
				onEnter: (elements) =>
					gsap.fromTo(
						elements,
						{ autoAlpha: 0, scale: 0.96 },
						{ autoAlpha: 1, scale: 1, duration: 0.8, delay: 0.2 },
					),
			});
			flipState.current = null;
		},
		{ dependencies: [active], scope: gridRef },
	);

	const choose = (tag) => {
		if (tag === active || !gridRef.current) return;
		flipState.current = Flip.getState(gridRef.current.children);
		setActive(tag);
	};

	if (!projects.length) {
		return (
			<div
				className={cn(
					'rounded-[2rem] border border-dashed border-sage-900/15 p-12 text-center',
					className,
				)}
			>
				<p className="font-serif text-3xl">Fresh projects are growing here.</p>
				<p className="mt-3 text-sage-700">
					{emptyText ||
						'Add a project in Storyblok (folder “projects”) and it will appear here.'}
				</p>
			</div>
		);
	}

	return (
		<div className={className}>
			{showFilter && tags.length > 2 ? (
				<div
					role="group"
					aria-label="Filter projects"
					className="mb-12 flex flex-wrap gap-2.5"
				>
					{tags.map((tag) => (
						<button
							key={tag}
							type="button"
							onClick={() => choose(tag)}
							aria-pressed={active === tag}
							className={cn(
								'rounded-full border px-4 py-2 text-sm transition-colors duration-500',
								active === tag
									? 'border-sage-800 bg-sage-800 text-cream-50'
									: 'border-sage-900/15 text-sage-800 hover:border-sage-900/40',
							)}
						>
							{tag}
						</button>
					))}
				</div>
			) : null}

			<div
				ref={gridRef}
				data-reveal=""
				className="grid gap-x-10 gap-y-16 md:grid-cols-2"
			>
				{visible.map((project, index) => (
					<div
						key={project.id}
						data-flip-id={project.id}
						className={cn(index % 2 === 1 && 'md:mt-24')}
					>
						<ProjectCard
							{...project}
							aspect={ASPECTS[index % ASPECTS.length]}
							priority={index < 2}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

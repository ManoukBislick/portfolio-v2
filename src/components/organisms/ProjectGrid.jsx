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

/**
 * All projects with a tag filter.
 * Cards glide to their new place with GSAP Flip when the filter changes.
 */
export default function ProjectGrid({
	projects = [],
	showFilter = true,
	emptyText = 'No projects yet.',
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
					{ autoAlpha: 0, y: 24 },
					{
						autoAlpha: 1,
						y: 0,
						duration: 0.9,
						ease: 'power2.out',
						stagger: 0.08,
						scrollTrigger: { trigger: grid, start: 'top 90%', once: true },
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
			const reduce = !window.matchMedia(MOTION_OK).matches;
			Flip.from(flipState.current, {
				targets: gridRef.current.children,
				duration: reduce ? 0 : 0.6,
				ease: 'power2.inOut',
				absolute: true,
				onEnter: (elements) =>
					gsap.fromTo(
						elements,
						{ autoAlpha: 0 },
						{ autoAlpha: 1, duration: 0.4, delay: 0.2 },
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
		return <p className={cn('text-sage-700', className)}>{emptyText}</p>;
	}

	return (
		<div className={className}>
			{showFilter && tags.length > 2 ? (
				<div
					role="group"
					aria-label="Filter projects"
					className="mb-10 flex flex-wrap gap-x-5 gap-y-2 text-sm"
				>
					{tags.map((tag) => (
						<button
							key={tag}
							type="button"
							onClick={() => choose(tag)}
							aria-pressed={active === tag}
							className={cn(
								'underline-offset-[6px] transition-colors duration-300',
								active === tag
									? 'text-sage-950 underline decoration-sage-600'
									: 'text-sage-600 hover:text-sage-950',
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
				className="grid gap-x-8 gap-y-12 md:grid-cols-2"
			>
				{visible.map((project, index) => (
					<div key={project.id} data-flip-id={project.id}>
						<ProjectCard {...project} priority={index < 2} />
					</div>
				))}
			</div>
		</div>
	);
}

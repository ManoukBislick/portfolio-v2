'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { ProjectCard } from '@/components/molecules';
import {
	gsap,
	useGSAP,
	MOTION_OK,
	markGsapReady,
} from '@/components/animations/gsap';

/** All projects in a two-column grid that reveals on scroll. */
export default function ProjectGrid({
	projects = [],
	emptyText = 'No projects yet.',
	className,
}) {
	const gridRef = useRef(null);

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

	if (!projects.length) {
		return <p className={cn('text-sage-700', className)}>{emptyText}</p>;
	}

	return (
		<div
			ref={gridRef}
			data-reveal=""
			className={cn('grid gap-x-8 gap-y-12 md:grid-cols-2', className)}
		>
			{projects.map((project, index) => (
				<div key={project.id}>
					<ProjectCard {...project} priority={index < 2} />
				</div>
			))}
		</div>
	);
}

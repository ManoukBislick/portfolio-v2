import { storyblokEditable } from '@storyblok/react/rsc';
import { getFeaturedProjects } from '@/lib/content';
import { FeaturedProjects } from '@/components/organisms';

/** Loads its own projects: the ones picked in Storyblok, or the featured ones. */
export default async function FeaturedProjectsBlok({ blok }) {
	const uuids = (Array.isArray(blok.projects) ? blok.projects : [])
		.map((item) => (typeof item === 'string' ? item : item?.uuid))
		.filter(Boolean);
	const projects = await getFeaturedProjects({
		uuids,
		limit: Number.parseInt(blok.count, 10) || 2,
	});

	return (
		<FeaturedProjects
			attrs={storyblokEditable(blok)}
			title={blok.title}
			intro={blok.intro}
			linkLabel={blok.link_label}
			projects={projects.map(({ gallery, ...card }) => card)}
		/>
	);
}

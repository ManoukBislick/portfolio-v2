import { storyblokEditable } from '@storyblok/react/rsc';
import { PageHero } from '@/components/organisms';

export default function PageHeroBlok({ blok }) {
	return (
		<PageHero
			attrs={storyblokEditable(blok)}
			eyebrow={blok.eyebrow}
			title={blok.title}
			intro={blok.intro}
		/>
	);
}

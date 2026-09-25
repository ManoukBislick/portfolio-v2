import { storyblokEditable } from '@storyblok/react/rsc';
import { PageHero } from '@/components/organisms';

export default function PageHeroBlok({ blok }) {
	return (
		<PageHero
			attrs={storyblokEditable(blok)}
			title={blok.title}
			intro={blok.intro}
		/>
	);
}

import { storyblokEditable } from '@storyblok/react/rsc';
import { resolveLink, toImage } from '@/lib/utils';
import { Hero } from '@/components/organisms';

export default function HeroBlok({ blok }) {
	return (
		<Hero
			attrs={storyblokEditable(blok)}
			headline={blok.headline}
			intro={blok.intro}
			images={(blok.images ?? [])
				.map((image) => toImage(image))
				.filter(Boolean)}
			actions={(blok.buttons ?? []).map((button) => ({
				key: button._uid,
				label: button.label,
				href: resolveLink(button.link),
				variant: button.style || 'primary',
				attrs: storyblokEditable(button),
			}))}
		/>
	);
}

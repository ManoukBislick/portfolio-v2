import { storyblokEditable } from '@storyblok/react/rsc';
import { resolveLink } from '@/lib/utils';
import { Hero } from '@/components/organisms';

export default function HeroBlok({ blok }) {
	return (
		<Hero
			attrs={storyblokEditable(blok)}
			availability={blok.availability}
			eyebrow={blok.eyebrow}
			headline={blok.headline}
			intro={blok.intro}
			images={blok.images}
			badge={blok.badge_text || undefined}
			primary={{
				label: blok.primary_label,
				href: resolveLink(blok.primary_link),
			}}
			secondary={{
				label: blok.secondary_label,
				href: resolveLink(blok.secondary_link),
			}}
		/>
	);
}

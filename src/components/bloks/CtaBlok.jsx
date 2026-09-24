import { storyblokEditable } from '@storyblok/react/rsc';
import { resolveLink } from '@/lib/utils';
import { CallToAction } from '@/components/organisms';

export default function CtaBlok({ blok }) {
	return (
		<CallToAction
			attrs={storyblokEditable(blok)}
			title={blok.title}
			text={blok.text}
			button={{ label: blok.button_label, href: resolveLink(blok.button_link) }}
		/>
	);
}

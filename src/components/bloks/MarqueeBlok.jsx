import { storyblokEditable } from '@storyblok/react/rsc';
import { toList } from '@/lib/utils';
import { Marquee } from '@/components/organisms';

export default function MarqueeBlok({ blok }) {
	return <Marquee attrs={storyblokEditable(blok)} items={toList(blok.items)} />;
}

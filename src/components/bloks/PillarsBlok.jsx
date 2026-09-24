import { storyblokEditable } from '@storyblok/react/rsc';
import { Pillars } from '@/components/organisms';

export default function PillarsBlok({ blok }) {
	const items = (blok.items ?? []).map((item) => ({
		id: item._uid,
		icon: item.icon,
		title: item.title,
		text: item.text,
		attrs: storyblokEditable(item),
	}));
	return (
		<Pillars
			attrs={storyblokEditable(blok)}
			eyebrow={blok.eyebrow}
			title={blok.title}
			intro={blok.intro}
			items={items}
		/>
	);
}

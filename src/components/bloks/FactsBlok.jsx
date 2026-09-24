import { storyblokEditable } from '@storyblok/react/rsc';
import { Facts } from '@/components/organisms';

export default function FactsBlok({ blok }) {
	const items = (blok.items ?? []).map((item) => ({
		id: item._uid,
		value: item.value,
		label: item.label,
		attrs: storyblokEditable(item),
	}));
	return <Facts attrs={storyblokEditable(blok)} items={items} />;
}

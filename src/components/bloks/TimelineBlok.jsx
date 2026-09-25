import { storyblokEditable } from '@storyblok/react/rsc';
import { Timeline } from '@/components/organisms';

export default function TimelineBlok({ blok }) {
	return (
		<Timeline
			attrs={storyblokEditable(blok)}
			title={blok.title}
			intro={blok.intro}
			items={(blok.items ?? []).map((item) => ({
				id: item._uid,
				period: item.period,
				title: item.title,
				place: item.place,
				description: item.description,
				attrs: storyblokEditable(item),
			}))}
		/>
	);
}

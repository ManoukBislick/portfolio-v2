import { storyblokEditable } from '@storyblok/react/rsc';
import { toList } from '@/lib/utils';
import { Skills } from '@/components/organisms';

export default function SkillsBlok({ blok }) {
	const groups = (blok.groups ?? []).map((group) => ({
		id: group._uid,
		title: group.title,
		skills: toList(group.skills),
		attrs: storyblokEditable(group),
	}));
	return (
		<Skills
			attrs={storyblokEditable(blok)}
			eyebrow={blok.eyebrow}
			title={blok.title}
			intro={blok.intro}
			groups={groups}
		/>
	);
}

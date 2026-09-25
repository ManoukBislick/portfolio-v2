import { storyblokEditable } from '@storyblok/react/rsc';
import { Skills } from '@/components/organisms';

const lines = (value = '') =>
	String(value)
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean);

export default function SkillsBlok({ blok }) {
	return (
		<Skills
			attrs={storyblokEditable(blok)}
			title={blok.title}
			intro={blok.intro}
			groups={(blok.groups ?? []).map((group) => ({
				id: group._uid,
				title: group.title,
				skills: lines(group.skills),
				attrs: storyblokEditable(group),
			}))}
		/>
	);
}

import { storyblokEditable } from '@storyblok/react/rsc';
import { toImage } from '@/lib/utils';
import { TextImage } from '@/components/organisms';
import RichText from './RichText';

export default function TextImageBlok({ blok }) {
	return (
		<TextImage
			attrs={storyblokEditable(blok)}
			title={blok.title}
			image={toImage(blok.image)}
			caption={blok.caption}
			reverse={Boolean(blok.reverse)}
			body={<RichText document={blok.body} />}
		/>
	);
}

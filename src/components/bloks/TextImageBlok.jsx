import { storyblokEditable } from '@storyblok/react/rsc';
import { RichText, TextImage } from '@/components/organisms';

export default function TextImageBlok({ blok }) {
	return (
		<TextImage
			attrs={storyblokEditable(blok)}
			eyebrow={blok.eyebrow}
			title={blok.title}
			image={
				blok.image?.filename
					? blok.image
					: { filename: '/images/placeholders/portrait-2.svg', alt: '' }
			}
			caption={blok.caption}
			reverse={Boolean(blok.reverse)}
			body={<RichText document={blok.body} />}
		/>
	);
}

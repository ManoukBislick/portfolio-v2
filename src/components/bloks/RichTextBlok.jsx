import { storyblokEditable } from '@storyblok/react/rsc';
import { Container } from '@/components/atoms';
import Reveal from '@/components/animations/Reveal';
import RichText from './RichText';

/** A section with just text, in the same narrow column as an article. */
export default function RichTextBlok({ blok }) {
	return (
		<section className="py-12 sm:py-16" {...storyblokEditable(blok)}>
			<Container narrow>
				<Reveal>
					<RichText document={blok.body} />
				</Reveal>
			</Container>
		</section>
	);
}

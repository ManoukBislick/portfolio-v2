import { storyblokEditable } from '@storyblok/react/rsc';
import { Container } from '@/components/atoms';
import { SectionHeader } from '@/components/molecules';
import { RichText } from '@/components/organisms';
import Reveal from '@/components/animations/Reveal';

/** A simple text section for flexible pages (privacy policy, colophon, …). */
export default function RichTextBlok({ blok }) {
	return (
		<section className="py-12 sm:py-16" {...storyblokEditable(blok)}>
			<Container narrow className="flex flex-col gap-10">
				{blok.title ? (
					<SectionHeader eyebrow={blok.eyebrow} title={blok.title} size="xl" />
				) : null}
				<Reveal>
					<RichText document={blok.body} />
				</Reveal>
			</Container>
		</section>
	);
}

import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

/** Content type `page`: a stack of section bloks. */
export default function Page({ blok }) {
	return (
		<div {...storyblokEditable(blok)}>
			{blok.body?.map((nestedBlok) => (
				<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
			))}
		</div>
	);
}

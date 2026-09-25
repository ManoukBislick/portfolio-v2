import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

/** Content type `page`: the sections of the page, top to bottom. */
export default function PageBlok({ blok }) {
	return (
		<div {...storyblokEditable(blok)}>
			{blok.body?.map((section) => (
				<StoryblokServerComponent blok={section} key={section._uid} />
			))}
		</div>
	);
}

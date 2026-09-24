import { StoryblokServerRichText } from '@storyblok/react/rsc';
import { cn } from '@/lib/utils';

function hasText(doc) {
	return Boolean(
		doc?.content?.some(
			(node) =>
				node.content?.length || node.type === 'blok' || node.type === 'image',
		),
	);
}

/** Renders a Storyblok rich text document with the calm long-form typography. */
export default function RichText({ document, className }) {
	if (!hasText(document)) return null;
	return (
		<StoryblokServerRichText
			document={document}
			className={cn('prose-calm', className)}
		/>
	);
}

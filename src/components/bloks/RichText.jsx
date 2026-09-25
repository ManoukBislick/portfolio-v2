import Link from 'next/link';
import { StoryblokServerRichText } from '@storyblok/react/rsc';
import { cn, hasRichText, isExternal } from '@/lib/utils';

/** Links in rich text: pages on this site open normally, other sites in a new tab. */
function RichLink({ attrs = {}, children }) {
	const { href = '', linktype, anchor } = attrs;
	if (linktype === 'story') {
		const path = String(href || '')
			.replace(/^\/?/, '/')
			.replace(/\/$/, '');
		const target = !path || path === '/home' ? '/' : path;
		return (
			<Link href={anchor ? `${target}#${anchor}` : target}>{children}</Link>
		);
	}
	if (linktype === 'email') return <a href={`mailto:${href}`}>{children}</a>;
	if (isExternal(href)) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer">
				{children}
			</a>
		);
	}
	return <a href={href}>{children}</a>;
}

/** A Storyblok rich text field with the long-form typography of the site. */
export default function RichText({ document, className }) {
	if (!hasRichText(document)) return null;
	return (
		<div className={cn('prose-calm', className)}>
			<StoryblokServerRichText
				document={document}
				wrapper={false}
				components={{ link: RichLink }}
			/>
		</div>
	);
}

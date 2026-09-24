import { site } from './site';

/** Build Next.js metadata from a Storyblok story's SEO fields, with sensible defaults. */
export function storyMetadata(
	story,
	{ title, description, path = '/', image } = {},
) {
	const c = story?.content ?? {};
	const finalTitle = c.seo_title || title;
	const finalDescription = c.seo_description || description || site.description;
	const ogImage = image?.filename || image;

	return {
		title: finalTitle,
		description: finalDescription,
		alternates: { canonical: path },
		openGraph: {
			title: finalTitle ? `${finalTitle} — ${site.name}` : site.name,
			description: finalDescription,
			url: path,
			siteName: site.name,
			type: 'website',
			...(ogImage && ogImage.startsWith('http')
				? { images: [{ url: ogImage }] }
				: {}),
		},
	};
}

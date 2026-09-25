import { site } from './site';

/** Build Next.js metadata for a page, with sensible defaults. */
export function pageMetadata({
	title,
	description,
	path = '/',
	image,
	type = 'website',
	publishedTime,
} = {}) {
	const finalDescription = description || site.description;
	const imageUrl = typeof image === 'string' ? image : image?.src;
	// Open Graph images must be raster files; skip SVGs.
	const ogImage =
		imageUrl && !/\.svg($|\?)/.test(imageUrl) ? imageUrl : undefined;

	return {
		title,
		description: finalDescription,
		alternates: { canonical: path },
		openGraph: {
			title: title ? `${title} — ${site.name}` : site.name,
			description: finalDescription,
			url: path,
			siteName: site.name,
			type,
			...(publishedTime ? { publishedTime } : {}),
			...(ogImage ? { images: [{ url: ogImage }] } : {}),
		},
	};
}

/**
 * Metadata for a `page` story: the SEO fields from Storyblok, otherwise the
 * title of the page intro. The homepage keeps the default site title.
 */
export function pageStoryMetadata(story, path) {
	const c = story?.content ?? {};
	const intro = c.body?.find((blok) => blok.component === 'page_hero');
	const fallbackTitle = path === '/' ? undefined : intro?.title || story?.name;
	return pageMetadata({
		title: c.seo_title || fallbackTitle?.replace(/\*/g, ''),
		description: c.seo_description || intro?.intro,
		path,
	});
}

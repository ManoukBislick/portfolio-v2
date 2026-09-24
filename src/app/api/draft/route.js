import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { env } from '@/lib/env';
import { slugToPath } from '@/lib/utils';

/**
 * Entry point for the Storyblok Visual Editor in production.
 * Set the preview URL in Storyblok to:
 *   https://<your-domain>/api/draft?secret=<STORYBLOK_PREVIEW_SECRET>&slug=
 * Storyblok appends the story slug; we enable Draft Mode and forward
 * all `_storyblok*` parameters so live editing keeps working.
 */
export async function GET(request) {
	const url = new URL(request.url);
	const secret = url.searchParams.get('secret');

	if (
		!env('STORYBLOK_PREVIEW_SECRET') ||
		secret !== env('STORYBLOK_PREVIEW_SECRET')
	) {
		return new Response('Invalid preview secret', { status: 401 });
	}

	const path = slugToPath(url.searchParams.get('slug') || '');
	url.searchParams.delete('secret');
	url.searchParams.delete('slug');

	(await draftMode()).enable();

	const query = url.searchParams.toString();
	redirect(query ? `${path}?${query}` : path);
}

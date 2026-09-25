import { createHash, timingSafeEqual } from 'node:crypto';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { env } from '@/lib/env';

/**
 * Opens the live site in draft mode for the Storyblok Visual Editor.
 * Preview URL in Storyblok: https://<your-domain>/api/draft?slug=
 *
 * Storyblok signs every preview request with the space's preview token,
 * so only the Visual Editor can switch draft mode on.
 */
function isSignedByStoryblok(params) {
	const token = env('STORYBLOK_DELIVERY_API_TOKEN');
	const spaceId = params.get('_storyblok_tk[space_id]');
	const timestamp = params.get('_storyblok_tk[timestamp]');
	const signature = params.get('_storyblok_tk[token]');
	if (!token || !spaceId || !timestamp || !signature) return false;

	const expected = createHash('sha1')
		.update(`${spaceId}:${token}:${timestamp}`)
		.digest('hex');
	const fresh = Number(timestamp) > Date.now() / 1000 - 3600;
	return (
		fresh &&
		expected.length === signature.length &&
		timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
	);
}

export async function GET(request) {
	const url = new URL(request.url);

	// Storyblok adds its own "?…" to the preview URL, which can end up inside `slug`.
	const [slug = '', extra = ''] = (url.searchParams.get('slug') ?? '').split(
		'?',
	);
	const params = new URLSearchParams(url.search);
	params.delete('slug');
	params.delete('secret');
	new URLSearchParams(extra).forEach((value, key) => params.append(key, value));

	const secret = env('STORYBLOK_PREVIEW_SECRET');
	const allowed =
		isSignedByStoryblok(params) ||
		(secret && url.searchParams.get('secret') === secret);
	if (!allowed) return new Response('Not allowed', { status: 401 });

	(await draftMode()).enable();

	const path = slug.replace(/^\/+|\/+$/g, '');
	const target = !path || path === 'home' ? '/' : `/${path}`;
	const query = params.toString();
	redirect(query ? `${target}?${query}` : target);
}

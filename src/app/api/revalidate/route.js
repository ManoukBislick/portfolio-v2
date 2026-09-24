import { revalidatePath } from 'next/cache';
import { env } from '@/lib/env';

/**
 * Storyblok webhook: refresh the whole site whenever content is published.
 * Webhook URL in Storyblok (Settings → Webhooks, "Story published & unpublished"):
 *   https://<your-domain>/api/revalidate?secret=<STORYBLOK_WEBHOOK_SECRET>
 */
export async function POST(request) {
	const secret = new URL(request.url).searchParams.get('secret');
	if (
		!env('STORYBLOK_WEBHOOK_SECRET') ||
		secret !== env('STORYBLOK_WEBHOOK_SECRET')
	) {
		return Response.json(
			{ revalidated: false, message: 'Invalid secret' },
			{ status: 401 },
		);
	}

	const payload = await request.json().catch(() => ({}));
	revalidatePath('/', 'layout');

	return Response.json({
		revalidated: true,
		story: payload?.full_slug ?? null,
		at: Date.now(),
	});
}

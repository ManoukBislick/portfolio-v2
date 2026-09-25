import { revalidatePath } from 'next/cache';
import { env } from '@/lib/env';

/**
 * Storyblok webhook: refreshes the site as soon as you publish something.
 * In Storyblok, Settings → Webhooks, trigger "Story published & unpublished":
 *   https://<your-domain>/api/revalidate?secret=<STORYBLOK_WEBHOOK_SECRET>
 * Without the webhook, changes show up within an hour.
 */
export async function POST(request) {
	const secret = env('STORYBLOK_WEBHOOK_SECRET');
	if (!secret || new URL(request.url).searchParams.get('secret') !== secret) {
		return Response.json({ revalidated: false }, { status: 401 });
	}

	const payload = await request.json().catch(() => ({}));
	revalidatePath('/', 'layout');

	return Response.json({
		revalidated: true,
		story: payload?.full_slug ?? null,
	});
}

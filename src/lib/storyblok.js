import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import FallbackBlok from '@/components/bloks/FallbackBlok';
import { env } from './env';

const token = env('STORYBLOK_DELIVERY_API_TOKEN');
const baseUrl = env('STORYBLOK_API_BASE_URL');

/** True when a delivery token is set in .env.local (or on Vercel). */
export const isStoryblokConfigured = Boolean(token);

/**
 * The Storyblok API client. The token is only used on the server.
 * Blok components are registered in src/components/bloks/registry.js.
 */
export const getStoryblokApi = storyblokInit({
	accessToken: token,
	use: isStoryblokConfigured ? [apiPlugin] : [],
	enableFallbackComponent: true,
	customFallbackComponent: FallbackBlok,
	apiOptions: {
		region: env('STORYBLOK_REGION') || 'eu',
		// Spaces made with the Storyblok blueprint pass their API address this way.
		endpoint: baseUrl ? `${new URL(baseUrl).origin}/v2` : undefined,
		// Next.js does the caching (see src/lib/content.js).
		cache: { type: 'none', cv: 'manual' },
	},
});

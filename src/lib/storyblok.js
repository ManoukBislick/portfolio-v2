import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import FallbackBlok from '@/components/bloks/FallbackBlok';
import { env } from './env';

const token = env('STORYBLOK_DELIVERY_API_TOKEN');

/** True when a real delivery token is configured (not the .env.example placeholder). */
export const isStoryblokConfigured = Boolean(token);

/**
 * The Storyblok API client. Blok components are registered separately in
 * src/components/bloks/registry.js, so data fetching never imports page UI.
 */
export const getStoryblokApi = storyblokInit({
	accessToken: token,
	use: isStoryblokConfigured ? [apiPlugin] : [],
	enableFallbackComponent: true,
	customFallbackComponent: FallbackBlok,
	apiOptions: {
		/** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
		region: env('STORYBLOK_REGION') || 'eu',
		/** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
		endpoint: env('STORYBLOK_API_BASE_URL')
			? `${new URL(env('STORYBLOK_API_BASE_URL')).origin}/v2`
			: undefined,
		// Let Next.js handle caching (ISR + on-demand revalidation via webhook).
		cache: { type: 'none', cv: 'manual' },
	},
});

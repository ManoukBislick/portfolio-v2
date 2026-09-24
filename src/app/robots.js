import { site } from '@/lib/site';

export default function robots() {
	return {
		rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
		sitemap: new URL('/sitemap.xml', site.url).toString(),
	};
}

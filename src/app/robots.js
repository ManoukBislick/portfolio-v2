import { site } from '@/lib/site';

export default function robots() {
	return {
		rules: [{ userAgent: '*', allow: '/' }],
		sitemap: new URL('/sitemap.xml', site.url).toString(),
	};
}

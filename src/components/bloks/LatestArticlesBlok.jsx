import { storyblokEditable } from '@storyblok/react/rsc';
import { getArticles } from '@/lib/content';
import { LatestArticles } from '@/components/organisms';

export default async function LatestArticlesBlok({ blok }) {
	const articles = await getArticles();
	return (
		<LatestArticles
			attrs={storyblokEditable(blok)}
			title={blok.title}
			linkLabel={blok.link_label}
			articles={articles.slice(0, Number.parseInt(blok.count, 10) || 3)}
		/>
	);
}

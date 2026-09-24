import { storyblokEditable } from '@storyblok/react/rsc';
import {
	getArticleStories,
	toArticleCard,
	toArticleDetail,
} from '@/lib/content';
import ArticleTemplate from '@/components/templates/ArticleTemplate';

/** Content type `article`: a blog post written in Markdown. */
export default async function ArticleBlok({ blok, meta: story }) {
	const article = toArticleDetail({ ...story, content: blok });
	const all = await getArticleStories();
	const index = all.findIndex((item) => item.slug === story?.slug);
	const newer = index > 0 ? toArticleCard(all[index - 1]) : null;
	const older =
		index >= 0 && index < all.length - 1 ? toArticleCard(all[index + 1]) : null;

	return (
		<ArticleTemplate
			attrs={storyblokEditable(blok)}
			article={article}
			previous={older}
			next={newer}
		/>
	);
}

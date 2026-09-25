import { storyblokEditable } from '@storyblok/react/rsc';
import { getAdjacentArticles, toArticle } from '@/lib/content';
import ArticleTemplate from '@/components/templates/ArticleTemplate';
import RichText from './RichText';

/** Content type `article`: one blog post. */
export default async function ArticleBlok({ blok, meta }) {
	const article = toArticle({ ...meta, content: blok });
	const { newer, older } = await getAdjacentArticles(article.slug);

	return (
		<ArticleTemplate
			attrs={storyblokEditable(blok)}
			article={article}
			body={<RichText document={blok.body} />}
			previous={older}
			next={newer}
		/>
	);
}

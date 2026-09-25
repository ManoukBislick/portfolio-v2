import { storyblokEditable } from '@storyblok/react/rsc';
import { getArticles } from '@/lib/content';
import { Container } from '@/components/atoms';
import { ArticleList } from '@/components/organisms';

/** Every blog post, newest first. */
export default async function ArticleListBlok({ blok }) {
	const articles = await getArticles();

	return (
		<section className="pb-8" {...storyblokEditable(blok)}>
			<Container>
				<ArticleList
					articles={articles}
					emptyText={blok.empty_text || undefined}
					className="border-t border-sage-900/10"
				/>
			</Container>
		</section>
	);
}

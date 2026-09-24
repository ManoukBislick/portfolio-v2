import { storyblokEditable } from '@storyblok/react/rsc';
import { getArticleStories, toArticleCard } from '@/lib/content';
import { Container } from '@/components/atoms';
import { ArticleList } from '@/components/organisms';

export default async function ArticleIndexBlok({ blok }) {
	const articles = (await getArticleStories()).map(toArticleCard);
	return (
		<section className="pb-16 sm:pb-24" {...storyblokEditable(blok)}>
			<Container>
				<ArticleList
					articles={articles}
					featureFirst={blok.feature_first !== false}
				/>
			</Container>
		</section>
	);
}

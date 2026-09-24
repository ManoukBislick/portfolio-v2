import { storyblokEditable } from '@storyblok/react/rsc';
import { getArticleStories, toArticleCard } from '@/lib/content';
import { Button, Container } from '@/components/atoms';
import { SectionHeader } from '@/components/molecules';
import { ArticleList } from '@/components/organisms';

export default async function LatestArticlesBlok({ blok }) {
	const articles = (await getArticleStories())
		.slice(0, Number(blok.count) || 3)
		.map(toArticleCard);
	if (!articles.length) return null;
	return (
		<section className="py-20 sm:py-28" {...storyblokEditable(blok)}>
			<Container>
				<SectionHeader
					eyebrow={blok.eyebrow}
					title={blok.title}
					size="xl"
					action={
						<Button href="/blog" variant="secondary">
							{blok.link_label || 'All articles'}
						</Button>
					}
				/>
				<ArticleList
					articles={articles}
					featureFirst={false}
					className="mt-12"
				/>
			</Container>
		</section>
	);
}

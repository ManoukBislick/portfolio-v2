import { cn } from '@/lib/utils';
import { Button, Container } from '@/components/atoms';
import { SectionHeader } from '@/components/molecules';
import ArticleList from './ArticleList';

/** The most recent blog posts, for the homepage. */
export default function LatestArticles({
	title,
	linkLabel,
	articles = [],
	attrs,
	className,
}) {
	if (!articles.length) return null;

	return (
		<section className={cn('py-12 sm:py-16', className)} {...attrs}>
			<Container>
				<SectionHeader
					title={title}
					action={
						linkLabel ? (
							<Button href="/blog" variant="link" arrow>
								{linkLabel}
							</Button>
						) : null
					}
				/>
				<ArticleList articles={articles} className="mt-2" />
			</Container>
		</section>
	);
}

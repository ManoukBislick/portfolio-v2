import { cn } from '@/lib/utils';
import { ArticleCard } from '@/components/molecules';
import Reveal from '@/components/animations/Reveal';

/** Newest article as a feature, the rest as quiet rows. */
export default function ArticleList({
	articles = [],
	featureFirst = true,
	className,
}) {
	if (!articles.length) {
		return (
			<div
				className={cn(
					'rounded-[2rem] border border-dashed border-sage-900/15 p-12 text-center',
					className,
				)}
			>
				<p className="font-serif text-3xl">The first article is on its way.</p>
				<p className="mt-3 text-sage-700">
					New posts appear here once they are published in Storyblok.
				</p>
			</div>
		);
	}

	const [first, ...rest] = articles;

	return (
		<div className={cn('flex flex-col gap-16', className)}>
			{featureFirst ? (
				<Reveal>
					<ArticleCard {...first} variant="feature" />
				</Reveal>
			) : null}
			{(featureFirst ? rest : articles).length ? (
				<Reveal stagger={0.08} className="border-b border-sage-900/10">
					{(featureFirst ? rest : articles).map((article) => (
						<ArticleCard key={article.id} {...article} />
					))}
				</Reveal>
			) : null}
		</div>
	);
}

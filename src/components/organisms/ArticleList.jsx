import { cn } from '@/lib/utils';
import { ArticleCard } from '@/components/molecules';
import Reveal from '@/components/animations/Reveal';

export default function ArticleList({
	articles = [],
	emptyText = 'No articles yet. The first one is on its way.',
	className,
}) {
	if (!articles.length) {
		return <p className={cn('text-sage-700', className)}>{emptyText}</p>;
	}

	return (
		<Reveal stagger={0.06} className={className}>
			{articles.map((article) => (
				<ArticleCard key={article.id} {...article} />
			))}
		</Reveal>
	);
}

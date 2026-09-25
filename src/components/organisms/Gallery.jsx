import { cn } from '@/lib/utils';
import { Container, Picture } from '@/components/atoms';
import ImageReveal from '@/components/animations/ImageReveal';

/** A relaxed, two-column image gallery where every third image goes wide. */
export default function Gallery({ images = [], className }) {
	const list = images.filter((image) => image?.src);
	if (!list.length) return null;

	return (
		<section className={cn('py-12 sm:py-16', className)}>
			<Container className="grid gap-5 sm:grid-cols-2 sm:gap-8">
				{list.map((image, index) => {
					const wide = index % 3 === 0;
					return (
						<figure key={image.src} className={cn(wide && 'sm:col-span-2')}>
							<ImageReveal
								className={cn(
									'rounded-lg bg-sage-100',
									wide ? 'aspect-[16/9]' : 'aspect-[4/5]',
								)}
							>
								<div className="relative size-full">
									<Picture
										image={image}
										fill
										sizes={
											wide
												? '(min-width: 1280px) 1200px, 100vw'
												: '(min-width: 640px) 50vw, 100vw'
										}
									/>
								</div>
							</ImageReveal>
							{image.caption ? (
								<figcaption className="mt-3 text-sm text-sage-600">
									{image.caption}
								</figcaption>
							) : null}
						</figure>
					);
				})}
			</Container>
		</section>
	);
}

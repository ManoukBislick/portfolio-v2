import { cn } from '@/lib/utils';
import { Container, Picture, withAccents } from '@/components/atoms';
import Reveal from '@/components/animations/Reveal';
import ImageReveal from '@/components/animations/ImageReveal';
import Parallax from '@/components/animations/Parallax';
import SplitReveal from '@/components/animations/SplitReveal';

/** A photo that drifts slightly with the scroll on one side, a heading and some text on the other. */
export default function TextImage({
	title,
	body,
	image,
	caption,
	reverse = false,
	attrs,
	className,
}) {
	return (
		<section className={cn('py-12 sm:py-16', className)} {...attrs}>
			<Container className="grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
				<figure className={cn('w-full max-w-sm', reverse && 'md:order-2')}>
					<Parallax speed={6}>
						<ImageReveal className="aspect-[4/5] rounded-lg bg-sage-100">
							<div className="relative size-full">
								<Picture
									image={image}
									fill
									sizes="(min-width: 768px) 24rem, 90vw"
								/>
							</div>
						</ImageReveal>
					</Parallax>
					{caption ? (
						<figcaption className="mt-3 text-sm text-sage-600">
							{caption}
						</figcaption>
					) : null}
				</figure>

				<div className="flex flex-col gap-5">
					{title ? (
						<SplitReveal className="text-3xl leading-tight sm:text-4xl">
							{withAccents(title)}
						</SplitReveal>
					) : null}
					<Reveal delay={0.15}>{body}</Reveal>
				</div>
			</Container>
		</section>
	);
}

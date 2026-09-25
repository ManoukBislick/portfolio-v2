import { cn } from '@/lib/utils';
import { Container, Picture, withAccents } from '@/components/atoms';
import Reveal from '@/components/animations/Reveal';
import ImageReveal from '@/components/animations/ImageReveal';

/** A photo on one side, a heading and some text on the other. */
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
					<ImageReveal className="aspect-[4/5] rounded-lg bg-sage-100">
						<div className="relative size-full">
							<Picture
								image={image}
								fill
								sizes="(min-width: 768px) 24rem, 90vw"
							/>
						</div>
					</ImageReveal>
					{caption ? (
						<figcaption className="mt-3 text-sm text-sage-600">
							{caption}
						</figcaption>
					) : null}
				</figure>

				<Reveal className="flex flex-col gap-5">
					{title ? (
						<h2 className="text-3xl leading-tight sm:text-4xl">
							{withAccents(title)}
						</h2>
					) : null}
					{body}
				</Reveal>
			</Container>
		</section>
	);
}

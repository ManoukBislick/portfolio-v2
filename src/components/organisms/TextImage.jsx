import { cn } from '@/lib/utils';
import { Container, Eyebrow, SbImage, withAccents } from '@/components/atoms';
import Reveal from '@/components/animations/Reveal';
import SplitReveal from '@/components/animations/SplitReveal';
import ImageReveal from '@/components/animations/ImageReveal';
import Parallax from '@/components/animations/Parallax';

/** A story section: arched photo on one side, heading and rich text on the other. */
export default function TextImage({
	eyebrow,
	title,
	body,
	image,
	caption,
	reverse = false,
	className,
	attrs,
}) {
	return (
		<section className={cn('py-16 sm:py-24', className)} {...attrs}>
			<Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
				<figure
					className={cn(
						'relative mx-auto w-full max-w-md',
						reverse && 'lg:order-2',
					)}
				>
					<span
						aria-hidden="true"
						className="absolute -inset-6 -z-10 rounded-arch bg-sage-100"
					/>
					<Parallax speed={6}>
						<ImageReveal className="rounded-arch aspect-[4/5] bg-sage-100">
							<div className="relative size-full">
								<SbImage
									image={image}
									fill
									sizes="(min-width: 1024px) 28rem, 90vw"
								/>
							</div>
						</ImageReveal>
					</Parallax>
					{caption ? (
						<figcaption className="mt-8 text-center font-serif text-lg text-sage-700 italic">
							{caption}
						</figcaption>
					) : null}
				</figure>

				<div className="flex flex-col gap-6">
					{eyebrow ? (
						<Reveal y={12}>
							<Eyebrow>{eyebrow}</Eyebrow>
						</Reveal>
					) : null}
					{title ? (
						<SplitReveal className="text-4xl leading-[1.05] sm:text-5xl">
							{withAccents(title)}
						</SplitReveal>
					) : null}
					{body ? (
						<Reveal delay={0.15} className="prose-calm">
							{body}
						</Reveal>
					) : null}
				</div>
			</Container>
		</section>
	);
}

import { cn } from '@/lib/utils';
import {
	Button,
	Container,
	Picture,
	Text,
	withAccents,
} from '@/components/atoms';
import Reveal from '@/components/animations/Reveal';
import SplitReveal from '@/components/animations/SplitReveal';
import ImageReveal from '@/components/animations/ImageReveal';
import Parallax from '@/components/animations/Parallax';
import Float from '@/components/animations/Float';
import BotanicalLine from '@/components/animations/BotanicalLine';

const PLACEHOLDERS = [
	{ src: '/images/placeholders/portrait-1.svg', alt: 'Portrait placeholder' },
	{ src: '/images/placeholders/portrait-2.svg', alt: 'Portrait placeholder' },
	{ src: '/images/placeholders/portrait-3.svg', alt: 'Portrait placeholder' },
];

const softShadow = 'shadow-[0_28px_56px_-36px_rgba(22,32,25,0.5)]';

/**
 * Up to three photos: a large arch that drifts with the scroll and two smaller
 * ones that float slowly. Without photos the placeholders fill all three spots.
 */
function HeroPhotos({ images = [] }) {
	const photos = images.filter((image) => image?.src);
	const [main, round, small] = photos.length ? photos : PLACEHOLDERS;

	return (
		<div className="relative mx-auto aspect-[5/6] w-full max-w-md">
			<span
				aria-hidden="true"
				className="absolute inset-[14%] rounded-full bg-sage-200/60 blur-3xl"
			/>

			<BotanicalLine
				onLoad
				delay={0.9}
				className="pointer-events-none absolute top-[24%] -left-[2%] h-[56%] w-auto sm:-left-[12%]"
			/>

			<Parallax speed={8} className="absolute top-0 right-0 w-[72%]">
				<ImageReveal
					onLoad
					delay={0.15}
					className="rounded-arch aspect-[3/4] bg-sage-100"
				>
					<div className="relative size-full">
						<Picture
							image={main}
							fill
							priority
							sizes="(min-width: 768px) 22rem, 72vw"
						/>
					</div>
				</ImageReveal>
			</Parallax>

			{round ? (
				<Float
					amount={10}
					duration={5}
					className="absolute bottom-[8%] left-[2%] w-[42%]"
				>
					<ImageReveal
						onLoad
						delay={0.5}
						className={cn(
							'aspect-square rounded-full border-4 border-cream-50 bg-blush-100',
							softShadow,
						)}
					>
						<div className="relative size-full">
							<Picture
								image={round}
								fill
								sizes="(min-width: 768px) 12rem, 42vw"
							/>
						</div>
					</ImageReveal>
				</Float>
			) : null}

			{small ? (
				<Float
					amount={14}
					duration={6}
					delay={0.8}
					rotate={-2}
					className="absolute right-[4%] -bottom-[2%] w-[30%]"
				>
					<ImageReveal
						onLoad
						delay={0.75}
						className={cn(
							'aspect-[4/5] rounded-lg border-4 border-cream-50 bg-sage-100',
							softShadow,
						)}
					>
						<div className="relative size-full">
							<Picture
								image={small}
								fill
								sizes="(min-width: 768px) 9rem, 30vw"
							/>
						</div>
					</ImageReveal>
				</Float>
			) : null}
		</div>
	);
}

/**
 * Homepage intro: who I am on the left, the photos on the right.
 * `actions` is a list of buttons: { label, href, variant: 'primary' | 'secondary' | 'link' }.
 */
export default function Hero({
	headline,
	intro,
	images = [],
	actions = [],
	attrs,
	className,
}) {
	const links = actions.filter((action) => action?.href && action?.label);

	return (
		<section
			className={cn('pt-6 pb-20 sm:pt-12 sm:pb-28', className)}
			{...attrs}
		>
			<Container className="grid items-center gap-16 md:grid-cols-[1.1fr_1fr] md:gap-12">
				<div className="relative z-10 flex flex-col items-start gap-7">
					<SplitReveal as="h1" onLoad className="text-display">
						{withAccents(headline)}
					</SplitReveal>

					{intro ? (
						<Reveal onLoad delay={0.4}>
							<Text size="lead" className="max-w-lg">
								{intro}
							</Text>
						</Reveal>
					) : null}

					{links.length ? (
						<Reveal
							onLoad
							delay={0.55}
							className="flex flex-wrap items-center gap-6"
						>
							{links.map((action) => (
								<Button
									key={action.key ?? action.href}
									href={action.href}
									variant={action.variant}
									arrow={action.variant === 'link'}
									{...action.attrs}
								>
									{action.label}
								</Button>
							))}
						</Reveal>
					) : null}
				</div>

				<HeroPhotos images={images} />
			</Container>
		</section>
	);
}

import { cn } from '@/lib/utils';
import {
	Button,
	Container,
	Icon,
	SbImage,
	StatusDot,
	Text,
	withAccents,
} from '@/components/atoms';
import Reveal from '@/components/animations/Reveal';
import SplitReveal from '@/components/animations/SplitReveal';
import ImageReveal from '@/components/animations/ImageReveal';
import Float from '@/components/animations/Float';
import Parallax from '@/components/animations/Parallax';
import Magnetic from '@/components/animations/Magnetic';
import BotanicalLine from '@/components/animations/BotanicalLine';
import RotatingBadge from '@/components/animations/RotatingBadge';

const PLACEHOLDERS = [
	{
		filename: '/images/placeholders/portrait-1.svg',
		alt: 'Portrait placeholder',
	},
	{
		filename: '/images/placeholders/portrait-2.svg',
		alt: 'Portrait placeholder',
	},
	{
		filename: '/images/placeholders/portrait-3.svg',
		alt: 'Portrait placeholder',
	},
];

/** Three photos in soft shapes, drifting at different speeds. */
function HeroCollage({ images = [], badge }) {
	const [main, round, small] = [0, 1, 2].map((i) =>
		images[i]?.filename ? images[i] : PLACEHOLDERS[i],
	);

	return (
		<div className="relative mx-auto aspect-[5/6] w-full max-w-[34rem]">
			<span
				aria-hidden="true"
				className="absolute inset-[12%] rounded-full bg-sage-200/70 blur-3xl"
			/>

			<BotanicalLine
				onLoad
				delay={0.6}
				className="absolute top-[26%] -left-[14%] h-[62%] w-auto"
			/>

			<Parallax speed={8} className="absolute top-0 right-0 w-[70%]">
				<ImageReveal
					onLoad
					delay={0.2}
					className="rounded-arch aspect-[3/4] bg-sage-100"
				>
					<div className="relative size-full">
						<SbImage
							image={main}
							fill
							priority
							sizes="(min-width: 1024px) 26rem, 70vw"
						/>
					</div>
				</ImageReveal>
			</Parallax>

			<Float
				amount={10}
				duration={5}
				className="absolute bottom-[6%] left-[2%] w-[44%]"
			>
				<ImageReveal
					onLoad
					delay={0.55}
					className="aspect-square rounded-full border-[6px] border-cream-50 bg-sage-100 shadow-[0_30px_60px_-40px_rgba(22,32,25,0.6)]"
				>
					<div className="relative size-full">
						<SbImage
							image={round}
							fill
							sizes="(min-width: 1024px) 15rem, 44vw"
						/>
					</div>
				</ImageReveal>
			</Float>

			<Float
				amount={14}
				duration={6}
				delay={0.8}
				rotate={-2}
				className="absolute right-[4%] -bottom-[4%] w-[32%]"
			>
				<ImageReveal
					onLoad
					delay={0.8}
					className="aspect-[4/5] rounded-[1.75rem] border-[6px] border-cream-50 bg-blush-100 shadow-[0_30px_60px_-40px_rgba(22,32,25,0.6)]"
				>
					<div className="relative size-full">
						<SbImage
							image={small}
							fill
							sizes="(min-width: 1024px) 11rem, 32vw"
						/>
					</div>
				</ImageReveal>
			</Float>

			<Reveal
				onLoad
				delay={1.2}
				y={16}
				className="absolute top-[8%] left-[4%] hidden sm:block"
			>
				<RotatingBadge text={badge}>
					<Icon name="sprout" className="size-7 text-sage-600" />
				</RotatingBadge>
			</Reveal>
		</div>
	);
}

export default function Hero({
	eyebrow,
	headline,
	intro,
	images,
	availability,
	primary,
	secondary,
	badge,
	className,
	attrs,
}) {
	return (
		<section
			className={cn(
				'relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28',
				className,
			)}
			{...attrs}
		>
			<Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
				<div className="relative z-10 flex flex-col items-start gap-8">
					{availability ? (
						<Reveal onLoad y={12}>
							<p className="inline-flex items-center gap-3 rounded-full border border-sage-900/10 bg-cream-50/70 px-4 py-2 text-sm text-sage-800 backdrop-blur-sm">
								<StatusDot />
								{availability}
							</p>
						</Reveal>
					) : null}

					{eyebrow ? (
						<Reveal onLoad y={12} delay={0.05}>
							<p className="text-sm tracking-[0.2em] text-sage-600 uppercase">
								{eyebrow}
							</p>
						</Reveal>
					) : null}

					<SplitReveal as="h1" onLoad delay={0.15} className="text-display">
						{withAccents(headline)}
					</SplitReveal>

					{intro ? (
						<Reveal onLoad delay={0.55}>
							<Text size="lead" className="max-w-xl">
								{intro}
							</Text>
						</Reveal>
					) : null}

					{primary?.href || secondary?.href ? (
						<Reveal
							onLoad
							delay={0.7}
							className="flex flex-wrap items-center gap-4"
						>
							{primary?.href ? (
								<Magnetic>
									<Button
										href={primary.href}
										size="lg"
										className="max-sm:px-6 max-sm:py-3.5 max-sm:text-sm"
									>
										{primary.label}
									</Button>
								</Magnetic>
							) : null}
							{secondary?.href ? (
								<Button
									href={secondary.href}
									variant="secondary"
									size="lg"
									className="max-sm:px-6 max-sm:py-3.5 max-sm:text-sm"
								>
									{secondary.label}
								</Button>
							) : null}
						</Reveal>
					) : null}
				</div>

				<HeroCollage images={images} badge={badge} />
			</Container>
		</section>
	);
}

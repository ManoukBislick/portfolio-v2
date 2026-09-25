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
import BotanicalLine from '@/components/animations/BotanicalLine';

const PLACEHOLDERS = [
	{ src: '/images/placeholders/portrait-1.svg', alt: 'Portrait placeholder' },
	{ src: '/images/placeholders/portrait-2.svg', alt: 'Portrait placeholder' },
];

/**
 * Homepage intro: who I am on the left, two photos on the right.
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
	const [main, second] = [0, 1].map((i) =>
		images[i]?.src ? images[i] : PLACEHOLDERS[i],
	);
	const links = actions.filter((action) => action?.href && action?.label);

	return (
		<section
			className={cn('pt-6 pb-20 sm:pt-12 sm:pb-28', className)}
			{...attrs}
		>
			<Container className="grid items-center gap-14 md:grid-cols-[1.15fr_1fr] md:gap-12">
				<div className="flex flex-col items-start gap-7">
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

				<div className="relative mx-auto w-full max-w-md pb-10 md:pb-16">
					<Parallax speed={6} className="ml-auto w-[82%]">
						<ImageReveal
							onLoad
							delay={0.15}
							className="rounded-arch aspect-[4/5] bg-sage-100"
						>
							<div className="relative size-full">
								<Picture
									image={main}
									fill
									priority
									sizes="(min-width: 768px) 24rem, 80vw"
								/>
							</div>
						</ImageReveal>
					</Parallax>

					<ImageReveal
						onLoad
						delay={0.5}
						className="absolute bottom-0 left-0 aspect-square w-[42%] rounded-md border-4 border-cream-50 bg-blush-100"
					>
						<div className="relative size-full">
							<Picture
								image={second}
								fill
								sizes="(min-width: 768px) 12rem, 40vw"
							/>
						</div>
					</ImageReveal>

					<BotanicalLine
						onLoad
						delay={0.8}
						className="pointer-events-none absolute top-[10%] left-0 h-44 w-auto sm:h-52"
					/>
				</div>
			</Container>
		</section>
	);
}

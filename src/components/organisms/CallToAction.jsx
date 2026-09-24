import { cn } from '@/lib/utils';
import { Button, Container, Text, withAccents } from '@/components/atoms';
import Reveal from '@/components/animations/Reveal';
import SplitReveal from '@/components/animations/SplitReveal';
import BotanicalLine from '@/components/animations/BotanicalLine';
import Magnetic from '@/components/animations/Magnetic';

export default function CallToAction({
	title,
	text,
	button,
	className,
	attrs,
}) {
	return (
		<section className={cn('py-16 sm:py-24', className)} {...attrs}>
			<Container>
				<div className="relative overflow-hidden rounded-[2.5rem] bg-sage-100 px-6 py-20 text-center sm:px-16 sm:py-28">
					<BotanicalLine className="pointer-events-none absolute -bottom-8 -left-4 h-72 w-auto opacity-80 sm:left-10" />
					<BotanicalLine
						flip
						className="pointer-events-none absolute -top-10 -right-4 hidden h-64 w-auto rotate-180 opacity-80 sm:right-10 sm:block"
					/>
					<div className="relative mx-auto flex max-w-3xl flex-col items-center gap-7">
						<SplitReveal className="text-title">
							{withAccents(title)}
						</SplitReveal>
						{text ? (
							<Reveal delay={0.15}>
								<Text size="lead" className="max-w-xl">
									{text}
								</Text>
							</Reveal>
						) : null}
						{button?.href ? (
							<Reveal delay={0.3}>
								<Magnetic>
									<Button href={button.href} size="lg">
										{button.label}
									</Button>
								</Magnetic>
							</Reveal>
						) : null}
					</div>
				</div>
			</Container>
		</section>
	);
}

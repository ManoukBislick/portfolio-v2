import { cn } from '@/lib/utils';
import { Eyebrow, Text, withAccents } from '@/components/atoms';
import Reveal from '@/components/animations/Reveal';
import SplitReveal from '@/components/animations/SplitReveal';

const headingSizes = {
	display: 'text-display',
	title: 'text-title',
	xl: 'text-4xl sm:text-5xl leading-[1.05]',
};

/** Eyebrow + animated heading + optional intro and action, used by most sections. */
export default function SectionHeader({
	eyebrow,
	title,
	intro,
	action,
	as = 'h2',
	size = 'title',
	align = 'left',
	onLoad = false,
	className,
}) {
	const centered = align === 'center';

	return (
		<div
			className={cn(
				'flex flex-col gap-6',
				centered
					? 'items-center text-center'
					: 'md:flex-row md:items-end md:justify-between',
				className,
			)}
		>
			<div
				className={cn(
					'flex max-w-3xl flex-col gap-5',
					centered && 'items-center',
				)}
			>
				{eyebrow ? (
					<Reveal onLoad={onLoad} y={12}>
						<Eyebrow>{eyebrow}</Eyebrow>
					</Reveal>
				) : null}
				{title ? (
					<SplitReveal as={as} onLoad={onLoad} className={headingSizes[size]}>
						{withAccents(title)}
					</SplitReveal>
				) : null}
				{intro ? (
					<Reveal onLoad={onLoad} delay={0.2}>
						<Text
							size="lead"
							className={cn('max-w-2xl', centered && 'mx-auto')}
						>
							{intro}
						</Text>
					</Reveal>
				) : null}
			</div>
			{action ? (
				<Reveal onLoad={onLoad} delay={0.3} className="shrink-0">
					{action}
				</Reveal>
			) : null}
		</div>
	);
}

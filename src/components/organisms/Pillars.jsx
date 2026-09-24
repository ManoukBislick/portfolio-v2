import { cn } from '@/lib/utils';
import { Container, Icon } from '@/components/atoms';
import { SectionHeader } from '@/components/molecules';
import Reveal from '@/components/animations/Reveal';

/** Three short statements about what I do, each with a small line icon. */
export default function Pillars({
	eyebrow,
	title,
	intro,
	items = [],
	className,
	attrs,
}) {
	return (
		<section className={cn('py-20 sm:py-28', className)} {...attrs}>
			<Container>
				<SectionHeader
					eyebrow={eyebrow}
					title={title}
					intro={intro}
					size="xl"
				/>
				<Reveal stagger={0.12} className="mt-14 grid gap-5 md:grid-cols-3">
					{items.map((item) => (
						<div
							key={item.id}
							{...item.attrs}
							className="group flex flex-col gap-5 rounded-[2rem] border border-sage-900/8 bg-cream-100/60 p-8 transition-colors duration-700 hover:bg-sage-50"
						>
							<span className="grid size-12 place-items-center rounded-full bg-cream-50 text-sage-700 transition-transform duration-700 ease-[var(--ease-calm)] group-hover:-rotate-12">
								<Icon name={item.icon || 'leaf'} />
							</span>
							<h3 className="font-serif text-3xl">{item.title}</h3>
							<p className="text-base leading-relaxed text-sage-800">
								{item.text}
							</p>
						</div>
					))}
				</Reveal>
			</Container>
		</section>
	);
}

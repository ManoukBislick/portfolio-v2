import { cn } from '@/lib/utils';
import { Container } from '@/components/atoms';
import { FactItem } from '@/components/molecules';
import Reveal from '@/components/animations/Reveal';
import CountUp from '@/components/animations/CountUp';

/** A row of small numbers that tell a story. Numbers count up once. */
export default function Facts({ items = [], className, attrs }) {
	if (!items.length) return null;
	return (
		<section className={cn('py-12 sm:py-16', className)} {...attrs}>
			<Container>
				<Reveal
					stagger={0.1}
					className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4"
				>
					{items.map((item) => (
						<FactItem
							key={item.id}
							attrs={item.attrs}
							value={<CountUp value={item.value} />}
							label={item.label}
						/>
					))}
				</Reveal>
			</Container>
		</section>
	);
}

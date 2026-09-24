import { cn } from '@/lib/utils';

export default function FactItem({ value, label, className, attrs }) {
	return (
		<div
			className={cn(
				'flex flex-col gap-2 border-t border-sage-900/10 pt-6',
				className,
			)}
			{...attrs}
		>
			<p className="font-serif text-5xl leading-none text-sage-950 sm:text-6xl">
				{value}
			</p>
			<p className="text-sm text-sage-700">{label}</p>
		</div>
	);
}

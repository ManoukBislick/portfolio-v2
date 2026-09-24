import { cn } from '@/lib/utils';
import Icon from './Icon';

export default function Checkbox({ id, children, className, ...rest }) {
	return (
		<label
			htmlFor={id}
			className={cn(
				'group flex cursor-pointer items-start gap-3 text-sm text-sage-700',
				className,
			)}
		>
			<span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
				<input
					id={id}
					type="checkbox"
					className="peer size-5 cursor-pointer appearance-none rounded-md border border-sage-900/25 bg-cream-50 transition-colors checked:border-sage-800 checked:bg-sage-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-500"
					{...rest}
				/>
				<Icon
					name="check"
					strokeWidth={2}
					className="pointer-events-none absolute size-3.5 text-cream-50 opacity-0 transition-opacity peer-checked:opacity-100"
				/>
			</span>
			<span>{children}</span>
		</label>
	);
}

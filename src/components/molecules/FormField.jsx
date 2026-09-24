import { cn } from '@/lib/utils';

/** Label + control + hint/error, wired up for screen readers. */
export default function FormField({
	id,
	label,
	optional = false,
	hint,
	error,
	className,
	children,
}) {
	return (
		<div className={cn('flex flex-col gap-1', className)}>
			<label
				htmlFor={id}
				className="flex items-baseline justify-between text-[0.7rem] font-medium tracking-[0.2em] text-sage-700 uppercase"
			>
				<span>{label}</span>
				{optional ? (
					<span className="font-light tracking-normal normal-case text-sage-500">
						optional
					</span>
				) : null}
			</label>
			{children}
			{error ? (
				<p
					id={`${id}-error`}
					role="alert"
					className="mt-1 text-sm text-clay-600"
				>
					{error}
				</p>
			) : hint ? (
				<p id={`${id}-hint`} className="mt-1 text-xs text-sage-600">
					{hint}
				</p>
			) : null}
		</div>
	);
}

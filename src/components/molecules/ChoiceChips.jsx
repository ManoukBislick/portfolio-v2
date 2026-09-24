import { cn } from '@/lib/utils';

/** A radio group that looks like a row of soft pill buttons. */
export default function ChoiceChips({
	name,
	legend,
	options = [],
	value,
	onChange,
	className,
	error,
}) {
	return (
		<fieldset
			className={cn('flex flex-col gap-3', className)}
			aria-invalid={error ? 'true' : undefined}
		>
			{legend ? (
				<legend className="mb-3 text-[0.7rem] font-medium tracking-[0.2em] text-sage-700 uppercase">
					{legend}
				</legend>
			) : null}
			<div className="flex flex-wrap gap-2.5">
				{options.map((option) => {
					const id = `${name}-${option.value}`;
					return (
						<label
							key={option.value}
							htmlFor={id}
							className="relative cursor-pointer"
						>
							<input
								id={id}
								type="radio"
								name={name}
								value={option.value}
								checked={value === option.value}
								onChange={() => onChange?.(option.value)}
								className="peer sr-only"
							/>
							<span className="inline-flex items-center gap-2 rounded-full border border-sage-900/15 px-4 py-2.5 text-sm text-sage-800 transition-all duration-500 ease-[var(--ease-calm)] peer-checked:border-sage-800 peer-checked:bg-sage-800 peer-checked:text-cream-50 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sage-500 hover:border-sage-900/40">
								{option.label}
							</span>
						</label>
					);
				})}
			</div>
			{error ? (
				<p role="alert" className="text-sm text-clay-600">
					{error}
				</p>
			) : null}
		</fieldset>
	);
}

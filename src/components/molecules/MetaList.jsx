import { cn } from '@/lib/utils';

/** Key/value details, e.g. year, role and stack of a project. */
export default function MetaList({ items = [], className }) {
	const visible = items.filter(
		(item) => item.value && (!Array.isArray(item.value) || item.value.length),
	);
	if (!visible.length) return null;

	return (
		<dl
			className={cn(
				'grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4',
				className,
			)}
		>
			{visible.map((item) => (
				<div
					key={item.label}
					className="flex flex-col gap-1.5 border-t border-sage-900/10 pt-4"
				>
					<dt className="text-[0.7rem] font-medium tracking-[0.2em] text-sage-600 uppercase">
						{item.label}
					</dt>
					<dd className="text-sm text-sage-900">
						{Array.isArray(item.value) ? item.value.join(', ') : item.value}
					</dd>
				</div>
			))}
		</dl>
	);
}

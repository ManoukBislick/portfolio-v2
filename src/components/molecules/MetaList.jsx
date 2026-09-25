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
				'grid grid-cols-2 gap-x-8 gap-y-5 border-y border-sage-900/10 py-6 md:grid-cols-4',
				className,
			)}
		>
			{visible.map((item) => (
				<div key={item.label} className="flex flex-col gap-1">
					<dt className="text-sm text-sage-600">{item.label}</dt>
					<dd className="text-sage-950">
						{Array.isArray(item.value) ? item.value.join(', ') : item.value}
					</dd>
				</div>
			))}
		</dl>
	);
}

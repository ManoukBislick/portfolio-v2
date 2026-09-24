import { cn } from '@/lib/utils';

/** Small label above headings: a short stem line and spaced capitals. */
export default function Eyebrow({
	as: Tag = 'p',
	className,
	children,
	...rest
}) {
	if (!children) return null;
	return (
		<Tag
			className={cn(
				'inline-flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.24em] text-sage-600 uppercase',
				className,
			)}
			{...rest}
		>
			<span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
			{children}
		</Tag>
	);
}

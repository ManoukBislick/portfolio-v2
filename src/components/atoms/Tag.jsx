import { cn } from '@/lib/utils';

export default function Tag({
	as: Element = 'span',
	className,
	children,
	...rest
}) {
	return (
		<Element
			className={cn(
				'inline-flex items-center rounded bg-sage-100 px-2 py-0.5 text-xs whitespace-nowrap text-sage-800',
				className,
			)}
			{...rest}
		>
			{children}
		</Element>
	);
}

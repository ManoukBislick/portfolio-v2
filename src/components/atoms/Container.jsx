import { cn } from '@/lib/utils';

export default function Container({
	as: Tag = 'div',
	narrow = false,
	className,
	children,
	...rest
}) {
	return (
		<Tag
			className={cn(narrow ? 'container-narrow' : 'container-page', className)}
			{...rest}
		>
			{children}
		</Tag>
	);
}

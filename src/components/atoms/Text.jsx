import { cn } from '@/lib/utils';

const sizes = {
	lead: 'text-lg sm:text-xl leading-relaxed text-sage-800',
	base: 'text-base sm:text-[1.0625rem] leading-relaxed text-sage-800',
	sm: 'text-sm leading-relaxed text-sage-700',
	xs: 'text-xs leading-relaxed text-sage-600',
};

export default function Text({
	as: Tag = 'p',
	size = 'base',
	className,
	children,
	...rest
}) {
	return (
		<Tag className={cn(sizes[size], className)} {...rest}>
			{children}
		</Tag>
	);
}

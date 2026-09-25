import { cn } from '@/lib/utils';

const sizes = {
	lead: 'text-lg leading-relaxed text-sage-800',
	base: 'text-base leading-relaxed text-sage-800',
	sm: 'text-sm leading-relaxed text-sage-700',
};

export default function Text({
	as: Element = 'p',
	size = 'base',
	className,
	children,
	...rest
}) {
	return (
		<Element className={cn(sizes[size], className)} {...rest}>
			{children}
		</Element>
	);
}

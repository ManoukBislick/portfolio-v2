import { cn } from '@/lib/utils';

const tones = {
	outline: 'border border-sage-900/15 text-sage-800',
	soft: 'bg-sage-100 text-sage-800',
	light: 'bg-cream-50/80 text-sage-900 backdrop-blur-sm',
	dark: 'bg-sage-900 text-cream-50',
};

export default function Tag({
	as: Tag = 'span',
	tone = 'outline',
	className,
	children,
	...rest
}) {
	return (
		<Tag
			className={cn(
				'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-normal tracking-wide whitespace-nowrap',
				tones[tone],
				className,
			)}
			{...rest}
		>
			{children}
		</Tag>
	);
}

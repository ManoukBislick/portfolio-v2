import Link from 'next/link';
import { cn, isExternal } from '@/lib/utils';
import Icon from './Icon';

const base =
	'group relative inline-flex items-center justify-center gap-3 rounded-full text-sm font-normal tracking-wide transition-[background-color,color,border-color,box-shadow] duration-500 ease-[var(--ease-calm)] disabled:pointer-events-none disabled:opacity-60';

const variants = {
	primary:
		'bg-sage-900 text-cream-50 hover:bg-sage-700 shadow-[0_12px_30px_-18px_rgba(22,32,25,0.8)]',
	secondary:
		'border border-sage-900/20 bg-transparent text-sage-900 hover:border-sage-900 hover:bg-sage-900 hover:text-cream-50',
	light: 'bg-cream-50 text-sage-950 hover:bg-sage-100',
	ghost: 'px-0! py-0! text-sage-900 hover:text-sage-600',
};

const sizes = {
	md: 'px-6 py-3.5',
	lg: 'px-8 py-4.5 text-base',
};

/**
 * One button for everything: internal links, external links and form buttons.
 * The arrow slides forward on hover to hint at movement without shouting.
 */
export default function Button({
	href,
	variant = 'primary',
	size = 'md',
	icon = 'arrow-right',
	className,
	children,
	...rest
}) {
	const classes = cn(base, variants[variant], sizes[size], className);

	const content = (
		<>
			<span>{children}</span>
			{icon ? (
				<span
					className={cn(
						'relative grid size-6 place-items-center overflow-hidden rounded-full',
						variant === 'primary' && 'bg-cream-50/10',
						variant === 'secondary' &&
							'bg-sage-900/5 group-hover:bg-cream-50/10',
					)}
				>
					<Icon
						name={icon}
						className="size-4 transition-transform duration-500 ease-[var(--ease-calm)] group-hover:translate-x-6"
					/>
					<Icon
						name={icon}
						className="absolute size-4 -translate-x-6 transition-transform duration-500 ease-[var(--ease-calm)] group-hover:translate-x-0"
					/>
				</span>
			) : null}
		</>
	);

	if (href) {
		if (isExternal(href)) {
			const isMail = href.startsWith('mailto:');
			return (
				<a
					href={href}
					className={classes}
					{...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
					{...rest}
				>
					{content}
				</a>
			);
		}
		return (
			<Link href={href} className={classes} {...rest}>
				{content}
			</Link>
		);
	}

	return (
		<button type="button" className={classes} {...rest}>
			{content}
		</button>
	);
}

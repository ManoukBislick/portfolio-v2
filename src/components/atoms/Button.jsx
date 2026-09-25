import Link from 'next/link';
import { cn, isExternal } from '@/lib/utils';

const variants = {
	primary:
		'inline-flex items-center gap-2 rounded-md bg-sage-800 px-5 py-3 text-sm font-medium text-cream-50 transition-colors duration-300 hover:bg-sage-950',
	secondary:
		'inline-flex items-center gap-2 rounded-md border border-sage-900/20 px-5 py-3 text-sm font-medium text-sage-900 transition-colors duration-300 hover:border-sage-900/50 hover:bg-sage-50',
	link: 'inline-flex items-center gap-1.5 text-sm font-medium text-sage-900 underline decoration-sage-300 underline-offset-[6px] transition-colors duration-300 hover:decoration-sage-800',
};

/** Links and buttons in three flavours: a solid button, an outlined one and a text link. */
export default function Button({
	href,
	variant = 'primary',
	arrow = false,
	className,
	children,
	...rest
}) {
	const classes = cn(variants[variant], className);
	const content = (
		<>
			{children}
			{arrow ? <span aria-hidden="true">→</span> : null}
		</>
	);

	if (href && isExternal(href)) {
		return (
			<a
				href={href}
				className={classes}
				target="_blank"
				rel="noopener noreferrer"
				{...rest}
			>
				{content}
			</a>
		);
	}
	if (href) {
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

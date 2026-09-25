import { Fragment } from 'react';
import { cn } from '@/lib/utils';

const sizes = {
	display: 'text-display',
	title: 'text-title',
	xl: 'text-4xl sm:text-5xl leading-[1.05]',
	lg: 'text-3xl sm:text-4xl leading-tight',
	md: 'text-2xl sm:text-3xl leading-snug',
	sm: 'text-xl sm:text-2xl leading-snug',
};

/**
 * Turns `*word*` into an italic serif accent, so editors can add
 * emphasis in plain text: "I build *calm* websites".
 */
export function withAccents(text, accentClassName = 'text-sage-600') {
	if (typeof text !== 'string') return text;
	const parts = text.split(/\*(.+?)\*/g);
	const TRAILING = /^[,.;:!?’'”)]+/;

	return parts.map((part, index) => {
		if (index % 2 === 0) {
			// Punctuation right after an accent is kept inside it (see below).
			const previousWasAccent = index > 0;
			const rest = previousWasAccent ? part.replace(TRAILING, '') : part;
			return <Fragment key={index}>{rest}</Fragment>;
		}
		// Keep "calm," together so the comma never wraps onto its own line.
		const trailing = parts[index + 1]?.match(TRAILING)?.[0] ?? '';
		return (
			<em key={index} className="whitespace-nowrap not-italic">
				<span className={cn('italic', accentClassName)}>{part}</span>
				{trailing}
			</em>
		);
	});
}

export default function Heading({
	as: Tag = 'h2',
	size = 'xl',
	className,
	children,
	accentClassName,
	...rest
}) {
	return (
		<Tag className={cn(sizes[size], className)} {...rest}>
			{withAccents(children, accentClassName)}
		</Tag>
	);
}

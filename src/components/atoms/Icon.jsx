import { cn } from '@/lib/utils';

const paths = {
	'arrow-right': <path d="M5 12h14m-6-6 6 6-6 6" />,
	'arrow-left': <path d="M19 12H5m6 6-6-6 6-6" />,
	'arrow-up-right': <path d="M7 17 17 7M8 7h9v9" />,
	leaf: (
		<>
			<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" />
			<path d="M5 19c3-3 6-6 9-10" />
		</>
	),
	sprout: (
		<>
			<path d="M12 21v-8" />
			<path d="M12 13c0-4-3-6-7-6 0 4 3 6 7 6Z" />
			<path d="M12 11c0-4 3-7 7-7 0 4-3 7-7 7Z" />
		</>
	),
	sparkle: (
		<path d="M12 3c.6 4.5 2.5 6.4 7 7-4.5.6-6.4 2.5-7 7-.6-4.5-2.5-6.4-7-7 4.5-.6 6.4-2.5 7-7Z" />
	),
	mail: (
		<>
			<rect x="3" y="5" width="18" height="14" rx="3" />
			<path d="m4 7 8 6 8-6" />
		</>
	),
	linkedin: (
		<>
			<rect x="3" y="3" width="18" height="18" rx="4" />
			<path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
		</>
	),
	github: (
		<path d="M9 19c-4 1.5-4-2-6-2.5m12 5V18a3.4 3.4 0 0 0-1-2.6c3.2-.4 6.5-1.6 6.5-7A5.4 5.4 0 0 0 19 4.6 5 5 0 0 0 18.9 1S17.7.6 15 2.5a13.4 13.4 0 0 0-7 0C5.3.6 4.1 1 4.1 1A5 5 0 0 0 4 4.6a5.4 5.4 0 0 0-1.5 3.8c0 5.4 3.3 6.6 6.5 7A3.4 3.4 0 0 0 8 18v3.5" />
	),
	instagram: (
		<>
			<rect x="3" y="3" width="18" height="18" rx="5" />
			<circle cx="12" cy="12" r="4" />
			<path d="M17.5 6.5v.01" />
		</>
	),
	menu: <path d="M4 8h16M4 16h16" />,
	close: <path d="M6 6l12 12M18 6 6 18" />,
	check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
	pin: (
		<>
			<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
			<circle cx="12" cy="9.5" r="2.5" />
		</>
	),
	clock: (
		<>
			<circle cx="12" cy="12" r="9" />
			<path d="M12 7v5l3 2" />
		</>
	),
	code: <path d="m9 8-4 4 4 4m6-8 4 4-4 4" />,
	layers: (
		<>
			<path d="m12 3 9 5-9 5-9-5 9-5Z" />
			<path d="m3 13 9 5 9-5" />
		</>
	),
	heart: (
		<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
	),
	send: <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" />,
};

/** Line icons drawn on a 24px grid with a soft 1.5px stroke. */
export default function Icon({ name, className, strokeWidth = 1.5, title }) {
	const glyph = paths[name];
	if (!glyph) return null;

	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn('size-5 shrink-0', className)}
			aria-hidden={title ? undefined : 'true'}
			role={title ? 'img' : undefined}
		>
			{title ? <title>{title}</title> : null}
			{glyph}
		</svg>
	);
}

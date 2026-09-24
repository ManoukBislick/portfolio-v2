import { cn } from '@/lib/utils';

/** A small breathing dot — used for availability. */
export default function StatusDot({ className }) {
	return (
		<span
			aria-hidden="true"
			className={cn('relative inline-flex size-2.5', className)}
		>
			<span className="absolute inset-0 animate-breathe rounded-full bg-sage-400 motion-reduce:animate-none" />
			<span className="relative inline-flex size-2.5 rounded-full bg-sage-500" />
		</span>
	);
}

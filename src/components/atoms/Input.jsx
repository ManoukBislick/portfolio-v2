import { cn } from '@/lib/utils';

export const fieldClasses =
	'peer block w-full rounded-none border-0 border-b border-sage-900/20 bg-transparent px-0 py-3 text-lg font-light text-sage-950 placeholder:text-sage-400 transition-colors duration-500 focus:border-sage-700 focus:outline-none focus:ring-0 aria-invalid:border-clay-600';

export default function Input({ className, ...rest }) {
	return <input className={cn(fieldClasses, className)} {...rest} />;
}

import { cn } from '@/lib/utils';
import { fieldClasses } from './Input';

export default function Textarea({ className, rows = 5, ...rest }) {
	return (
		<textarea
			rows={rows}
			className={cn(fieldClasses, 'resize-y leading-relaxed', className)}
			{...rest}
		/>
	);
}

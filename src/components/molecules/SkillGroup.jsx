import { cn } from '@/lib/utils';
import { Icon, Tag } from '@/components/atoms';

/** A card with a group title and its skills as soft tags. */
export default function SkillGroup({
	title,
	skills = [],
	icon = 'leaf',
	className,
	attrs,
}) {
	return (
		<div
			className={cn(
				'flex h-full flex-col gap-6 rounded-[2rem] border border-sage-900/8 bg-cream-50 p-7 transition-colors duration-700 hover:bg-white sm:p-8',
				className,
			)}
			{...attrs}
		>
			<div className="flex items-center gap-3">
				<span className="grid size-10 place-items-center rounded-full bg-sage-100 text-sage-700">
					<Icon name={icon} className="size-5" />
				</span>
				<h3 className="font-serif text-2xl">{title}</h3>
			</div>
			<ul className="flex flex-wrap gap-2">
				{skills.map((skill) => (
					<li key={skill}>
						<Tag tone="soft" className="text-sm">
							{skill}
						</Tag>
					</li>
				))}
			</ul>
		</div>
	);
}

import { Container } from '@/components/atoms';
import { isStoryblokConfigured } from '@/lib/storyblok';

/** Shown while developing when Storyblok isn't connected yet or the page is missing. */
export default function SetupNotice({ slug }) {
	return (
		<section className="pt-10 pb-24 sm:pt-20">
			<Container className="flex max-w-2xl flex-col gap-4 text-sage-800">
				<h1 className="text-title">Nothing here yet</h1>
				{isStoryblokConfigured ? (
					<p>
						There is no story called <strong>{slug}</strong> in Storyblok. Run{' '}
						<code>npm run storyblok:setup</code> to create the starting content,
						or add the story in Storyblok yourself.
					</p>
				) : (
					<p>
						Add <code>STORYBLOK_DELIVERY_API_TOKEN</code> to{' '}
						<code>.env.local</code> to connect Storyblok, then restart{' '}
						<code>npm run dev</code>.
					</p>
				)}
			</Container>
		</section>
	);
}

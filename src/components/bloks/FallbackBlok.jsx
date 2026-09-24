/** Rendered for bloks that exist in Storyblok but not (yet) in code. */
export default function FallbackBlok({ blok }) {
	if (process.env.NODE_ENV === 'production') return null;
	return (
		<div className="container-page my-8 rounded-2xl border border-dashed border-clay-600/40 p-6 text-sm text-clay-600">
			No component registered for the Storyblok blok{' '}
			<strong>{blok?.component}</strong>. Add it to
			<code className="mx-1">src/components/bloks/registry.js</code>.
		</div>
	);
}

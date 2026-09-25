/** Shown while developing for a Storyblok component that has no React component yet. */
export default function FallbackBlok({ blok }) {
	if (process.env.NODE_ENV === 'production') return null;
	return (
		<div className="container-page my-8">
			<p className="rounded-md border border-dashed border-sage-400 p-5 text-sm text-sage-700">
				There is no React component for the Storyblok component{' '}
				<strong>{blok?.component}</strong> yet. Add one to
				src/components/bloks/registry.js.
			</p>
		</div>
	);
}

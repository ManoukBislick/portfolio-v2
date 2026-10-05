/**
 * A small script that runs while the browser reads the HTML, before the first paint.
 * In the browser it renders as `text/plain`, so React doesn't warn about a script tag
 * and the code doesn't run a second time. See Next's "Preventing flash" guide.
 */
export default function InlineScript({ html }) {
	return (
		<script
			type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
			suppressHydrationWarning
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}

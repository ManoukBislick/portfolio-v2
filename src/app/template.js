import PageTransition from '@/components/animations/PageTransition';

/** Re-mounts on every navigation, so each page arrives with a soft fade. */
export default function Template({ children }) {
	return <PageTransition>{children}</PageTransition>;
}

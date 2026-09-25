import { Button, Container } from '@/components/atoms';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
	return (
		<section className="pt-10 pb-24 sm:pt-20">
			<Container className="flex max-w-2xl flex-col items-start gap-6">
				<p className="text-sm text-sage-600">404</p>
				<h1 className="text-title">This page doesn’t exist.</h1>
				<p className="text-lg text-sage-800">
					It may have moved, or the link has a typo.
				</p>
				<Button href="/">Back to the homepage</Button>
			</Container>
		</section>
	);
}

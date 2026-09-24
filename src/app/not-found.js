import { Button, Container } from '@/components/atoms';
import BotanicalLine from '@/components/animations/BotanicalLine';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
	return (
		<section className="relative overflow-hidden pt-40 pb-24 sm:pt-48">
			<Container className="flex flex-col items-start gap-8">
				<p className="text-sm tracking-[0.2em] text-sage-600 uppercase">404</p>
				<h1 className="max-w-3xl text-display">
					This path is still <em className="text-sage-600">overgrown</em>.
				</h1>
				<p className="max-w-xl text-lg text-sage-800">
					The page you were looking for doesn’t exist (anymore). Let’s get you
					back to familiar ground.
				</p>
				<Button href="/" size="lg" icon="arrow-left">
					Back to home
				</Button>
			</Container>
			<BotanicalLine
				onLoad
				className="pointer-events-none absolute top-24 right-10 hidden h-96 w-auto lg:block"
			/>
		</section>
	);
}

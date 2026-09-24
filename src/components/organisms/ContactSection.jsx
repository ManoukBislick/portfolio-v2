import { cn } from '@/lib/utils';
import { site } from '@/lib/site';
import { Container, Icon, StatusDot } from '@/components/atoms';
import { SocialLinks } from '@/components/molecules';
import Reveal from '@/components/animations/Reveal';
import ContactForm from './ContactForm';

function InfoRow({ icon, label, children }) {
	return (
		<div className="flex items-start gap-4 border-t border-sage-900/10 py-5">
			<span className="grid size-10 shrink-0 place-items-center rounded-full bg-sage-100 text-sage-700">
				<Icon name={icon} className="size-[1.1rem]" />
			</span>
			<div className="flex flex-col gap-0.5">
				<p className="text-[0.7rem] font-medium tracking-[0.2em] text-sage-600 uppercase">
					{label}
				</p>
				<div className="text-base text-sage-900">{children}</div>
			</div>
		</div>
	);
}

/** Contact details on the left, the form in a soft card on the right. */
export default function ContactSection({
	email = site.email,
	availability,
	responseTime,
	location = site.location,
	successText,
	action,
	className,
	attrs,
}) {
	return (
		<section className={cn('pb-16 sm:pb-24', className)} {...attrs}>
			<Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
				<Reveal className="flex flex-col lg:sticky lg:top-32 lg:self-start">
					{availability ? (
						<p className="mb-8 inline-flex items-center gap-3 self-start rounded-full bg-sage-100 px-4 py-2 text-sm text-sage-800">
							<StatusDot />
							{availability}
						</p>
					) : null}
					<InfoRow icon="mail" label="Email">
						<a href={`mailto:${email}`} className="link-underline">
							{email}
						</a>
					</InfoRow>
					{responseTime ? (
						<InfoRow icon="clock" label="Response time">
							{responseTime}
						</InfoRow>
					) : null}
					{location ? (
						<InfoRow icon="pin" label="Based in">
							{location}
						</InfoRow>
					) : null}
					<div className="border-t border-sage-900/10 pt-6">
						<SocialLinks />
					</div>
				</Reveal>

				<Reveal
					delay={0.15}
					className="relative rounded-[2.5rem] bg-cream-100 p-6 sm:p-10 lg:p-14"
				>
					<ContactForm action={action} successText={successText} />
				</Reveal>
			</Container>
		</section>
	);
}

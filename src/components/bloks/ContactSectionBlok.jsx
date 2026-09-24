import { storyblokEditable } from '@storyblok/react/rsc';
import { site } from '@/lib/site';
import { sendContactMessage } from '@/app/contact/actions';
import { ContactSection } from '@/components/organisms';

export default function ContactSectionBlok({ blok }) {
	return (
		<ContactSection
			attrs={storyblokEditable(blok)}
			action={sendContactMessage}
			email={blok.email || site.email}
			availability={blok.availability}
			responseTime={blok.response_time}
			location={blok.location || site.location}
			successText={blok.success_message}
		/>
	);
}

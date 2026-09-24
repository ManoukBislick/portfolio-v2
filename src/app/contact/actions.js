'use server';

import { env } from '@/lib/env';
import { site } from '@/lib/site';
import {
	BUDGETS,
	TIMELINES,
	TOPICS,
	labelFor,
	validateContact,
} from '@/lib/contact';

const MIN_FILL_TIME_MS = 2500;

function escapeHtml(value = '') {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

async function sendWithResend({ values, topic, budget, timeline }) {
	const rows = [
		['Name', values.name],
		['Email', values.email],
		['Company', values.company],
		['Topic', topic],
		['Budget', budget],
		['Timeline', timeline],
	].filter(([, value]) => value);

	const text = `${rows.map(([key, value]) => `${key}: ${value}`).join('\n')}\n\n${values.message}`;
	const html = `
		<div style="font-family: Georgia, serif; color: #162019; line-height: 1.6">
			<h2 style="font-weight: normal">New message via your portfolio 🌿</h2>
			<table cellpadding="6" style="border-collapse: collapse">
				${rows.map(([key, value]) => `<tr><td style="color:#54714b">${key}</td><td>${escapeHtml(value)}</td></tr>`).join('')}
			</table>
			<p style="white-space: pre-wrap; padding: 16px; background: #f1f5ee; border-radius: 12px">${escapeHtml(values.message)}</p>
		</div>`;

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${env('RESEND_API_KEY')}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: env('CONTACT_FROM_EMAIL') || 'Portfolio <onboarding@resend.dev>',
			to: (env('CONTACT_TO_EMAIL') || site.email)
				.split(',')
				.map((email) => email.trim()),
			reply_to: values.email,
			subject: `New message from ${values.name} — ${topic}`,
			text,
			html,
		}),
	});

	if (!response.ok) {
		const detail = await response.text().catch(() => '');
		throw new Error(`Resend responded with ${response.status}: ${detail}`);
	}
}

/**
 * Server action behind the contact form.
 * Validates, filters out bots (honeypot + fill time) and sends the mail via Resend.
 */
export async function sendContactMessage(_previousState, formData) {
	const values = {
		name: String(formData.get('name') ?? '').trim(),
		email: String(formData.get('email') ?? '').trim(),
		company: String(formData.get('company') ?? '').trim(),
		topic: String(formData.get('topic') ?? ''),
		budget: String(formData.get('budget') ?? ''),
		timeline: String(formData.get('timeline') ?? ''),
		message: String(formData.get('message') ?? '').trim(),
		consent: formData.get('consent') === 'on',
	};

	// Bots love filling in hidden fields and submitting instantly.
	const honeypot = String(formData.get('website') ?? '');
	const startedAt = Number(formData.get('started_at') ?? 0);
	if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_TIME_MS)) {
		return { status: 'success', name: values.name };
	}

	const errors = validateContact(values);
	if (Object.keys(errors).length) {
		return {
			status: 'error',
			errors,
			message: 'A few details need your attention.',
		};
	}

	const topic = labelFor(TOPICS, values.topic);
	const budget =
		values.topic === 'project' ? labelFor(BUDGETS, values.budget) : '';
	const timeline =
		values.topic === 'project' ? labelFor(TIMELINES, values.timeline) : '';

	if (!env('RESEND_API_KEY')) {
		if (process.env.NODE_ENV !== 'production') {
			console.info(
				'[contact] RESEND_API_KEY is not set — message logged instead of sent:',
				{ ...values, topic },
			);
			return { status: 'success', name: values.name };
		}
		return {
			status: 'error',
			errors: {},
			message: `The form isn’t connected yet. Please email me directly at ${site.email}.`,
		};
	}

	try {
		await sendWithResend({ values, topic, budget, timeline });
		return { status: 'success', name: values.name };
	} catch (error) {
		console.error('[contact] Failed to send message', error);
		return {
			status: 'error',
			errors: {},
			message: `Something went wrong while sending. Please try again, or email me at ${site.email}.`,
		};
	}
}

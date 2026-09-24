'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import {
	BUDGETS,
	MESSAGE_MAX,
	TIMELINES,
	TOPICS,
	validateContact,
} from '@/lib/contact';
import { Button, Checkbox, Input, Textarea } from '@/components/atoms';
import { ChoiceChips, FormField } from '@/components/molecules';
import { gsap, useGSAP, MOTION_OK } from '@/components/animations/gsap';

const INITIAL = {
	name: '',
	email: '',
	company: '',
	topic: 'project',
	budget: '',
	timeline: '',
	message: '',
	consent: false,
};

function SuccessMessage({ name, onReset, successText }) {
	const ref = useRef(null);

	useGSAP(
		() => {
			const el = ref.current;
			const mm = gsap.matchMedia();
			mm.add(MOTION_OK, () => {
				const tl = gsap.timeline();
				tl.from(el.querySelector('[data-circle]'), {
					drawSVG: '0%',
					duration: 1.2,
					ease: 'power2.inOut',
				})
					.from(
						el.querySelector('[data-check]'),
						{ drawSVG: '0%', duration: 0.6, ease: 'power2.out' },
						'-=0.3',
					)
					.from(
						el.querySelectorAll('[data-fade]'),
						{
							autoAlpha: 0,
							y: 16,
							stagger: 0.1,
							duration: 1,
							ease: 'expo.out',
						},
						'-=0.4',
					);
			});
			el.focus();
			return () => mm.revert();
		},
		{ scope: ref },
	);

	return (
		<div
			ref={ref}
			tabIndex={-1}
			className="flex flex-col items-start gap-6 py-10 outline-none"
			role="status"
			aria-live="polite"
		>
			<svg
				viewBox="0 0 64 64"
				className="size-20 text-sage-600"
				fill="none"
				aria-hidden="true"
			>
				<circle
					data-circle=""
					cx="32"
					cy="32"
					r="30"
					stroke="currentColor"
					strokeWidth="1.5"
				/>
				<path
					data-check=""
					d="m20 33 8 8 16-17"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<h3 data-fade="" className="font-serif text-4xl sm:text-5xl">
				Thank you{name ? `, ${name.split(' ')[0]}` : ''}!
			</h3>
			<p data-fade="" className="max-w-md text-lg text-sage-800">
				{successText ||
					'Your message is on its way. I usually reply within two working days — talk soon.'}
			</p>
			<div data-fade="">
				<Button variant="secondary" icon="arrow-left" onClick={onReset}>
					Send another message
				</Button>
			</div>
		</div>
	);
}

/**
 * The contact form. Validates on the client for instant feedback,
 * then posts to a server action that sends the email.
 */
export default function ContactForm({ action, successText, className }) {
	const [state, formAction, pending] = useActionState(action, {
		status: 'idle',
	});
	const [values, setValues] = useState(INITIAL);
	const [clientErrors, setClientErrors] = useState({});
	const [dismissedState, setDismissedState] = useState(null);
	const startedAt = useRef(0);
	const projectRef = useRef(null);
	const isProject = values.topic === 'project';

	useEffect(() => {
		startedAt.current = Date.now();
	}, []);

	const errors = { ...(state?.errors ?? {}), ...clientErrors };
	const set = (key) => (event) => {
		const value = event?.target
			? event.target.type === 'checkbox'
				? event.target.checked
				: event.target.value
			: event;
		setValues((current) => ({ ...current, [key]: value }));
		if (clientErrors[key]) {
			setClientErrors((current) => {
				const next = { ...current };
				delete next[key];
				return next;
			});
		}
	};

	// Softly fold the project-only fields open and closed.
	useGSAP(
		() => {
			const el = projectRef.current;
			if (!el) return;
			const reduce = window.matchMedia(
				'(prefers-reduced-motion: reduce)',
			).matches;
			gsap.to(el, {
				height: isProject ? 'auto' : 0,
				autoAlpha: isProject ? 1 : 0,
				duration: reduce ? 0 : 0.7,
				ease: 'power3.inOut',
			});
		},
		{ dependencies: [isProject] },
	);

	const onSubmit = (event) => {
		const found = validateContact(values);
		setClientErrors(found);
		if (Object.keys(found).length) {
			event.preventDefault();
			const first = event.currentTarget.querySelector(
				`[name="${Object.keys(found)[0]}"]`,
			);
			first?.focus();
			return;
		}
		event.currentTarget.elements.started_at.value = String(startedAt.current);
	};

	if (state?.status === 'success' && state !== dismissedState) {
		return (
			<SuccessMessage
				name={state.name}
				successText={successText}
				onReset={() => {
					setValues(INITIAL);
					setClientErrors({});
					startedAt.current = Date.now();
					setDismissedState(state);
				}}
			/>
		);
	}

	const invalid = (key) =>
		errors[key]
			? { 'aria-invalid': 'true', 'aria-describedby': `${key}-error` }
			: {};

	return (
		<form
			action={formAction}
			onSubmit={onSubmit}
			noValidate
			className={cn('flex flex-col gap-10', className)}
		>
			<ChoiceChips
				name="topic"
				legend="What’s on your mind?"
				options={TOPICS}
				value={values.topic}
				onChange={set('topic')}
				error={errors.topic}
			/>

			<div className="grid gap-10 sm:grid-cols-2">
				<FormField id="name" label="Your name" error={errors.name}>
					<Input
						id="name"
						name="name"
						autoComplete="name"
						placeholder="Jane Doe"
						value={values.name}
						onChange={set('name')}
						{...invalid('name')}
					/>
				</FormField>
				<FormField id="email" label="Email" error={errors.email}>
					<Input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						placeholder="jane@studio.com"
						value={values.email}
						onChange={set('email')}
						{...invalid('email')}
					/>
				</FormField>
			</div>

			<div
				ref={projectRef}
				className="overflow-hidden"
				inert={!isProject}
				aria-hidden={!isProject}
				style={
					isProject
						? undefined
						: { height: 0, opacity: 0, visibility: 'hidden' }
				}
			>
				<div className="flex flex-col gap-10">
					<FormField id="company" label="Company or organisation" optional>
						<Input
							id="company"
							name="company"
							autoComplete="organization"
							placeholder="Studio Green"
							value={values.company}
							onChange={set('company')}
						/>
					</FormField>
					<ChoiceChips
						name="budget"
						legend="Budget (optional)"
						options={BUDGETS}
						value={values.budget}
						onChange={set('budget')}
					/>
					<ChoiceChips
						name="timeline"
						legend="Ideal start (optional)"
						options={TIMELINES}
						value={values.timeline}
						onChange={set('timeline')}
					/>
				</div>
			</div>

			<FormField
				id="message"
				label="Your message"
				error={errors.message}
				hint={`${values.message.length} / ${MESSAGE_MAX}`}
			>
				<Textarea
					id="message"
					name="message"
					rows={6}
					maxLength={MESSAGE_MAX}
					placeholder="Tell me a bit about your idea, your timeline and what you’d love to achieve…"
					value={values.message}
					onChange={set('message')}
					{...invalid('message')}
				/>
			</FormField>

			{/* Honeypot + timing: invisible to people, irresistible to bots. */}
			<div
				aria-hidden="true"
				className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
			>
				<label htmlFor="website">Website</label>
				<input
					id="website"
					name="website"
					type="text"
					tabIndex={-1}
					autoComplete="off"
				/>
			</div>
			<input type="hidden" name="started_at" defaultValue="0" />

			<div className="flex flex-col gap-2">
				<Checkbox
					id="consent"
					name="consent"
					checked={values.consent}
					onChange={set('consent')}
					{...invalid('consent')}
				>
					I’m happy for my details to be used to reply to this message. Nothing
					else, no newsletters.
				</Checkbox>
				{errors.consent ? (
					<p
						id="consent-error"
						role="alert"
						className="pl-8 text-sm text-clay-600"
					>
						{errors.consent}
					</p>
				) : null}
			</div>

			<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
				<Button
					type="submit"
					size="lg"
					icon={pending ? null : 'send'}
					disabled={pending}
				>
					{pending ? (
						<span className="inline-flex items-center gap-3">
							<span
								className="size-4 animate-spin rounded-full border-2 border-cream-50/30 border-t-cream-50"
								aria-hidden="true"
							/>
							Sending…
						</span>
					) : (
						'Send message'
					)}
				</Button>
				{state?.status === 'error' && state.message ? (
					<p role="alert" className="text-sm text-clay-600">
						{state.message}
					</p>
				) : null}
			</div>
		</form>
	);
}

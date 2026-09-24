/** Shared between the contact form (client) and the server action. */
export const TOPICS = [
	{ value: 'project', label: 'A new project' },
	{ value: 'collaboration', label: 'Collaboration' },
	{ value: 'job', label: 'Job opportunity' },
	{ value: 'hello', label: 'Just saying hi' },
];

export const BUDGETS = [
	{ value: 'lt-2500', label: '< €2.5k' },
	{ value: '2500-5000', label: '€2.5k – €5k' },
	{ value: '5000-10000', label: '€5k – €10k' },
	{ value: 'gt-10000', label: '€10k +' },
	{ value: 'unsure', label: 'Not sure yet' },
];

export const TIMELINES = [
	{ value: 'asap', label: 'As soon as possible' },
	{ value: '1-3-months', label: 'In 1–3 months' },
	{ value: 'flexible', label: 'Flexible' },
];

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 3000;

export function labelFor(list, value) {
	return list.find((item) => item.value === value)?.label ?? value ?? '';
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns an object of field errors; empty when everything is fine. */
export function validateContact(values) {
	const errors = {};
	if (!values.name?.trim()) errors.name = 'What should I call you?';
	if (!values.email?.trim())
		errors.email = 'I need an email address to reply to.';
	else if (!EMAIL.test(values.email.trim()))
		errors.email = 'That email address doesn’t look quite right.';
	if (!TOPICS.some((topic) => topic.value === values.topic))
		errors.topic = 'Pick what your message is about.';
	const length = values.message?.trim().length ?? 0;
	if (length < MESSAGE_MIN)
		errors.message = `Tell me a little more — at least ${MESSAGE_MIN} characters.`;
	if (length > MESSAGE_MAX)
		errors.message = `That’s a lot! Please keep it under ${MESSAGE_MAX} characters.`;
	if (!values.consent)
		errors.consent = 'Please agree so I can use your details to reply.';
	return errors;
}

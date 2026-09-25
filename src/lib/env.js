/** Read an environment variable, ignoring empty values and `<PLACEHOLDERS>` from .env.example. */
export function env(name) {
	const value = process.env[name]?.trim();
	if (!value || /^<.*>$/.test(value)) return undefined;
	return value;
}

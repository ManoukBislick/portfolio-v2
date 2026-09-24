/**
 * Read an environment variable, ignoring the `<PLACEHOLDER>` values from .env.example.
 */
export function env(name) {
	const value = process.env[name];
	if (!value || /^<.*>$/.test(value.trim())) return undefined;
	return value;
}

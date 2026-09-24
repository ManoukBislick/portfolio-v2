/**
 * Minimal Storyblok Management API client for the setup & blog scripts.
 * Needs STORYBLOK_MANAGEMENT_TOKEN (a personal access token) and STORYBLOK_SPACE_ID.
 * Reads .env.local / .env automatically so you can run it with plain `node`.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export function loadEnv(root = process.cwd()) {
	for (const file of ['.env.local', '.env']) {
		const full = path.join(root, file);
		if (!existsSync(full)) continue;
		for (const line of readFileSync(full, 'utf8').split(/\r?\n/)) {
			const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
			if (!match || process.env[match[1]]) continue;
			process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
		}
	}
}

const REGION_HOSTS = {
	eu: 'https://mapi.storyblok.com',
	us: 'https://api-us.storyblok.com',
	ca: 'https://api-ca.storyblok.com',
	ap: 'https://api-ap.storyblok.com',
	cn: 'https://app.storyblokchina.cn',
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function createClient() {
	loadEnv();
	const token = process.env.STORYBLOK_MANAGEMENT_TOKEN;
	const spaceId = process.env.STORYBLOK_SPACE_ID;
	const region = (process.env.STORYBLOK_REGION || 'eu').toLowerCase();

	if (!token || token.startsWith('<')) {
		throw new Error(
			'Missing STORYBLOK_MANAGEMENT_TOKEN. Create a personal access token in Storyblok (My account → Personal access tokens) and add it to .env.local.',
		);
	}
	if (!spaceId || spaceId.startsWith('<')) {
		throw new Error(
			'Missing STORYBLOK_SPACE_ID. You can find it in Storyblok under Settings → Space.',
		);
	}

	const host =
		process.env.STORYBLOK_MAPI_URL || REGION_HOSTS[region] || REGION_HOSTS.eu;
	const base = `${host}/v1/spaces/${spaceId}`;

	async function request(method, endpoint, body, attempt = 0) {
		const response = await fetch(`${base}${endpoint}`, {
			method,
			headers: { Authorization: token, 'Content-Type': 'application/json' },
			body: body ? JSON.stringify(body) : undefined,
		});

		// The Management API allows a few requests per second; back off politely.
		if (response.status === 429 && attempt < 6) {
			await sleep(600 * (attempt + 1));
			return request(method, endpoint, body, attempt + 1);
		}

		const text = await response.text();
		const data = text ? JSON.parse(text) : {};
		if (!response.ok) {
			const error = new Error(
				`${method} ${endpoint} → ${response.status}: ${text.slice(0, 400)}`,
			);
			error.status = response.status;
			error.data = data;
			throw error;
		}
		await sleep(200);
		return data;
	}

	return {
		get: (endpoint) => request('GET', endpoint),
		post: (endpoint, body) => request('POST', endpoint, body),
		put: (endpoint, body) => request('PUT', endpoint, body),
		region,
		spaceId,
	};
}

/** Find a story by its full slug (returns null when it doesn't exist). */
export async function findStory(client, fullSlug) {
	const { stories = [] } = await client.get(
		`/stories?with_slug=${encodeURIComponent(fullSlug)}&per_page=1`,
	);
	return stories[0] ?? null;
}

/** Find or create a folder at the root of the space. */
export async function ensureFolder(client, { name, slug, defaultRoot }) {
	const existing = await findStory(client, slug);
	if (existing) return existing;
	const { story } = await client.post('/stories', {
		story: { name, slug, is_folder: true, default_root: defaultRoot },
	});
	return story;
}

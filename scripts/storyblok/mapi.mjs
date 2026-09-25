/**
 * A small client for the Storyblok Management API, used by the setup and blog scripts.
 * Needs STORYBLOK_MANAGEMENT_TOKEN (a personal access token) and STORYBLOK_SPACE_ID,
 * read from .env.local or .env so the scripts run with plain `node`.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export function loadEnv(root = process.cwd()) {
	for (const file of ['.env.local', '.env']) {
		const full = path.join(root, file);
		if (!existsSync(full)) continue;
		for (const line of readFileSync(full, 'utf8').split(/\r?\n/)) {
			const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
			if (!match || process.env[match[1]]) continue;
			process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
		}
	}
}

const HOSTS = {
	eu: 'https://mapi.storyblok.com',
	us: 'https://api-us.storyblok.com',
	ca: 'https://api-ca.storyblok.com',
	ap: 'https://api-ap.storyblok.com',
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const filled = (value) => Boolean(value && !value.startsWith('<'));

export function createClient() {
	loadEnv();
	const token = process.env.STORYBLOK_MANAGEMENT_TOKEN;
	const spaceId = process.env.STORYBLOK_SPACE_ID;
	const region = (process.env.STORYBLOK_REGION || 'eu').toLowerCase();

	if (!filled(token)) {
		throw new Error(
			'STORYBLOK_MANAGEMENT_TOKEN is missing in .env.local. Create one in Storyblok under My account → Personal access tokens.',
		);
	}
	if (!filled(spaceId)) {
		throw new Error(
			'STORYBLOK_SPACE_ID is missing in .env.local. You find it in Storyblok under Settings → Space.',
		);
	}

	const host = process.env.STORYBLOK_MAPI_URL || HOSTS[region] || HOSTS.eu;
	const base = `${host}/v1/spaces/${spaceId}`;

	async function request(method, endpoint, body, attempt = 0) {
		const response = await fetch(`${base}${endpoint}`, {
			method,
			headers: { Authorization: token, 'Content-Type': 'application/json' },
			body: body ? JSON.stringify(body) : undefined,
		});

		// The Management API allows a few requests per second; wait and retry.
		if (response.status === 429 && attempt < 6) {
			await sleep(700 * (attempt + 1));
			return request(method, endpoint, body, attempt + 1);
		}

		const text = await response.text();
		let data = {};
		try {
			data = text ? JSON.parse(text) : {};
		} catch {
			data = { raw: text };
		}
		if (!response.ok) {
			const hint =
				response.status === 401
					? ' (check STORYBLOK_MANAGEMENT_TOKEN)'
					: response.status === 404 && endpoint === ''
						? ' (check STORYBLOK_SPACE_ID and STORYBLOK_REGION)'
						: '';
			const error = new Error(
				`${method} ${endpoint || '/'} → ${response.status}${hint}: ${text.slice(0, 300)}`,
			);
			error.status = response.status;
			error.data = data;
			throw error;
		}
		await sleep(150);
		return data;
	}

	return {
		get: (endpoint) => request('GET', endpoint),
		post: (endpoint, body) => request('POST', endpoint, body),
		put: (endpoint, body) => request('PUT', endpoint, body),
		delete: (endpoint) => request('DELETE', endpoint),
		region,
		spaceId,
	};
}

/** A story by its full slug, or null. Folders have no trailing slash, start pages do. */
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

/**
 * Upload a file to the asset library (or reuse one with the same name)
 * and return the value an asset field expects.
 */
export async function uploadAsset(client, { file, alt = '', title = '' }) {
	const filename = path.basename(file);
	const { assets = [] } = await client.get(
		`/assets?search=${encodeURIComponent(filename)}&per_page=25`,
	);
	let asset = assets.find((item) => item.filename?.endsWith(`/${filename}`));

	if (!asset) {
		const buffer = readFileSync(file);
		const svgBox = buffer
			.toString('utf8', 0, 2000)
			.match(/viewBox="[\d.]+ [\d.]+ ([\d.]+) ([\d.]+)"/);
		const size = svgBox
			? `${Math.round(svgBox[1])}x${Math.round(svgBox[2])}`
			: '';

		const signed = await client.post('/assets', {
			filename,
			size,
			validate_upload: 1,
		});
		const form = new FormData();
		for (const [key, value] of Object.entries(signed.fields))
			form.append(key, value);
		form.append(
			'file',
			new Blob([buffer], {
				type: filename.endsWith('.svg')
					? 'image/svg+xml'
					: 'application/octet-stream',
			}),
			filename,
		);
		const upload = await fetch(signed.post_url, { method: 'POST', body: form });
		if (!upload.ok && upload.status !== 204) {
			throw new Error(`Upload of ${filename} failed with ${upload.status}`);
		}
		await client.get(`/assets/${signed.id}/finish_upload`);
		asset = await client.get(`/assets/${signed.id}`);
		if (asset.asset) asset = asset.asset;
	}

	return {
		id: asset.id,
		alt,
		name: '',
		focus: '',
		title,
		source: '',
		// The Management API sometimes returns the raw S3 address; the site expects a.storyblok.com.
		filename: String(asset.filename).replace(
			/^https?:\/\/s3\.amazonaws\.com\//,
			'https://',
		),
		copyright: '',
		fieldtype: 'asset',
		meta_data: {},
		is_external_url: false,
	};
}

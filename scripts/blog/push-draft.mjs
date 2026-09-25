#!/usr/bin/env node
/**
 * Puts blog drafts from the drafts/ folder into Storyblok as unpublished articles.
 *
 *   npm run blog:push                              every draft that isn't in Storyblok yet
 *   npm run blog:push -- drafts/2026-10-my-post.md  one specific draft
 *   npm run blog:push -- --force                   also overwrite articles that already exist
 *
 * A draft is a Markdown file with a short header, see drafts/README.md.
 * Nothing is published: you read the article in Storyblok and press Publish yourself.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { markdownToStoryblokRichtext } from '@storyblok/richtext/markdown-parser';
import { createClient, ensureFolder, findStory } from '../storyblok/mapi.mjs';

const DRAFTS = 'drafts';
const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const files = args.filter((arg) => !arg.startsWith('--'));

/** Split a draft into its header fields and the Markdown body. */
function parseDraft(source) {
	const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!match) return { fields: {}, body: source.trim() };
	const fields = {};
	for (const line of match[1].split(/\r?\n/)) {
		const pair = line.match(/^([a-z_]+):\s*(.*)$/i);
		if (!pair) continue;
		let value = pair[2].trim();
		if (/^\[.*\]$/.test(value)) value = value.slice(1, -1);
		fields[pair[1]] = value.replace(/^["']|["']$/g, '');
	}
	return { fields, body: match[2].trim() };
}

function draftFiles() {
	if (files.length) return files;
	if (!existsSync(DRAFTS)) return [];
	return readdirSync(DRAFTS)
		.filter((file) => /^\d{4}-\d{2}-.+\.md$/.test(file))
		.sort()
		.map((file) => path.join(DRAFTS, file));
}

async function main() {
	const list = draftFiles();
	if (!list.length) {
		console.log('No drafts found in drafts/.');
		return;
	}

	const client = createClient();
	const folder = await ensureFolder(client, {
		name: 'Blog',
		slug: 'blog',
		defaultRoot: 'article',
	});

	for (const file of list) {
		const { fields, body } = parseDraft(readFileSync(file, 'utf8'));
		const slug =
			fields.slug || path.basename(file, '.md').replace(/^\d{4}-\d{2}-/, '');
		const title = fields.title || slug;
		const date = fields.date || path.basename(file).slice(0, 7) + '-01';

		const existing = await findStory(client, `blog/${slug}`);
		if (existing && !FORCE) {
			console.log(`skipped ${file}: blog/${slug} is already in Storyblok`);
			continue;
		}

		const story = {
			name: title,
			slug,
			parent_id: folder.id,
			content: {
				_uid: randomUUID(),
				component: 'article',
				title,
				date: `${date} 00:00`,
				excerpt: fields.excerpt || '',
				tags: fields.tags || '',
				seo_description: fields.seo_description || fields.excerpt || '',
				body: markdownToStoryblokRichtext(body),
			},
		};

		const { story: saved } = existing
			? await client.put(`/stories/${existing.id}`, {
					story: { ...story, id: existing.id },
				})
			: await client.post('/stories', { story });

		console.log(`${existing ? 'updated' : 'added'} "${title}" as a draft`);
		console.log(
			`  https://app.storyblok.com/#/me/spaces/${client.spaceId}/stories/0/0/${saved.id}`,
		);
	}
}

main().catch((error) => {
	console.error(`\nSomething went wrong: ${error.message}\n`);
	process.exit(1);
});

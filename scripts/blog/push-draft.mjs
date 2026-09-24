#!/usr/bin/env node
/**
 * Creates Storyblok draft stories from the Markdown articles in content/blog.
 *
 *   npm run blog:push                          every article that isn't in Storyblok yet
 *   npm run blog:push -- content/blog/x.md     only these files
 *   npm run blog:push -- --update              also overwrite drafts that already exist
 *   npm run blog:push -- --dry-run             show what would happen
 *
 * Articles are always saved as drafts: you review and publish them in Storyblok.
 * Requires STORYBLOK_MANAGEMENT_TOKEN and STORYBLOK_SPACE_ID (in .env.local or the environment).
 */
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { createClient, ensureFolder, findStory } from '../storyblok/mapi.mjs';
import { getLocalArticles } from '../../src/lib/local-articles.js';

const argv = process.argv.slice(2);
const flags = new Set(argv.filter((arg) => arg.startsWith('--')));
const files = argv
	.filter((arg) => !arg.startsWith('--'))
	.map((file) => path.basename(file, '.md'));
const DRY = flags.has('--dry-run');
const UPDATE = flags.has('--update');

async function main() {
	const all = await getLocalArticles();
	const selected = files.length
		? all.filter((article) =>
				files.some(
					(file) => file.endsWith(article.slug) || file === article.slug,
				),
			)
		: all;

	if (!selected.length) {
		console.log(
			'No articles found in content/blog (files must be named YYYY-MM-slug.md).',
		);
		return;
	}

	const client = createClient();
	const folder = DRY
		? { id: 0 }
		: await ensureFolder(client, {
				name: 'Blog',
				slug: 'blog',
				defaultRoot: 'article',
			});
	const created = [];

	for (const article of selected) {
		const existing = await findStory(client, article.full_slug);
		if (existing && !UPDATE) {
			console.log(
				`· ${article.full_slug} already exists — skipped (use --update to overwrite the draft)`,
			);
			continue;
		}
		const content = { ...article.content, _uid: randomUUID() };
		if (content.cover?.filename)
			content.cover = {
				id: null,
				alt: '',
				name: '',
				focus: '',
				title: '',
				copyright: '',
				fieldtype: 'asset',
				...content.cover,
			};
		const story = {
			name: article.name,
			slug: article.slug,
			parent_id: folder.id,
			content,
		};

		if (DRY) {
			console.log(
				`${existing ? '~ update' : '+ create'} ${article.full_slug} (draft)`,
			);
			continue;
		}
		const result = existing
			? await client.put(`/stories/${existing.id}`, {
					story: { ...story, id: existing.id },
				})
			: await client.post('/stories', { story });
		created.push(result.story);
		console.log(
			`✓ ${existing ? 'updated' : 'created'} draft ${article.full_slug}`,
		);
	}

	for (const story of created) {
		console.log(
			`  → review: https://app.storyblok.com/#/me/spaces/${client.spaceId}/stories/0/0/${story.id}`,
		);
	}
}

main().catch((error) => {
	console.error(`\n✖ ${error.message}\n`);
	process.exit(1);
});

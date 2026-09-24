#!/usr/bin/env node
/**
 * Pushes the content model (components) to Storyblok and seeds placeholder content.
 *
 *   npm run storyblok:setup                  components + placeholder stories
 *   npm run storyblok:setup -- --components  only (re)push the components
 *   npm run storyblok:setup -- --force       also overwrite stories that already exist
 *   npm run storyblok:setup -- --dry-run     show what would happen, change nothing
 *
 * Requires STORYBLOK_MANAGEMENT_TOKEN and STORYBLOK_SPACE_ID in .env.local.
 */
import { randomUUID } from 'node:crypto';
import { components, GROUPS } from './schema.mjs';
import { createClient, ensureFolder, findStory } from './mapi.mjs';
import { pages } from '../../src/data/fallback/pages.js';
import { projects } from '../../src/data/fallback/projects.js';
import { getLocalArticles } from '../../src/lib/local-articles.js';

const args = new Set(process.argv.slice(2));
const DRY = args.has('--dry-run');
const FORCE = args.has('--force');
const ONLY_COMPONENTS = args.has('--components');
const BLUEPRINT_BLOKS = new Set(['teaser', 'grid', 'feature']);

const log = (...parts) => console.log(...parts);

/** Give nested bloks fresh uids and mark assets/links the way Storyblok stores them. */
function prepareContent(value) {
	if (Array.isArray(value)) return value.map(prepareContent);
	if (!value || typeof value !== 'object') return value;
	const next = {};
	for (const [key, child] of Object.entries(value))
		next[key] = prepareContent(child);
	if (next.component) next._uid = randomUUID();
	if ('filename' in next && !next.component) {
		return {
			id: null,
			name: '',
			title: '',
			focus: '',
			copyright: '',
			fieldtype: 'asset',
			alt: '',
			...next,
		};
	}
	if ('linktype' in next) return { id: '', fieldtype: 'multilink', ...next };
	return next;
}

const usesBlueprintBloks = (story) =>
	JSON.stringify(story?.content ?? {})
		.match(/"component":"(\w+)"/g)
		?.some((m) => BLUEPRINT_BLOKS.has(m.split(':')[1].replace(/"/g, ''))) ??
	false;

async function pushComponents(client) {
	log('\n🌱 Components');
	const { component_groups: existingGroups = [] } =
		await client.get('/component_groups');
	const groupUuid = {};
	for (const [key, name] of Object.entries(GROUPS)) {
		let group = existingGroups.find((item) => item.name === name);
		if (!group && !DRY)
			({ component_group: group } = await client.post('/component_groups', {
				component_group: { name },
			}));
		groupUuid[key] = group?.uuid;
	}

	const { components: existing = [] } = await client.get('/components');
	for (const { group, ...definition } of components) {
		const payload = { ...definition, component_group_uuid: groupUuid[group] };
		const current = existing.find((item) => item.name === definition.name);
		if (DRY) {
			log(`  ${current ? '~ update' : '+ create'} ${definition.name}`);
			continue;
		}
		if (current)
			await client.put(`/components/${current.id}`, {
				component: { ...payload, id: current.id },
			});
		else await client.post('/components', { component: payload });
		log(`  ${current ? '✓ updated' : '✓ created'} ${definition.name}`);
	}
}

async function upsertStory(
	client,
	{
		fullSlug,
		name,
		slug,
		parentId = 0,
		content,
		publish = true,
		isStartpage = false,
		path,
	},
) {
	const existing = await findStory(client, fullSlug);
	const story = {
		name,
		slug,
		parent_id: parentId,
		content: prepareContent(content),
		...(isStartpage ? { is_startpage: true } : {}),
		...(path ? { path } : {}),
	};

	if (existing && !FORCE && !usesBlueprintBloks(existing)) {
		log(`  · skipped ${fullSlug} (already exists — use --force to overwrite)`);
		return existing;
	}
	if (DRY) {
		log(
			`  ${existing ? '~ overwrite' : '+ create'} ${fullSlug}${publish ? '' : ' (draft)'}`,
		);
		return existing;
	}
	const body = { story, ...(publish ? { publish: 1 } : {}) };
	const result = existing
		? await client.put(`/stories/${existing.id}`, {
				...body,
				story: { ...story, id: existing.id },
			})
		: await client.post('/stories', body);
	log(
		`  ✓ ${existing ? 'updated' : 'created'} ${fullSlug}${publish ? ' (published)' : ' (draft)'}`,
	);
	return result.story;
}

async function seedStories(client) {
	log('\n📄 Pages');
	await upsertStory(client, {
		fullSlug: 'home',
		name: 'Home',
		slug: 'home',
		content: pages.home.content,
		path: '/',
	});
	await upsertStory(client, {
		fullSlug: 'about',
		name: 'About',
		slug: 'about',
		content: pages.about.content,
	});
	await upsertStory(client, {
		fullSlug: 'contact',
		name: 'Contact',
		slug: 'contact',
		content: pages.contact.content,
	});

	log('\n🗂  Projects');
	const projectsFolder = DRY
		? { id: 0 }
		: await ensureFolder(client, {
				name: 'Projects',
				slug: 'projects',
				defaultRoot: 'project',
			});
	await upsertStory(client, {
		fullSlug: 'projects/',
		name: 'Projects',
		slug: 'projects',
		parentId: projectsFolder.id,
		isStartpage: true,
		content: pages.projects.content,
	});
	for (const project of projects) {
		// Only the real project is published; samples stay drafts so they never show up on the live site.
		await upsertStory(client, {
			fullSlug: project.full_slug,
			name: project.name,
			slug: project.slug,
			parentId: projectsFolder.id,
			content: project.content,
			publish: !project.slug.startsWith('sample-'),
		});
	}

	log('\n📝 Blog');
	const blogFolder = DRY
		? { id: 0 }
		: await ensureFolder(client, {
				name: 'Blog',
				slug: 'blog',
				defaultRoot: 'article',
			});
	await upsertStory(client, {
		fullSlug: 'blog/',
		name: 'Blog',
		slug: 'blog',
		parentId: blogFolder.id,
		isStartpage: true,
		content: pages.blog.content,
	});
	for (const article of await getLocalArticles()) {
		await upsertStory(client, {
			fullSlug: article.full_slug,
			name: article.name,
			slug: article.slug,
			parentId: blogFolder.id,
			content: article.content,
			publish: false,
		});
	}
}

async function main() {
	const client = createClient();
	log(
		`Storyblok space ${client.spaceId} (${client.region})${DRY ? ' — dry run' : ''}`,
	);
	await pushComponents(client);
	if (!ONLY_COMPONENTS) await seedStories(client);
	log(
		'\n✨ Done. Open Storyblok to replace the placeholders with your own content.',
	);
	log(
		'   Sample projects and blog articles were saved as drafts — publish them when they are ready.\n',
	);
}

main().catch((error) => {
	console.error(`\n✖ ${error.message}\n`);
	process.exit(1);
});

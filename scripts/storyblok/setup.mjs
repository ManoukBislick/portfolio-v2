#!/usr/bin/env node
/**
 * Creates the components and the starting content in your Storyblok space.
 *
 *   npm run storyblok:setup                  components, folders, pages, projects and the first article
 *   npm run storyblok:setup -- --components  only create or update the components
 *   npm run storyblok:setup -- --force       also overwrite stories that already exist
 *   npm run storyblok:setup -- --dry-run     show what would happen without changing anything
 *
 * Needs STORYBLOK_MANAGEMENT_TOKEN and STORYBLOK_SPACE_ID in .env.local.
 * Running it again is safe: existing stories are left alone unless you pass --force.
 */
import { randomUUID } from 'node:crypto';
import { markdownToStoryblokRichtext } from '@storyblok/richtext/markdown-parser';
import { BLUEPRINT_COMPONENTS, components, GROUPS } from './schema.mjs';
import { createClient, ensureFolder, findStory, uploadAsset } from './mapi.mjs';
import * as seed from './seed.mjs';

const args = new Set(process.argv.slice(2));
const DRY = args.has('--dry-run');
const FORCE = args.has('--force');
const ONLY_COMPONENTS = args.has('--components');

const log = (...parts) => console.log(...parts);

/** Stories created or found during this run, by full slug (for story links). */
const known = new Map();
/** Uploaded placeholder images, by file path. */
const uploads = new Map();

async function asset(client, marker) {
	if (DRY)
		return { filename: marker.$asset, alt: marker.alt, fieldtype: 'asset' };
	if (!uploads.has(marker.$asset)) {
		try {
			uploads.set(
				marker.$asset,
				await uploadAsset(client, { file: marker.$asset }),
			);
		} catch (error) {
			log(`  ! could not upload ${marker.$asset}: ${error.message}`);
			uploads.set(marker.$asset, null);
		}
	}
	const uploaded = uploads.get(marker.$asset);
	if (!uploaded) return { filename: '', alt: '', fieldtype: 'asset' };
	return { ...uploaded, alt: marker.alt || '', title: marker.title || '' };
}

function link(marker) {
	const story = known.get(marker.$story);
	if (!story) {
		const url = `/${marker.$story.replace(/\/$/, '')}`;
		return {
			id: '',
			url,
			linktype: 'url',
			fieldtype: 'multilink',
			cached_url: url,
		};
	}
	return {
		id: story.uuid,
		url: '',
		linktype: 'story',
		fieldtype: 'multilink',
		cached_url: story.full_slug,
	};
}

/** Turn the markers in seed.mjs into real Storyblok field values. */
async function prepare(client, value) {
	if (Array.isArray(value)) {
		const list = [];
		for (const item of value) list.push(await prepare(client, item));
		return list;
	}
	if (!value || typeof value !== 'object') return value;
	if ('$asset' in value) return asset(client, value);
	if ('$story' in value) return link(value);
	if ('$markdown' in value) return markdownToStoryblokRichtext(value.$markdown);

	const next = {};
	for (const [key, child] of Object.entries(value))
		next[key] = await prepare(client, child);
	if (next.component && !next._uid) next._uid = randomUUID();
	return next;
}

/** True when a story is empty or still has the demo content from the Storyblok blueprint. */
const isBlueprintContent = (story) =>
	story?.content?.component === 'page' &&
	(!story.content.body?.length ||
		/"component":"(teaser|grid|feature)"/.test(JSON.stringify(story.content)));

async function pushComponents(client) {
	log('\nComponents');
	const { component_groups: groups = [] } =
		await client.get('/component_groups');
	const groupUuid = {};
	for (const [key, name] of Object.entries(GROUPS)) {
		let group = groups.find((item) => item.name === name);
		if (!group && !DRY) {
			({ component_group: group } = await client.post('/component_groups', {
				component_group: { name },
			}));
		}
		groupUuid[key] = group?.uuid;
	}

	const { components: existing = [] } = await client.get('/components');
	for (const { group, ...definition } of components) {
		const payload = {
			...definition,
			component_group_uuid: groupUuid[group] ?? null,
		};
		const current = existing.find((item) => item.name === definition.name);
		if (DRY) {
			log(`  ${current ? 'update' : 'create'} ${definition.name}`);
			continue;
		}
		if (current) {
			await client.put(`/components/${current.id}`, {
				component: { ...payload, id: current.id },
			});
		} else {
			await client.post('/components', { component: payload });
		}
		log(
			`  ${current ? 'updated' : 'created'} ${definition.display_name} (${definition.name})`,
		);
	}
	return existing;
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
		startpage = false,
		path,
	},
) {
	const found = await findStory(client, fullSlug);
	// The list endpoint leaves out the content, so load the full story.
	const existing = found
		? (await client.get(`/stories/${found.id}`)).story
		: null;
	if (existing && !FORCE && !isBlueprintContent(existing)) {
		log(`  skipped ${fullSlug} (already exists, use --force to overwrite)`);
		known.set(fullSlug, existing);
		return existing;
	}
	if (DRY) {
		log(
			`  ${existing ? 'overwrite' : 'create'} ${fullSlug}${publish ? '' : ' (draft)'}`,
		);
		known.set(fullSlug, existing ?? { uuid: '', full_slug: fullSlug });
		return existing;
	}

	const story = {
		name,
		slug,
		parent_id: parentId,
		content: await prepare(client, content),
		...(startpage ? { is_startpage: true } : {}),
		...(path ? { path } : {}),
	};
	const body = { story, ...(publish ? { publish: 1 } : {}) };
	const { story: saved } = existing
		? await client.put(`/stories/${existing.id}`, {
				...body,
				story: { ...story, id: existing.id },
			})
		: await client.post('/stories', body);

	known.set(fullSlug, saved);
	log(
		`  ${existing ? 'updated' : 'created'} ${fullSlug}${publish ? ' (published)' : ' (draft)'}`,
	);
	return saved;
}

async function seedStories(client) {
	log('\nProjects');
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
		startpage: true,
		path: 'projects',
		content: seed.projectsPage,
	});
	for (const project of seed.projects) {
		await upsertStory(client, {
			fullSlug: `projects/${project.slug}`,
			name: project.content.title,
			slug: project.slug,
			parentId: projectsFolder.id,
			content: project.content,
		});
	}

	log('\nBlog');
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
		startpage: true,
		path: 'blog',
		content: seed.blogPage,
	});
	for (const article of seed.articles) {
		await upsertStory(client, {
			fullSlug: `blog/${article.slug}`,
			name: article.content.title,
			slug: article.slug,
			parentId: blogFolder.id,
			content: article.content,
			publish: article.publish,
		});
	}

	log('\nPages');
	await upsertStory(client, {
		fullSlug: 'about',
		name: 'About',
		slug: 'about',
		content: seed.about,
	});
	// Home last, so its buttons can link to the stories above.
	await upsertStory(client, {
		fullSlug: 'home',
		name: 'Home',
		slug: 'home',
		path: '/',
		content: seed.home,
	});
}

/** Remove the demo components from the blueprint once nothing uses them anymore. */
async function removeBlueprintComponents(client, existing) {
	const leftovers = existing.filter((item) =>
		BLUEPRINT_COMPONENTS.includes(item.name),
	);
	if (!leftovers.length) return;
	for (const component of leftovers) {
		const { stories = [] } = await client.get(
			`/stories?contain_component=${component.name}&per_page=1`,
		);
		if (stories.length) {
			log(`  kept ${component.name} (still used in ${stories[0].full_slug})`);
			continue;
		}
		if (DRY) {
			log(`  remove ${component.name}`);
			continue;
		}
		await client.delete(`/components/${component.id}`);
		log(`  removed ${component.name} (blueprint demo, no longer used)`);
	}
}

/** Add preview URLs to the Visual Editor: your local dev server and the live site. */
async function configureVisualEditor(client, space) {
	log('\nVisual Editor');
	const environments = space.environments ?? [];
	const wanted = [
		{ name: 'Local (npm run dev)', location: 'https://localhost:3000/' },
	];
	if (space.domain && !space.domain.includes('localhost')) {
		wanted.push({
			name: 'Live site (draft mode)',
			location: `${space.domain.replace(/\/?$/, '/')}api/draft?slug=`,
		});
	}
	const missing = wanted.filter(
		(item) => !environments.some((env) => env.location === item.location),
	);
	if (!missing.length) {
		log('  preview URLs already set');
		return;
	}
	if (DRY) {
		missing.forEach((item) => log(`  add preview URL ${item.location}`));
		return;
	}
	try {
		await client.put('', {
			space: { environments: [...environments, ...missing] },
		});
		missing.forEach((item) => log(`  added preview URL ${item.location}`));
	} catch (error) {
		log(
			`  could not add the preview URLs (${error.status}). Add them yourself under Settings → Visual Editor:`,
		);
		missing.forEach((item) => log(`    ${item.location}`));
	}
}

async function main() {
	const client = createClient();
	const { space } = await client.get('');
	log(
		`Storyblok space "${space.name}" (${client.spaceId}, ${client.region})${DRY ? ', dry run' : ''}`,
	);

	const existing = await pushComponents(client);
	if (!ONLY_COMPONENTS) {
		await seedStories(client);
		await configureVisualEditor(client, space);
		log('\nCleaning up');
		await removeBlueprintComponents(client, existing);
	}

	log(
		'\nDone. Open Storyblok to replace the placeholder texts and images with your own.',
	);
	log('Run `npm run dev` and open https://localhost:3000 to see the result.\n');
}

main().catch((error) => {
	console.error(`\nSomething went wrong: ${error.message}\n`);
	process.exit(1);
});

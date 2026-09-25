# Manouk Bislick, portfolio

My portfolio, built with **Next.js (App Router)**, **Storyblok**, **Tailwind CSS v4** and **GSAP**, hosted on **Vercel**.

- Pages: Home, About, Projects (with a page per project) and Blog (with a page per article)
- All content lives in Storyblok: pages are built from sections you can add, remove and reorder
- Components follow atomic design (atoms, molecules, organisms, templates), and every Storyblok component has a small React counterpart in `src/components/bloks`
- Animations switch off for visitors who prefer reduced motion

## Getting started

```sh
npm install
cp .env.example .env.local   # then fill in the tokens
npm run storyblok:setup      # once: creates the components and the starting content
npm run dev                  # https://localhost:3000
```

`npm run dev` runs over https, because the Storyblok Visual Editor only loads https pages. The first time, your Mac may ask for your password to trust the local certificate. `npm run dev:http` runs without https.

## Editing content

Open your space in Storyblok. The setup creates:

| Story                 | Content type | What it is                                  |
| --------------------- | ------------ | ------------------------------------------- |
| Home                  | Page         | The homepage                                |
| About                 | Page         | The about page                              |
| Projects (start page) | Page         | Intro of /projects and the grid of projects |
| Projects / …          | Project      | One story per project, at /projects/<slug>  |
| Blog (start page)     | Page         | Intro of /blog and the list of articles     |
| Blog / …              | Article      | One story per article, at /blog/<slug>      |

A new page at the top level (for example `uses`) works straight away at `/uses`. Add it to `nav` in `src/lib/site.js` if it should be in the menu.

In a title you can write `I build *calm* websites`: the words between asterisks become an italic accent.

Open a story and pick **Local (npm run dev)** at the top of the Visual Editor to see your changes while you type. Once the site is deployed, **Live site (draft mode)** does the same on the live site without running anything locally.

### Publishing

Pages are cached for an hour. To see published changes straight away, add a webhook in Storyblok (Settings → Webhooks, trigger "Story published & unpublished") to
`https://<your-domain>/api/revalidate?secret=<STORYBLOK_WEBHOOK_SECRET>`, and add the same `STORYBLOK_WEBHOOK_SECRET` on Vercel.

## The content model

The Storyblok components are defined in code, in `scripts/storyblok/schema.mjs`. To add or change a field, edit that file, run `npm run storyblok:setup -- --components` and update the matching component in `src/components/bloks`.

| Script                                    | What it does                                                    |
| ----------------------------------------- | --------------------------------------------------------------- |
| `npm run storyblok:setup`                 | Creates or updates the components and adds the starting content |
| `npm run storyblok:setup -- --components` | Only the components                                             |
| `npm run storyblok:setup -- --dry-run`    | Shows what would change                                         |
| `npm run storyblok:setup -- --force`      | Also overwrites stories that already exist                      |

The starting content is in `scripts/storyblok/seed.mjs`. After the first run, Storyblok is the place to edit.

## Blog: one article a month

At the start of every month a scheduled Claude task writes a new article as a Markdown file in `drafts/` and sends a reminder. Run `npm run blog:push` to put it into Storyblok as an unpublished article, read it there, add a cover image and press Publish. See [`drafts/README.md`](drafts/README.md); topic ideas are in [`drafts/IDEAS.md`](drafts/IDEAS.md).

## Project structure

```
src/
  app/                  routes (App Router) and the /api/draft and /api/revalidate endpoints
  components/
    atoms/              Button, Heading, Text, Tag, Picture, Logo, Container
    molecules/          ProjectCard, ArticleCard, TimelineItem, SectionHeader, MetaList, NavLink
    organisms/          Hero, Timeline, Skills, ProjectGrid, FeaturedProjects, LatestArticles …
    templates/          ProjectTemplate, ArticleTemplate
    bloks/              one component per Storyblok component, plus the rich text renderer
    animations/         GSAP components: Reveal, SplitReveal, ImageReveal, Parallax, BotanicalLine, PageTransition
  lib/                  Storyblok client, content helpers and site settings
scripts/
  storyblok/            content model, starting content and the setup script
  blog/                 blog:push
drafts/                 blog drafts and ideas
```

Colours, fonts and sizes are defined in `src/app/globals.css` (`@theme`): `cream`, `sage` and `blush`, Poppins (`font-sans`) and Cormorant Garamond (`font-serif`, self-hosted in `src/fonts`).

## Vercel

Add `STORYBLOK_DELIVERY_API_TOKEN` (and `STORYBLOK_REGION` if your space isn't in the EU) under Project → Settings → Environment Variables. Pushing to `main` deploys the site.

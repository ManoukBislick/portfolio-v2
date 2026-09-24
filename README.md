# Manouk Bislick — Portfolio v2

A calm, green portfolio built with **Next.js (App Router)**, **Storyblok**, **Tailwind CSS v4** and **GSAP**, hosted on **Vercel**.

- Pages: Home, About, Projects (+ case studies), Blog (+ articles), Contact
- Every section is a Storyblok block — rearrange pages without touching code
- Atomic design system with reusable components
- Gentle animations that switch off automatically for `prefers-reduced-motion`
- Works without Storyblok too: placeholder content is built in, so `npm run dev` always shows a complete site

## Quick start

```sh
npm install
cp .env.example .env.local   # fill in at least STORYBLOK_DELIVERY_API_TOKEN
npm run dev                  # https://localhost:3000 (HTTPS for the Visual Editor)
```

Without a Storyblok token the site renders the placeholder content from `src/data/fallback` and the Markdown drafts in `content/blog`.

## Project structure

```
src/
  app/                    routes (App Router) + server action for the contact form
  components/
    atoms/                Button, Heading, Text, Tag, Icon, Input, SbImage …
    molecules/            ProjectCard, ArticleCard, TimelineItem, FormField …
    organisms/            Hero, Timeline, Skills, ProjectGrid, ContactForm, SiteHeader …
    templates/            ProjectTemplate, ArticleTemplate
    animations/           GSAP building blocks: Reveal, SplitReveal, ImageReveal,
                          Parallax, Float, Magnetic, BotanicalLine, CountUp …
    bloks/                Storyblok adapters: map blok data → organism props
  lib/                    Storyblok client, data fetching, helpers
  data/fallback/          placeholder content (same shape as Storyblok)
content/blog/             monthly article drafts in Markdown + topic ideas
scripts/                  Storyblok setup and blog-draft scripts
```

**Atoms → molecules → organisms → templates** never import Storyblok. The `bloks/` layer is the only place that knows about the CMS, which keeps the design system reusable.

### Design tokens

Defined in `src/app/globals.css` (`@theme`): `cream`, `sage` (green scale) and `blush` colours, Poppins (`font-sans`) + Cormorant Garamond (`font-serif`, self-hosted in `src/fonts`), fluid `text-display` / `text-title` sizes and the `rounded-arch` shape.

In any heading field in Storyblok you can write `I build *calm* websites` — the words between asterisks become an italic green accent.

## Storyblok

### 1. Push the content model and placeholder content

Create a personal access token (Storyblok → My account → Personal access tokens), add it and your space ID to `.env.local`, then run:

```sh
npm run storyblok:setup              # components + placeholder pages/projects/article
npm run storyblok:setup -- --dry-run # preview first
npm run storyblok:setup -- --components  # only update the components
```

This creates all blocks (grouped as _Content types_, _Sections_ and _Items_), the pages `home`, `about`, `contact`, the folders `projects/` and `blog/` with their overview pages, sample projects (as drafts) and the first blog article (as a draft). Existing stories are left alone unless you pass `--force` — except the blueprint's original `home` story, which is replaced.

### 2. Content types

| Content type | Where                                            | Rendered at        |
| ------------ | ------------------------------------------------ | ------------------ |
| `page`       | `home`, `about`, `contact`, `projects/`, `blog/` | `/`, `/about`, …   |
| `project`    | `projects/<slug>`                                | `/projects/<slug>` |
| `article`    | `blog/<slug>`                                    | `/blog/<slug>`     |

Section blocks: `hero`, `page_hero`, `marquee`, `pillars`, `text_image`, `facts`, `timeline`, `skills`, `featured_projects`, `project_grid`, `article_index`, `latest_articles`, `rich_text`, `cta`, `contact_section`.

### 3. Visual Editor

- **Local:** Settings → Visual Editor → `https://localhost:3000/` (draft content is always used in `npm run dev`).
- **Production:** add a preview URL `https://<your-domain>/api/draft?secret=<STORYBLOK_PREVIEW_SECRET>&slug=` — it enables Next.js Draft Mode and forwards the editor parameters.
- The `home` story's _Real path_ is `/`.

### 4. Publishing & caching

Pages are statically generated and refreshed every hour. For instant updates, add a webhook in Storyblok (Settings → Webhooks → _Story published & unpublished_):

```
https://<your-domain>/api/revalidate?secret=<STORYBLOK_WEBHOOK_SECRET>
```

## Blog — one article a month

1. At the start of every month a scheduled Claude task writes a new article (AI, Next.js, React or Storyblok) to `content/blog/YYYY-MM-slug.md` and reminds you.
2. Get it into Storyblok as a **draft**, either:
   - `npm run blog:push` from your own terminal, or
   - commit & push the file — a GitHub Action creates the draft. To enable it, move `scripts/blog/github-workflow-blog-drafts.yml` to `.github/workflows/blog-drafts.yml` and add the `STORYBLOK_MANAGEMENT_TOKEN` secret and `STORYBLOK_SPACE_ID` variable in GitHub.
3. Review, add a cover image and publish in Storyblok.

Topic ideas live in [`content/blog/IDEAS.md`](content/blog/IDEAS.md).

## Contact form

`src/app/contact/actions.js` is a Server Action that validates the form, filters bots (honeypot + minimum fill time) and sends the message with [Resend](https://resend.com). Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` (a sender on a domain verified in Resend). In development without a key, messages are logged to the terminal instead.

## Environment variables on Vercel

`STORYBLOK_DELIVERY_API_TOKEN`, `STORYBLOK_REGION`, `STORYBLOK_PREVIEW_SECRET`, `STORYBLOK_WEBHOOK_SECRET`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.

Never add `STORYBLOK_MANAGEMENT_TOKEN` to Vercel — it's only for the local scripts and the GitHub Action.

## Scripts

| Command                   | What it does                                |
| ------------------------- | ------------------------------------------- |
| `npm run dev`             | Dev server over HTTPS                       |
| `npm run build` / `start` | Production build / server                   |
| `npm run lint`            | ESLint (Next.js config)                     |
| `npm run format`          | Prettier                                    |
| `npm run storyblok:setup` | Push components + placeholder content       |
| `npm run blog:push`       | Create Storyblok drafts from `content/blog` |

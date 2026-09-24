---
title: Building a calm portfolio with Next.js, Storyblok and GSAP
slug: building-a-calm-portfolio
date: 2026-09-24
excerpt: How I rebuilt my portfolio around one idea — calm — using atomic design, a headless CMS and animations that stay out of the way.
tags: [Next.js, Storyblok, GSAP, Tailwind CSS]
cover: /images/placeholders/article-1.svg
seo_description: A walkthrough of my new portfolio — Next.js App Router, Storyblok blocks, Tailwind CSS v4 atomic design and gentle GSAP animations that respect reduced motion.
---

Most portfolios try to impress you in the first second. I wanted mine to do the opposite: slow down, take a breath and let the work speak. This post is a look behind the scenes of how I built it — the stack, the structure and a few small tricks I'm quite happy with.

## The idea: calm, but not boring

I started with a mood rather than a wireframe. Light cream backgrounds, sage and forest greens, lots of white space. For type I paired **Poppins** — my long-time favourite — with **Cormorant Garamond**, a classic serif that brings a bit of warmth to the headings. Italic serif accents do the heavy lifting for emphasis, so the layout can stay quiet.

The rule for motion was simple: animations are allowed if they help you read. Headlines rise line by line, images unveil slowly, a botanical line draws itself next to the page title. Nothing bounces, nothing blinks.

## The stack

- **Next.js** (App Router, React Server Components) for routing, rendering and incremental static regeneration.
- **Storyblok** as the headless CMS, so every section is a block I can move around without touching code.
- **Tailwind CSS v4** for the design tokens and utilities.
- **GSAP** for the animations — SplitText, ScrollTrigger, DrawSVG and Flip are all part of the free package now.
- **Vercel** for hosting and preview deployments.

## Atomic design, for real

I organised the components the way Brad Frost describes in *Atomic Design*:

- **Atoms** — `Button`, `Heading`, `Tag`, `Icon`, `Input`. No data fetching, no CMS knowledge.
- **Molecules** — `ProjectCard`, `ArticleCard`, `TimelineItem`, `FormField`.
- **Organisms** — full sections such as `Hero`, `Timeline`, `ProjectGrid` and `ContactForm`.
- **Templates** — page layouts for a single project or article.

The part that made this click for me was adding one extra layer: **bloks**. These are tiny adapters that take raw Storyblok data and map it onto organism props.

```jsx
// src/components/bloks/TimelineBlok.jsx
export default function TimelineBlok({ blok }) {
  const items = (blok.items ?? []).map((item) => ({
    id: item._uid,
    period: item.period,
    title: item.title,
    place: item.place,
    description: item.description,
    attrs: storyblokEditable(item),
  }));

  return <Timeline eyebrow={blok.eyebrow} title={blok.title} items={items} />;
}
```

Because of that split, the organisms don't know Storyblok exists. If I ever switch CMS, only the bloks change.

## Emphasis without a rich text field

Editors (me) love a single text field for headings, but I still wanted those italic serif accents. The solution is a tiny helper that turns `*word*` into an accent:

```jsx
<Heading>Hi, I'm Manouk. I build *calm*, thoughtful websites.</Heading>
```

A small detail made a surprising difference: the helper keeps punctuation that follows an accent together with it, so a comma never ends up alone at the start of a line when the heading is split into animated lines.

## Motion that respects people

Every animation lives in a small client component — `Reveal`, `SplitReveal`, `ImageReveal`, `Parallax` — and every one of them runs inside `gsap.matchMedia()`:

```js
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  gsap.from(el, { autoAlpha: 0, y: 32, duration: 1.3, ease: 'expo.out' });
});
```

If someone prefers reduced motion, nothing moves and everything is visible straight away. To avoid a flash of content before GSAP takes over, a tiny inline script in the `<head>` adds a class only when motion is welcome — and removes it again if GSAP hasn't started after a few seconds. The content is never stuck invisible.

## Storyblok, block by block

Each page is a `page` story with a list of blocks: `hero`, `marquee`, `timeline`, `skills`, `featured_projects`, `cta` and so on. Projects and articles are their own content types in the `projects` and `blog` folders.

Some blocks fetch their own data. The `featured_projects` block, for example, is an async Server Component: I can hand-pick projects in Storyblok, and if I don't, it falls back to projects marked as *featured*. The Visual Editor still shows live changes thanks to the `StoryblokStory` component and Next.js Draft Mode.

## What's next

This blog is part of the plan. Every month I'll write about something I'm learning — AI in my workflow, Next.js, React or Storyblok. If there's a topic you'd like me to dig into, [send me a message](/contact). I'd love to hear from you.

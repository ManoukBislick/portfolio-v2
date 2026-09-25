# Blog ideas

A backlog for the monthly article. Pick one, or let the monthly task pick the most
relevant one, and move it to "Written" once it's published.

Focus: AI, Next.js, React and Storyblok, from the point of view of a frontend developer
who cares about CSS, accessibility and websites that are easy to maintain.

## What makes a good post

- Your own experience is more useful than news. A bug you fixed, a migration or a
  component you're proud of says more than a summary of release notes. Use the news as
  the reason to write, and your experience as the content.
- Show code. Short, real snippets from your own projects.
- CSS is your strong point. Posts about layout, typography or animation details stand
  out between all the framework posts.

## Backlog

### Next.js

- Next.js 16.3 "Instant Navigations" in a real project: try `cacheComponents` and
  `partialPrefetching` on this portfolio and write down what changed. (16.3, Aug 2026)
- Custom error boundaries with `catchError`: retrying failed Server Components without
  breaking `notFound()` or `redirect()`. (16.3)
- JSON files or a headless CMS for a small personal site? What each costs you in
  setup, editing and publishing, with this portfolio as the example.

### React

- The React Compiler: can I delete my `useMemo`s now? A before and after on a real
  component, including the experimental Rust compiler in Next.js 16.3.
- `<Activity />` and `useEffectEvent` explained with UI you know: tabs, a mobile menu,
  a video player. (React 19.2)
- Forms with `useActionState` and Server Actions: validation, honeypots and forms that
  work without JavaScript.

### Storyblok

- Content models as code: this site's components live in `scripts/storyblok/schema.mjs`
  and one command pushes them. Compare with `@storyblok/schema`. (1.0, July 2026)
- Storyblok Environments: testing schema changes and automations without touching
  production. (Aug 2026)
- A first look at Storyblok Agents: asking your CMS which content is outdated or missing
  translations. (Sep 2026, Storyblok Labs)
- Atomic design with a headless CMS: mapping CMS blocks to atoms, molecules and organisms.

### AI in frontend work

- How I use AI while writing CSS: where it helps (boilerplate, edge cases, explaining a
  spec) and where it doesn't (taste, details).
- AGENTS.md and version-matched docs: getting coding assistants to follow your project's
  conventions. (Next.js 16.3 writes an AGENTS.md block for you.)
- Accessibility checks with AI: a practical checklist, and what still needs a person.

### Motion and CSS

- Subtle animation with GSAP: SplitText masks, DrawSVG, and doing reduced motion right.
- Modern CSS I use every day: container queries, `:has()`, `text-wrap: balance`, view
  transitions.

## Written

- 2026-09: How I built this portfolio

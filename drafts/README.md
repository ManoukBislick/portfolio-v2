# Blog drafts

Every month a scheduled task writes a draft here and sends you a reminder.
You can also write one yourself.

## Putting a draft in Storyblok

```sh
npm run blog:push
```

This adds every draft that isn't in Storyblok yet as an **unpublished** article in the
Blog folder, and prints a link to it. Read it in Storyblok, change what you want, add a
cover image and press **Publish**. You can delete the file here afterwards.

To push one file: `npm run blog:push -- drafts/2026-10-my-post.md`.
To overwrite an article that is already in Storyblok: add `-- --force`.

## Format

One Markdown file per article, named `YYYY-MM-<slug>.md`. The slug becomes the URL:
`2026-10-ai-and-css.md` ends up at `/blog/ai-and-css`.

```md
---
title: How I use AI while writing CSS
date: 2026-10-01
excerpt: One or two sentences for the blog overview.
tags: AI, CSS
seo_description: Optional. Uses the excerpt when empty.
---

The article in Markdown. **Bold**, _italic_, `code`, [links](https://example.com),
lists, > quotes and fenced code blocks all become rich text in Storyblok.

## A heading
```

Ideas for new posts are in [IDEAS.md](IDEAS.md).

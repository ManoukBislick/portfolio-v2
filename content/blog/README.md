# content/blog

Monthly article drafts, one Markdown file per article.

- File name: `YYYY-MM-slug.md` (e.g. `2026-10-react-compiler-in-practice.md`)
- Front matter: `title`, `slug`, `date`, `excerpt`, `tags`, optional `cover` and `seo_description`
- Body: Markdown (GitHub-flavoured — tables, code blocks and task lists work)

These files are the source for Storyblok drafts (`npm run blog:push`, or automatically via the
GitHub Action on push). Once an article is in Storyblok, Storyblok is the source of truth —
edits you make there are not synced back here.

When no Storyblok token is configured, the site shows these files directly, so you can preview
a draft locally with `npm run dev`.

See `IDEAS.md` for the topic backlog.

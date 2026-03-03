# Demo Project for Video Production Agency Landing Page

A portfolio landing page for a fictional video production agency, built with **Astro 5**, **Tailwind CSS v4**, and **Markdown content collections**.

## Stack

- **Astro 5** — static site generator with component islands
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin
- **Markdown** — case studies and blog posts powered by Astro Content Collections (`glob` loader)
- **CSS Custom Properties** — light/dark theme with a toggle button

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, selected work, blog previews, contact |
| `/portfolio/` | Full portfolio listing |
| `/blog/` | All blog posts |
| `/cases/[id]/` | Individual case study (rendered from markdown) |
| `/blog/[id]/` | Individual blog post (rendered from markdown) |

## Content

Markdown files live in `src/content/`:

- **`cases/`** — Project case studies with video URLs, image galleries, and tags
- **`blog/`** — Posts on cinematic lighting and camera selection

Schemas are defined in `src/content.config.ts` with Zod validation.

## Dark Mode

Implemented via CSS custom properties on `:root` / `:root.dark`. The toggle in the navbar persists the choice to `localStorage`. Light by default.

## Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # preview the build
```

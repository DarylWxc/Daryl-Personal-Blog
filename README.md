# DarylWxc's Blog (Astro)

A personal blog built with [Astro](https://astro.build), migrated from a
Hexo + [Butterfly](https://butterfly.js.org) site. The Butterfly look —
banner header, left sidebar cards, dark mode, TOC, code copy buttons,
gradient footer, fixed music player — is recreated in pure Astro (no UI
framework), with all interactivity handled by small vanilla scripts.

## Commands

| Command           | Action                                      |
| ----------------- | ------------------------------------------- |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start dev server at `localhost:4321`        |
| `npm run build`   | Build the production site to `./dist/`      |
| `npm run preview` | Preview the production build locally        |

## Structure

```
src/
├─ content.config.ts   # posts collection (glob loader + zod schema)
├─ consts.ts           # site metadata, nav, social links
├─ content/posts/      # 109 migrated markdown posts (8 with co-located images)
├─ layouts/            # BaseLayout, PageLayout, PostLayout
├─ components/         # Nav, Sidebar, PostCard, Toc, Footer, MusicPlayer, ...
├─ lib/                # posts, taxonomy, categories, slug, excerpt helpers
├─ pages/              # [...page] (home), posts/, archives/, tags/, categories/, about/link/music, 404
└─ styles/             # global, code, post, animations
```

## Writing posts

Add a markdown file to `src/content/posts/`. Frontmatter:

```yaml
---
title: My Post
date: 2025-01-01 12:00:00
tags:
  - Example
categories: Web前端
---
```

`tags` / `categories` accept either a single value or a list. Posts with
images: create a folder `src/content/posts/<name>/index.md` and drop the
images alongside it, referencing them relatively (`![alt](image.png)`).

## Notes

- Category names are case-normalized (`Web前端` and `web前端` merge).
- Post URLs keep CJK filenames verbatim (e.g. `/posts/css基础/`).
- The fixed music player and Music page embed a NetEase playlist; update the
  id in `src/consts.ts` (`neteasePlaylist`).

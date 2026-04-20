# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server at http://localhost:5173/
npm run build    # Production build to dist/
npm run lint     # ESLint (quiet mode — only errors, no warnings)
npm run preview  # Preview the production build locally
```

No test suite exists. Deployments happen automatically — pushing to `main` triggers GitHub Actions, which builds and deploys to the `gh-pages` branch (~2–3 min). The site is live at https://reformordie.com via a custom domain (configured via `public/CNAME`).

**Never manually edit the `gh-pages` branch** — it is fully managed by CI.

## Architecture

Single-page React app (Vite + Tailwind + Framer Motion). One route (`/`) renders the `Home` page; everything else hits `PageNotFound`. No backend, no auth, no state management library.

### Page composition

`Home.jsx` stacks four components in order:

1. **`Header`** — Fixed nav with scroll-aware backdrop blur. Links back to `#top`. Ko-fi support button.
2. **`HeroSection`** — Full-screen gradient section with the podcast cover image, animated title, and scroll-driven parallax on the tagline text.
3. **`ListenSection`** — Platform tiles (Spotify, Apple Podcasts, YouTube, Substack). Mobile renders a 2-column grid; desktop renders a scroll-driven parallax row via Framer Motion `useScroll`/`useTransform`. Platform data (name, URL, gradient, logo JSX) lives in a `platforms` array at the top of `ListenSection.jsx`.
4. **`TickerFooter`** — Animated ticker tape + "Join The Reform" RSS CTA + bottom footer links.

### Key patterns

- **`PlatformTile`** receives a `platform` object (`{ name, url, gradient, logo }`) and `index`. Gradient is a Tailwind `bg-gradient-to-br` string applied inline. Logo is a JSX element passed as a prop.
- **Images** are referenced with `import.meta.env.BASE_URL` prefix (e.g., `` `${import.meta.env.BASE_URL}images/ROD-Main-D.png` ``) so the path resolves correctly regardless of base path changes.
- **`@/`** alias resolves to `src/`.
- Tailwind CSS variables are defined in `src/index.css` and follow shadcn/ui HSL convention (`--primary`, `--foreground`, etc.), even though no shadcn components are used.
- `tailwind.config.js` has `darkMode: ["class"]` — harmless, as no `.dark` CSS block exists.

## Color Palette

| Name | Hex | CSS Variable / Usage |
|---|---|---|
| Muted Teal | `#79B791` | `--primary` (hsl 143 30% 42%) |
| Celadon | `#ABD1B5` | Supporting |
| Mint Cream | `#EDF4ED` | Hero gradient start |
| Espresso | `#51291E` | Supporting |
| Rich Mahogany | `#301014` | `--foreground` |

## Platform Links (canonical)

- Spotify: `https://open.spotify.com/show/4JiVd7NQay86Xah5k9Q02A`
- Apple Podcasts: `https://podcasts.apple.com/us/podcast/reform-or-die/id1875146399`
- YouTube: `https://www.youtube.com/channel/UCWRp5w3fCvqBnGETu_QVzng`
- RSS: `https://media.rss.com/reform-or-die/feed.xml`
- Substack: `https://reformordie.substack.com`
- Ko-fi: `https://ko-fi.com/R6R71X70Y8`

These URLs appear in multiple places (`ListenSection.jsx`, `TickerFooter.jsx`). Update all occurrences if they change.

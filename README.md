# Tasnim Fariha — Academic Portfolio

Personal academic portfolio highlighting research first, built with **React 19 + TypeScript + Vite**, styled with the Wowchemy (Hugo Academic) theme CSS to match the reference design.

## Sections

About → Research → Experience → Projects → Honors and Awards → Skills → Activities

## Getting started

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

## Project structure

- `src/data/profile.ts` — **all site content lives here** (bio, publications, experience, projects, awards, skills, links). To update the CV content, edit only this file.
- `src/components/` — presentational components (`Navbar`, `About`, `Research`, `Experience`, `Projects`, `Awards`, `Skills`, `Activities`, `Footer`, shared `Section` shell).
- `src/hooks/useScrollSpy.ts` — active-section tracking for the navbar highlight.
- `public/css/`, `public/webfonts/` — Wowchemy theme stylesheets and Font Awesome fonts (loaded from `index.html`).
- `public/media/avatar.png` — profile photo placeholder. **Replace it with a real square photo** (rendered as a circle).

## Deploy

`vite.config.ts` sets `base: './'`, so the `dist/` build works on GitHub Pages (any path) or any static host. For GitHub Pages: build, then publish the `dist/` folder (e.g. with a GitHub Action or the `gh-pages` package).

## Note

The `_to_delete/` folder (if present) contains the superseded static version of the site — safe to delete.

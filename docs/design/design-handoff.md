# Design Handoff: Research Portfolio — Design Layer v1

**Status:** applied to the working tree on `main`. Not committed — review, then commit or `git checkout` to revert.
**Approach:** an override layer on top of `public/css/wowchemy.css`, plus four small component fixes. The theme is untouched.
**Verified against:** Chromium 1440×900 and 390×844, axe-core 4.x (0 violations), `tsc -b` and `oxlint` clean, WCAG 2.1 AA contrast computed per pair.

---

## 1. What changed

| File | Change | Lines |
|---|---|---|
| `src/custom.css` | The design layer — tokens, `@font-face`, overrides | +735 |
| `index.html` | Dropped the Google Fonts request, preload the two first-paint faces, `theme-color` → `#14539a` | ±27 |
| `public/fonts/*.woff2` | 5 vendored font files | new |
| `src/App.tsx` | `<div className="page-body">` → `<main id="main">`; `Footer` moved outside it | ±6 |
| `src/components/About.tsx` | `aria-hidden` → `aria-label`; name → `<h1>`; role/org `<h3>` → `<p>` | ±14 |
| `src/components/Section.tsx` | Section title `<h1>` → `<h2>` | ±5 |
| `src/data/profile.ts` | Added the Activities nav entry | +1 |

**`package.json` is untouched — zero new dependencies.**

### Nothing to install

Fonts are vendored as five woff2 files in `public/fonts/`, declared with `@font-face` at the top of `custom.css`. They came from `@fontsource-variable` (SIL OFL 1.1), weight-axis latin subsets only.

```
inter-latin-wght-normal.woff2               48 KB   ← preloaded
inter-latin-wght-italic.woff2               51 KB   (publication venues)
inter-latin-ext-wght-normal.woff2           85 KB   (only if a diacritic appears)
source-serif-4-latin-wght-normal.woff2      50 KB   ← preloaded
source-serif-4-latin-ext-wght-normal.woff2  42 KB   (only if a diacritic appears)
```

280 KB on disk; a typical visitor downloads **~99 KB** — the browser skips the `latin-ext` faces unless the page contains one of their codepoints, which yours currently doesn't. Verified: the built page makes zero requests to `fonts.googleapis.com` and fetches only the three latin faces.

`font-display: swap` on all five, so text paints in the fallback immediately rather than blocking.

---

## 2. Design Tokens

All exposed as custom properties on `:root`. Change a value here, not in a rule.

### Colour

| Token | Value | Use | Contrast on `--surface` |
|---|---|---|---|
| `--ink-900` | `#16191d` | Headings, card titles, publication titles | 17.63:1 ✅ AAA |
| `--ink-700` | `#2f343b` | Body copy, list items | 12.54:1 ✅ AAA |
| `--ink-500` | `#5b6470` | Metadata, dates, company, section labels | 6.00:1 ✅ AA |
| `--ink-300` | `#8b93a0` | Icons, list markers — **decorative only, never text** | 3.10:1 |
| `--surface` | `#ffffff` | Page and card background | — |
| `--surface-sunken` | `#fafbfc` | Reserved (unused in v1) | — |
| `--rule` | `#e4e7ec` | Hairlines, card borders, section dividers | 1.24:1 (non-text) |
| `--rule-strong` | `#cfd4dc` | Button borders, timeline dots | 1.49:1 (non-text) |
| `--accent` | `#14539a` | Links, active nav, current-role dot | 7.68:1 ✅ AAA |
| `--accent-hover` | `#0f3f76` | Link/button hover | 10.54:1 ✅ AAA |
| `--accent-wash` | `#eef3fa` | Button hover fill | accent on wash: 6.89:1 ✅ AA |
| `--focus` | `#14539a` | Focus ring | — |

One accent, replacing the `#1565c0` / `#2962ff` split. Every text pair passes AA; all but two pass AAA.

### Type

Root is normalised to **16px** (`html { font-size: 16px }`) — the theme pins it to 18px, which inflates every rem in the stack by 12.5%.

| Token | Computed | Family | Weight | Applied to |
|---|---|---|---|---|
| `--text-xs` | 14px | sans | 500/600 | Buttons, `EDUCATION`/`INTERESTS` labels |
| `--text-sm` | 15px | sans | 400/500 | Nav links, dates, company, citation authors, footer |
| `--text-base` | 17px | sans | 400 | Body copy, card bullets, interests |
| `--text-md` | 18px | **serif** | 600 | Card titles, publication titles |
| `--text-lg` | 21px | **serif** | 600 | Section titles |
| `--text-xl` | 29px | **serif** | 600 | Name |

To resize the page again, change these six numbers. Changing `html { font-size }` instead scales the px-based tokens (`--nav-h`, avatar, dot sizes) along with the type, which is usually not what you want.

**The theme actively fights font-size overrides**, so several of these need `!important`:

| Theme rule | Effect | Override |
|---|---|---|
| `.section-subheading { font-size: 1rem !important }` | Pinned every card title and the `EDUCATION`/`INTERESTS` labels to 16px regardless of specificity | `--text-md` / `--text-xs`, `!important` |
| `.experience .card-text, .experience .card-text p { font-size: .75rem !important; color: #000 !important }` | **Pinned all card body copy to 12px** — experience bullets, project descriptions. `.card.experience.course` means it hit Projects and Awards too | `--text-base` + `--ink-700`, `!important` |

That second one was the smallest text on the page and it carried the actual substance of every role and project.

**Families**

```css
--font-serif: 'Source Serif 4 Variable', 'Source Serif 4', Charter, Georgia, 'Times New Roman', serif;
--font-sans:  'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

The `<Name> Variable` names match the `@font-face` blocks; the plain names are kept as a fallback so a Google Fonts `<link>` would also work if you ever switch back to CDN loading.

**Line height:** `--leading-tight: 1.25` (headings) · `--leading-snug: 1.45` (titles, metadata) · `--leading-body: 1.65` (prose)

**Measure:** `--measure: 68ch` on top-level prose. Bio goes 830px / 83ch → 729px / 66ch at 1440px (`ch` scales with font size, so the measure tracks the type). Scoped to `#about .article-style > p` so it doesn't cap text already constrained by a card.

### Spacing — 4px base

| Token | Value | | Token | Value |
|---|---|---|---|---|
| `--space-1` | 4px | | `--space-5` | 24px |
| `--space-2` | 8px | | `--space-6` | 32px |
| `--space-3` | 12px | | `--space-7` | 48px |
| `--space-4` | 16px | | `--space-8` | 64px |

| Semantic | Value | Note |
|---|---|---|
| `--space-section` | 72px → 48px `<992px` → 40px `<576px` | Was a flat inline `30px` |
| `--space-card-y` | 20px | Card body vertical padding |
| `--space-card-x` | 24px → 18px `<992px` | Card body horizontal padding |
| `--radius` | 6px | Cards and buttons |
| `--nav-h` | 64px | Also drives `scroll-margin-top` |

---

## 3. Component Specs

### Navbar

- 64px min-height, `rgba(255,255,255,.92)` + `backdrop-filter: blur(8px)`, 1px `--rule` bottom border, no shadow
- Brand: serif 18px/600 `--ink-900`
- Link: sans 15px/500 `--ink-500`, 8px/12px padding, transparent 2px bottom border
- Hover: `--ink-900`
- **Active: `--ink-900` + 2px `--accent` bottom border** — was colour-only
- Focus-visible: 2px `--accent` outline, 2px offset
- Toggler: 44×44 minimum
- **Collapsed drawer (<992px):** the active marker moves to a 2px *left* border plus an `--accent-wash` fill. A bottom border on a full-width block link reads as a row divider, not a marker.

### Section

- `--space-section` vertical padding, `!important` to beat the components' inline `style={{ padding: '30px 0 30px 0' }}`
- Flat `--surface` throughout; `.home-section + .home-section` gets a 1px `--rule` top border. Replaces the alternating `#f7f7f7` bands — which is also what clears the two contrast failures, since `rgba(0,0,0,.54)` was compositing to 4.49:1 over grey
- Title: serif 21px/600, `inline-block`, 12px bottom padding, **2px `--ink-900` underline**
- `position: sticky; top: 96px` at ≥992px — the title column is 400px wide and mostly empty, so it may as well hold the title in view while you read the section
- Left-aligned at all widths (theme centred it below 992px)
- `scroll-margin-top: 80px`

### Card

- 1px `--rule` border, 6px radius, **no shadow**; border → `--rule-strong` on hover
- Body padding `--space-card-y` / `--space-card-x`; 16px between cards
- **Title: serif 18px/600 `--ink-900`** — the hierarchy fix. Needs `!important` to beat `.text-muted { color: rgba(0,0,0,.54) !important }`
- Company: sans 15px/500 `--ink-500`
- Meta: sans 15px/400 `--ink-500`
- Body: sans 17px/400 `--ink-700`, 1.65; markers `--ink-300`. Was 12px, pinned by a theme `!important`

### Publication list item

- Hairline-separated rows, 24px vertical padding, 32px left indent for the icon; first item flush top, last has no rule
- Icon absolutely positioned, `--ink-300`
- **Title: serif 18px/600 `--ink-900`, no resting underline.** Underline appears on hover/focus. It's set apart from the surrounding sans citation by typeface, size, weight *and* colour, so it isn't signalled by colour alone (WCAG 1.4.1)
- Authors: sans 15px `--ink-500`; your name `600` + `--ink-900`
- Venue: `--ink-500`, italic, `font-weight: 500` — was `<em><strong>`, i.e. italic + bold + serif for one field

### Button (`.btn-page-header`)

- sans 14px/500 `--accent`, transparent fill, 1px `--rule-strong` border, 6px radius
- 6px/12px padding, **32px min-height** (was 25px)
- Hover: `--accent-wash` fill, `--accent` border, `--accent-hover` text
- `@media (pointer: coarse)`: **44px min-height**, 10px/16px padding

### Links

- In-prose (`.article-style a`): `--accent`, underline at `--rule-strong`, 1px, `0.18em` offset; hover darkens text and underline to `currentColor`
- Global focus-visible: 2px `--accent` outline, 2px offset, 2px radius

### Social icons

- Anchor `min-width/min-height: 44px`, flex-centred — **20px → 44px target, icon still renders at 20px**
- `--ink-500` → `--accent` on hover; theme's `scale(1.2)` on the `<li>` removed

### Experience timeline

- Rail: `--rule`. Theme paints it `#1565c0`; the override must match its selector specificity (`.experience .col.border-right`) to win
- Dot: 12px, 2px `--rule-strong` border, white fill
- **Current role: `--accent` fill + border** — the only saturated colour left in the section

### Skills / Activities

- The components render bare `<p><strong>Label</strong> …`. Each row gets 12px bottom padding + a `--rule` divider (last row none), capped at `--measure`
- Label: `600` `--ink-900`; body `--ink-700` at 1.45

### Footer

- 1px `--rule` top border, 32px padding, centred, sans 15px `--ink-500`

---

## 4. Responsive

| Breakpoint | Changes |
|---|---|
| ≥992px | Full 4/8 split; section titles sticky |
| <992px | `--space-section` 48px, `--space-card-x` 18px, sticky off, titles left-aligned, profile block centred |
| <576px | `--space-section` 40px, avatar 176px → 132px, publication indent 32px → 24px |
| `print` | Navbar hidden, section padding 16px, sticky off, links to `--ink-900` |
| `prefers-reduced-motion` | `scroll-behavior: auto` |

---

## 5. Known `!important` usage

Thirteen rules, each unavoidable and commented at the point of use:

| Rule | Beats |
|---|---|
| `.home-section` padding | Inline `style={{ padding: '30px 0 30px 0' }}` in `Section.tsx` / `About.tsx` |
| `.home-section` padding (print) | Same inline style |
| `.section-heading` align-items | `.align-items-center` Bootstrap utility |
| `.section-heading h1, h2` font-size | Theme's `font-size: 1.5rem !important` |
| `.nav-link.active` colour | Theme's `!important` |
| `.pub-list-item` margin-bottom | Inline `style={{ marginBottom: '1rem' }}` in `Research.tsx` |
| Card title colour | `.text-muted { color: rgba(0,0,0,.54) !important }` |
| Card company colour | Same |
| `.exp-meta` / card metadata colour | Same |
| `.row.experience .col.py-2` padding | Bootstrap `py-2` utility |
| `.experience .col.border-right` | Theme's `border-color: #1565c0 !important` |
| `.experience .badge-pill` border | Theme's `!important` |
| `.experience .badge-pill.exp-fill` border-colour | Same |

Deleting the two inline `style` props (`Section.tsx`, `About.tsx`) and the one in `Research.tsx` would drop four of these.

---

## 6. Component changes applied

Four structural fixes. All three axe violations are cleared and the document outline is correct.

**`src/components/About.tsx`**

```diff
- <h2>{profile.name}</h2>
- <h3>{profile.role}</h3>
- <h3>
+ <h1>{profile.name}</h1>
+ <p className="portrait-role">{profile.role}</p>
+ <p className="portrait-role">
      <a href={profile.organization.url} target="_blank" rel="noopener">
        <span>{profile.organization.name}</span>
      </a>
- </h3>
+ </p>

- <ul className="network-icon" aria-hidden="true">
+ <ul className="network-icon" aria-label="Contact and profiles">
```

`aria-hidden="true"` was hiding three keyboard-focusable links from screen readers — a keyboard user could tab into a link their screen reader would not announce (axe: `aria-hidden-focus`, serious). Role and organisation became `<p className="portrait-role">`: they don't introduce sections, so they were never headings. The CSS styles `.portrait-role` and `h3` identically, so nothing moves visually.

**`src/components/Section.tsx`**

```diff
- <h1 className="mb-0">{title}</h1>
+ <h2 className="mb-0">{title}</h2>
```

**`src/App.tsx`**

```diff
- <div className="page-body">
+ <main className="page-body" id="main">
    <About /> … <Activities />
-   <Footer />
- </div>
+ </main>
+ <Footer />
```

The footer moved out of `<main>` — a site footer is a `contentinfo` landmark in its own right, not main content.

**`src/data/profile.ts`**

```diff
    { label: 'Skills', target: 'skills' },
+   { label: 'Activities', target: 'activities' },
  ],
```

Nav is now 7 items for 7 sections. Scroll-spy confirmed highlighting `Activities` when that section is in view.

### Still recommended — needs your URLs

The single highest-value addition to this page, and it isn't a design change:

```ts
social: [
  // …existing
  { label: 'Google Scholar', icon: 'ai ai-google-scholar',
    url: 'https://scholar.google.com/citations?user=YOUR_ID' },
  { label: 'CV', icon: 'far fa-file-pdf', url: '/media/your-cv.pdf' },
],
```

`academicons` is already loaded in `index.html`, so `ai ai-google-scholar` and `ai ai-orcid` work with no new dependency. Drop the PDF in `public/media/`.

## 7. Verification performed

| Check | Result |
|---|---|
| `tsc -b` | ✅ clean |
| `oxlint` | ✅ clean, exit 0 |
| `npm run build` | ✅ CSS 12.9 kB → 3.1 kB gzipped |
| axe-core WCAG 2.1 A/AA + best-practice | ✅ **0 violations, 35 passes** (was 3 violations) |
| Heading outline | ✅ `h1: Tasnim Fariha` → six `h2` section titles (was six `h1`, no page title) |
| Contrast, all 8 text tokens | ✅ AA; 6 of 8 also AAA |
| Font loading | ✅ `Inter Variable` + `Source Serif 4 Variable` resolve; **0 requests to fonts.googleapis.com**; `latin-ext` faces correctly not fetched |
| Touch targets | Buttons 25→32px (44px coarse), social links 20→44px, nav toggler 44×44 |
| Measure | 83ch → 66ch at 1440px |
| Every rendered font size | ✅ audited via `getComputedStyle` against the token table — 16 elements checked |
| Keyboard focus | ✅ 2px `#14539a` ring on tab, verified on nav links |
| Scroll-spy | ✅ highlights `Activities` at `#activities` |
| Nav drawer at 390px | ✅ 7 items, left-border active marker |
| Rendered 1440×900 and 390×844 | ✅ full-page screenshots reviewed |

### Not verified

- **Safari and Firefox** — rendered in Chromium only. `backdrop-filter` on the navbar is prefixed; `text-underline-offset` degrades harmlessly; `format('woff2-variations')` is understood by all current browsers but if you want belt-and-braces, adding `format('woff2')` as a second `src` entry costs nothing.
- **Real-device touch testing.**
- **`--surface-sunken`** is defined but unused; it's there for a future dark-mode or callout treatment. Drop it if you'd rather not carry a dead token.
- The **avatar is still the generated `TF` placeholder** and remains the most visually dominant object on the page. No stylesheet fixes that.

---

## 8. Reverting

Nothing is committed. To undo everything:

```bash
git checkout index.html src/ && rm -rf public/fonts
```

To keep the component fixes but drop the visual layer, restore just `src/custom.css`.

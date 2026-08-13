# Design Critique: Tasnim Fariha — Research Portfolio

**Reviewed:** `main` @ `99e03d9`, built and rendered at 1440×900 and 390×844
**Stage:** working design, refinement pass
**Audience:** researchers, PhD admissions committees, hiring managers scanning for publications

---

## Overall Impression

The information architecture is right — About, Research, Experience, Projects, Awards, Skills, Activities is exactly the order a reviewer wants, and putting Research second is the single best decision on the page. The problem is that the visual system is working against that architecture: **the most important text on the page is the lightest text on the page**. Card titles, project names and award titles all render at `rgba(0,0,0,.54)` while the body copy beneath them is near-black, so the eye lands on descriptions instead of headlines. Fix the hierarchy inversion and tighten the type, and this goes from "competent Hugo theme" to something that reads as deliberate.

The palette itself is fine and worth keeping — one blue on white is the correct instinct for a formal academic page. It just isn't being applied consistently, and it's carrying too little of the load compared with weight and size.

---

## Usability

| Finding | Severity | Recommendation |
|---|---|---|
| **Activities section is unreachable from the nav.** There are 7 `<section id>` elements but only 6 nav links; `#activities` has no entry, so it exists only for people who scroll to the very bottom. | 🔴 Critical | Add `{ label: 'Activities', target: 'activities' }` to `profile.nav`. One line in `src/data/profile.ts`. |
| **No CV / résumé download, and no Google Scholar or ORCID link.** For the stated audience this is the number-one and number-two things they look for. Social links are email, GitHub, LinkedIn only. | 🔴 Critical | Add a `CV (PDF)` button next to the name and Scholar/ORCID to `profile.social`. This is the highest-value change on the page and it isn't a design change at all. |
| **Link buttons are 25px tall** (`arXiv`, `PDF`, `IEEE Xplore`, `Demo`, `GitHub`). These are the primary actions in the Research section. Below the 44×44 target minimum, and visually they read as tags rather than actions. | 🟡 Moderate | 32px on pointer devices, 44px under `@media (pointer: coarse)`. |
| **Social icon links are 36×20px** — the icon is 18px and the anchor wraps it tightly. | 🟡 Moderate | Give the anchor `min-width/min-height: 44px` with the icon centred; the visible icon size doesn't change. |
| **Nav active state is colour-only** (`#2962ff` vs `#34495e`). No underline, no weight change. | 🟡 Moderate | Add a 2px bottom rule on `.active`. Also fixes WCAG 1.4.1. |
| **In-prose bio links are colour-only** — `RocketPhone.ai` and `Military Institute…` are blue text with no underline inside a paragraph. | 🟡 Moderate | Underline with a light `text-decoration-color` and `text-underline-offset: 0.18em`. |
| Avatar is a generated `TF` placeholder. It's a saturated blue→teal gradient and it is, by a wide margin, the most visually dominant object on the page. | 🟡 Moderate | Replace with a photo. If you'd rather not use one, a flat monogram in `--ink-900` on `--surface-sunken` would stop it competing with the content. |
| The experience timeline rail is hidden below 576px (`d-none d-sm-flex`), so on mobile the cards lose their chronological cue entirely. | 🟢 Minor | Acceptable trade-off; the dates carry it. Worth knowing it's intentional theme behaviour, not a bug. |

---

## Visual Hierarchy

**What draws the eye first:** the gradient avatar, then the blue timeline rail in the Experience gutter. Neither is content. The avatar is a placeholder and the rail is structure — both are currently louder than any headline on the page.

**Reading flow:** the 4/8 column split means every section title sits alone in a 400px-wide column with ~370px of dead space beneath it, while the content column runs 830px wide. So the eye starts far left on a single word, jumps right, and then has to make an 83-character return sweep on every line of the bio. Both halves of that are working against comfortable reading.

**Emphasis — the core problem:**

| Element | Colour | Contrast on white | Reads as |
|---|---|---|---|
| Body copy | `#212529` | 15.4:1 | **primary** |
| Card title (`Software Engineer`, project names, award titles) | `rgba(0,0,0,.54)` | 4.6:1 | secondary |

The headline of every card is three times lighter than the paragraph under it. This is the one change that will make the biggest difference: card titles should be the darkest thing in the card.

Two more, smaller:

- **Section titles are 1.5rem with `!important`** while the name is 1.75em, so section titles are quieter than a single line of the About block. They're doing navigation work and should read as landmarks.
- **Publication venues are `<em><strong>` inside serif** — italic *and* bold *and* a separate typeface for one piece of metadata. Three signals for something that ranks below the title. Keep the italic, drop the bold.

**What the whitespace is doing:** sections are padded `30px 0` via an inline style on the `<section>` element, which overrides the theme's own `110px`. The result is a page that is generously spaced horizontally and cramped vertically — sections butt up against each other and rely entirely on the alternating grey band to separate. The proportions are inverted.

---

## Consistency

| Element | Issue | Recommendation |
|---|---|---|
| **Accent colour** | Two blues in use: `#1565c0` for links and the `theme-color` meta, `#2962ff` for the active nav item and brand hover. | Pick one. `#14539a` gives you 7.7:1 on white (AAA) and reads more formal than either. |
| **Fonts loaded vs used** | `index.html` requests **Montserrat, Roboto and Roboto Mono** — three families, five weights. Roboto Mono is never applied to a single element. Roboto only ever appears as the 4th fallback behind the system stack, so on a Mac you see San Francisco, not Roboto. Only Montserrat is genuinely used (31 elements). | One serif + one sans, self-hosted. You're currently paying a render-blocking round trip to `fonts.googleapis.com` for two fonts nobody sees. |
| **Weights available** | Montserrat/Roboto loaded at 400 and 700 only — no 500 or 600 — so anything that isn't regular jumps straight to bold. | Variable fonts give you the whole axis for the same byte cost. |
| **Card title casing** | `.card .section-subheading` sets `text-transform: uppercase`, then `.exp-title` sets `text-transform: none !important`. Award and project titles are uppercase-styled but land in sentence case anyway. Dead CSS fighting itself. | Settle on sentence case for titles; reserve uppercase + letterspacing for the small labels (`EDUCATION`, `INTERESTS`). |
| **Spacing** | Values in use across components: `30px`, `1rem`, `15px`, `10px`, `8px`, `20px`, `.5rem`, `4px`, `3px`. No scale. | 4px-based scale, exposed as custom properties. |
| **Section rhythm** | The alternating `#f7f7f7` / `#fff` bands are the only thing separating sections, and they're what makes the page read as a template — it's the most recognisable Wowchemy tell. | Flat white with hairline rules. Quieter, more formal, and it removes the contrast problem below. |

---

## Accessibility

Scanned with axe-core (WCAG 2.1 A/AA + best practice). Three violations, plus contrast checks run separately.

**Colour contrast**

| Text | Ratio | Verdict |
|---|---|---|
| `.exp-meta` (12.8px) on the `#f7f7f7` bands | **4.49:1** | ❌ Fails AA (needs 4.5:1) |
| `.article-metadata` (14px) on the `#f7f7f7` bands | **4.49:1** | ❌ Fails AA |
| Card titles, `rgba(0,0,0,.54)` on white | 4.61:1 | ⚠️ Passes by 0.11 |
| Links `#1565c0` | 5.75:1 | ✅ |
| Nav active `#2962ff` | 4.90:1 | ✅ |

Two failures, both caused by the same thing: `rgba(0,0,0,.54)` composites differently over the grey bands than over white. Removing the bands fixes both.

**Structure**

- 🔴 `aria-hidden-focus` (serious) — `<ul className="network-icon" aria-hidden="true">` wraps your three social links. They are keyboard-focusable but invisible to screen readers, which is the exact combination the rule exists to catch: a keyboard user tabs into a link their screen reader won't announce.
- 🟡 **Six `<h1>` elements**, one per section, and your name is an `<h2>`. The document outline is `h2 → h3 → h3 → h1 → h1 → h1…`. A screen-reader user pulling up a heading list gets six top-level headings and no page title.
- 🟡 **No `<main>` landmark**, so nine content nodes sit outside any landmark and skip-to-content doesn't work.
- Focus rings rely on the browser default, which the theme's reset partially suppresses.

**Touch targets:** buttons 25px, social links 20px tall. Both below 44px.

---

## What Works Well

- **Section order.** Research above Experience is the correct call for this audience and a lot of engineer portfolios get it backwards.
- **The publication citation format** — authors, year, title, venue, with your own name bolded — is exactly the convention the audience reads all day. Don't restructure it.
- **`useScrollSpy` with the bottom-of-page edge case handled.** Small thing, frequently got wrong, and it means the nav is honest about where you are.
- **The data layer is clean.** Everything lives in `profile.ts` and the components are thin. It's why a redesign can be a stylesheet instead of a rewrite.
- **Restraint.** No animations, no parallax, no dark-mode toggle nobody asked for. The instinct to keep it plain is right; the execution just needs the hierarchy sorted.
- **Semantic-ish markup and real anchors** throughout — no `<div onClick>`. That's what makes the a11y fixes small.

---

## Priority Recommendations

1. **Invert the card hierarchy.** Card titles to `--ink-900` (17.6:1), metadata to `--ink-500` (6.0:1), body to `--ink-700` (12.5:1). Right now the title is the faintest element in the card; it should be the strongest. This is one CSS rule and it changes how the whole page scans.

2. **Add the CV button and Google Scholar link.** Not a design change, but it's the thing your audience is actually hunting for, and it's currently absent. Everything else on this list is polish by comparison.

3. **Fix the vertical rhythm and the measure.** Section padding `30px → 72px`, bio measure `830px → 686px` (83 → 69 characters). The page currently has too much horizontal space and not enough vertical; swapping the proportions is most of what "clean" means here.

4. **One typeface pair, self-hosted, on a real scale.** Source Serif 4 for headings, names and publication titles; Inter for body and UI. Drops two unused font families, removes the third-party request, and gives you 500/600 weights so emphasis doesn't have to jump to bold.

5. **Clear the three axe violations.** Remove `aria-hidden` from the social list, demote section `<h1>`s to `<h2>` with your name as the page `<h1>`, wrap the content in `<main>`. Roughly fifteen lines across four files.

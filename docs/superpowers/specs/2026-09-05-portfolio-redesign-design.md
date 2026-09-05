# Portfolio redesign — design

**Status:** approved design, not yet implemented
**Date:** 2026-09-05
**Repo:** `saturnthehustler.github.io`

## What this is

A complete redesign of Abdirahman Hassan Abdi's portfolio. The current site is a
single 41KB `index.html` arguing that its author is a Python developer and
machine learning engineer, evidenced by five 2024 projects. That argument is out
of date and the evidence is the weakest available.

Since then he has been hired to build and ship two production systems for
SOMSTAR Kitchen Equipment in Mogadishu. Both are live. The redesign changes the
argument to match, and rebuilds the site to carry it.

## The argument

**An engineer businesses hire to build production systems.**

Not a student portfolio, not a stack list. The evidence is two systems a
business depends on, explained deeply enough that a reader can see the
engineering decisions rather than take them on trust.

**Audience:** engineering hiring managers and technical founders, in that
order. Both skim first and read second, so every case study has to work at two
depths — a headline claim with a number attached, and a paragraph that earns it.

**Positioning consequence:** the 2024 Python work stays on the site but stops
being the argument. It becomes "where I learned to finish things."

## Direction: Field Notes

Chosen from three comps. Writing-led and editorial: the work is explained, not
displayed.

| Token | Light | Dark |
|---|---|---|
| `--ground` | `#F3F4F1` | `#14161A` |
| `--surface` | `#FFFFFF` | `#1B1E22` |
| `--ink` | `#15181C` | `#E8E9E5` |
| `--dim` | `#5C6169` | `#969A9F` |
| `--rule` | `#D8DAD4` | `#2C3036` |
| `--accent` | `#0F4C5C` | `#6FB6C9` |

The neutral is a cool grey-green, not a pure grey — it sits under a teal-ink
accent without fighting it.

**Type.** Instrument Serif (400, roman and italic) for display; Public Sans
(400/500/700) for body and UI. Both from Google Fonts with real fallback stacks
(`Georgia, serif` and `system-ui, sans-serif`). Body measure stays near 65
characters. Headings get `text-wrap: balance`.

**Both themes are required.** The current site is dark-only. Tokens are declared
in bare `:root`, redefined under `@media (prefers-color-scheme: dark)` guarded as
`:root:not([data-theme="light"])`, and again under `:root[data-theme="dark"]`, so
a toggle wins in both directions. No colour is defined only inside a media block.

## Structure

Four static pages. No build step, no framework.

| Route | Contents |
|---|---|
| `/` | Hero, three-entry work index, earlier-work strip, about, contact |
| `/work/somstar-catalogue/` | Case study — the trilingual catalogue site |
| `/work/somstar-system/` | Case study — the business system |
| `/work/earlier/` | The five 2024 Python projects |

Rejected: a single long page (deep case studies make it enormous and dilute the
editorial feel), and an Astro or 11ty build (a toolchain for four pages, on a
repo that currently needs none).

Each case study follows the same shape, so they read as a series:

1. **Standfirst** — one paragraph: what it is, who it is for, what was at stake.
2. **Facts strip** — three or four figures with labels.
3. **The problem** — the constraint that made it non-trivial.
4. **Two or three mechanism sections**, each ending in a figure.
5. **What I would change** — one honest paragraph. This is the section that
   makes the rest credible.
6. **Links** — live URL only.

## Case study: the trilingual catalogue

**Live:** <https://somstarkitchen.com>

**Verified facts** (checked 2026-09-05): returns 200, as does `www`. 63 products
across 6 categories (24 / 12 / 15 / 4 / 2 / 6). Sitemap carries 219 URLs. `/so/`
and `/ar/` both return 200 — the Somali and Arabic rollout has shipped. Business
founded 2017; delivery across Mogadishu, Garowe, Dhuusamareeb and Dhobley.

**Stack:** Next.js static export deployed to Cloudflare Workers, auto-deployed by
GitHub Actions on push to `main`. Archivo self-hosted at build time. No CSS
framework, no third-party UI libraries, one stylesheet.

**Sections and their figures:**

1. **Sixty-three photographs, no two alike.** Supplier photos arrive at wildly
   different shapes with different amounts of baked-in padding — a portrait
   grinder, a 2:1 oven. Without normalising both the canvas and the product
   inside it, one product fills its card while the next floats in an empty one.
   → *Figure 1: the image pipeline.*
2. **Three languages, one URL shape.** English keeps `/`, Somali gets `/so/`,
   Arabic `/ar/`. Slugs stay English so all three share one URL shape and no slug
   depends on a translation being right. No auto-redirect by browser language —
   it breaks shared links and guesses wrong for the many phones in Somalia set to
   English. → *Figure 2: the URL tree.*
3. **What the phone actually downloads.** Six variants per photo, chosen by
   `srcset`/`sizes`; a phone pulls about 6KB where the source file is 53KB.
   Fingerprinted URLs are cached a year as immutable; HTML revalidates so a
   deploy is visible immediately. → *Figure 3: payload comparison.*

**Screenshots** (this site is public, so real screenshots are used): home at
desktop width; a category grid; one product page shown three times side by side
in English, Somali and Arabic. Captured at 1280px, exported at 1× and 2×,
served as WebP with JPEG fallback, `loading="lazy"`, explicit `width`/`height`.

## Case study: the business system

**Live:** <https://inventory.somstarkitchen.com> (redirects to `/login`)

**No screenshots.** The system is behind authentication and holds a client's
real financial data. Every visual is a diagram drawn from documented behaviour.
Figures used in diagrams are illustrative, chosen for clarity. The real
acceptance numbers in the test suite are not reproduced anywhere on the site —
they look like actual client money.

**Stack:** Cloudflare Workers and D1. No framework, no build step, no
client-side library — the deployable is a folder of plain `.js` files. US
dollars only.

**Sections and their figures:**

1. **Money that cannot drift.** All amounts stored as whole cents; no floating
   point anywhere. Purchases blend cost by weighted average.
   → *Figure 4: weighted-average costing.*
2. **A document either moves stock or it doesn't.** Quotations never touch
   stock until converted to an invoice. Every stock movement writes an audit row
   recording what changed, the resulting balance, why, on which document, and by
   whom. Each invoice line freezes that day's product name, code, model and cost,
   so later edits cannot rewrite history. → *Figure 5: document and stock flow.*
3. **Closing a year is a one-way door.** Net profit splits half to the operating
   partner and half among investors, weighted by how many days each one's capital
   was actually held. Percentages freeze permanently. A closed year can be
   reopened only while no later year has been closed and the money the close
   moved into capital is still there — checked by amount, because withdrawals can
   be back-dated. → *Figure 6: the year-close split.*
4. **Three roles, checked twice.** Owner, Manager and Staff. Hidden pages are
   hidden, and the server re-checks permission on every request and every save.
   → *Figure 7: role matrix.*

**Facts strip:** ~590 automated checks; whole-cent arithmetic; six failed logins
lock an account for 15 minutes; sessions are HttpOnly / Secure / SameSite=Lax
with CSRF refused twice (Origin header and session token).

## Earlier work

One page, five short entries — a few hundred words each, honest about scope.
All five repos are public, so each links to GitHub and reuses its existing
thumbnail from `Assets/`.

| Project | Framing |
|---|---|
| Diabetes prediction | Logistic regression, grid-search CV, ROC AUC and a classification report |
| ChapterVerse | Concurrent scraping with retry on transient network errors, EPUB output |
| ExcelConvertGUI | Tkinter GUI merging many workbooks into one, sheet per file |
| GPA Calculator | PyQt5, multi-semester cumulative GPA |
| The previous portfolio | Included deliberately — the thing this redesign replaces |

## Diagram specification

Seven figures. Six are hand-authored inline SVG; figure 7 is tabular data and is
marked up as an HTML `<table>`. No diagramming library.

**Rules for every figure** (the SVG-specific rules apply to figures 1–6):

- Colours come from the same CSS custom properties as the page, so figures
  work in both themes. No literal hex inside SVG except where a fill must not
  change.
- Every drawn shape gets an explicit `fill`. The `viewBox` leaves room for
  outermost labels.
- Each figure has a real `<figcaption>` stating what it shows — not a repeat of
  the heading above it.
- Each figure carries `role="img"` and an `<title>`, with the mechanism also
  stated in the prose, so the page works without the graphics.
- Text inside SVG is real `<text>`, never paths.
- Figures scroll inside their own `overflow-x: auto` container. The page body
  never scrolls sideways.

**The seven:**

1. **Image pipeline** — a ragged source photo, then trim, then normalise into a
   fixed 4:3 frame, then six outputs, then a fingerprinted URL. Shows why the
   grid is even.
2. **URL tree** — `/`, `/so/`, `/ar/` branching to a shared English slug, with
   the 219-URL total.
3. **Payload comparison** — a bar pair, 53KB source against ~6KB delivered.
   Both bars labelled with the value they reach.
4. **Weighted-average costing** — 2 units at $1,400 and 3 at $1,600 resolving to
   5 units held at $1,520, with the arithmetic visible.
5. **Document and stock flow** — quotation (no stock movement) and invoice
   (stock down, audit row written) as two paths from one product line.
6. **Year-close split** — net profit dividing 50/50, the investor half
   subdividing by days-held weighting.
7. **Role matrix** — Owner / Manager / Staff against capability rows. A table
   rendered as HTML, not SVG, since it is tabular data.

## Technical approach

- **Static HTML on GitHub Pages.** No build step, no package manager, no CI.
- **Files:** `index.html`, `work/somstar-catalogue/index.html`,
  `work/somstar-system/index.html`, `work/earlier/index.html`, one shared
  `assets/styles.css`, one small `assets/theme.js` for the theme toggle.
- **CSS is extracted from inline into one stylesheet** — the current ~700 inline
  lines are the main reason the page resists editing.
- **No JavaScript is required to read the site.** The only script is the theme
  toggle, which enhances a page that already works.
- **Images:** screenshots optimised to WebP with JPEG fallback, explicit
  dimensions, `loading="lazy"` below the fold. Existing `Assets/` thumbnails
  reused for earlier work.

**Performance budget:** `/` under 150KB on a cold load — HTML, CSS and webfonts
included, below-the-fold images excluded. The hero is typographic, so no image
blocks first paint. For comparison, the current site ships ~250KB of skill-logo
JPEGs alone, before anything else.

**Accessibility:** skip-to-content link, headings matching visual hierarchy,
visible keyboard focus, WCAG AA contrast on both themes, 44px touch targets,
`prefers-reduced-motion` honoured. Verified at 390px, 768px, 1024px and 1280px
with no horizontal overflow.

**Motion:** hover and press feedback on controls, and nothing else. Everything
meant to be read is visible at rest, without scrolling to trigger it.

## What gets deleted

- `particles.js` and its CDN script tag.
- The 15 skill-logo JPEGs (~250KB) and the skills section built from them. Skills
  are evidenced by the case studies; a wall of logos says less.
- `background-attachment: fixed` on the hero — broken on iOS.
- The duplicate-render bug: projects and experience currently exist as *both*
  hardcoded HTML and JS arrays rendering into `#project-list` and
  `.experience-grid`.
- The typewriter and blink animations on the hero heading.
- All Macruuf Agency content.

## Content decisions

- **Macruuf Agency is removed entirely** and not referenced anywhere.
- **Taaj Services** (Data Entry Specialist, Feb 2021 – Nov 2023) is kept as a
  single dated line under a "Background" heading in the About section, not as a
  card. It is real history and reads honestly at that weight. Trivially removed
  if unwanted.
- **Education** stays as it is: BSc Computer Science, Cavendish University
  Uganda, 2020–2024; Kubicle Excel certificates; IBM Cybersecurity Practitioner.
- **The site does not present a continuous timeline.** Entry-based structure
  means gaps between roles are not implied or explained.
- **SOMSTAR engagement is dated "2026 — ongoing"**, which is what the repository
  history supports: both repos created 2026-09-01, last pushed 2026-09-05.
- **Contact:** Abdirahman.bcs@gmail.com, plus GitHub, LinkedIn (`in/flyrye`) and
  X (`@Intelli9Hacker`).

## What is deliberately not published

- No GitHub links for either SOMSTAR repo — both are private.
- No internal infrastructure detail: no Cloudflare Worker name, no account IDs,
  no secret names or rotation steps, no deploy commands.
- The admin hostname `inventory.somstarkitchen.com` is named in prose as the
  system's address but is not linked, and no login screen is shown.
- No real customer names, invoice numbers, balances or the test suite's
  acceptance figures.

## Out of scope

- Any CMS, blog engine or content pipeline.
- A contact form. The email address is a link; there is no backend.
- Analytics.
- Translating the portfolio itself into Somali or Arabic.
- Changing anything in the SOMSTAR repositories.

## Success criteria

1. A reader who skims only headings and figures can state what both SOMSTAR
   systems do and one engineering decision from each.
2. Every claim on the site traces to something verified in this spec.
3. The site loads and reads correctly with JavaScript disabled.
4. Both themes pass WCAG AA on text and interactive elements.
5. No horizontal overflow at 390px.
6. Nothing private is published — measured against "What is deliberately not
   published" above.

## Confirmation still needed before publishing

**Naming SOMSTAR as a client on a public page.** Everything published is
architecture rather than data, but the system handles their money and their
shareholder structure, so it is their call as much as his. Worth a message to
them before the site goes live.

# Portfolio redesign — design

**Status:** approved design, not yet implemented
**Date:** 2026-09-05
**Repo:** `saturnthehustler.github.io`
**Revision:** 2 — Next.js build, projects-only history, SOMSTAR consent granted

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

**Audience:** prospective clients and engineering hiring managers. Both skim
first and read second, so every case study works at two depths — a headline
claim with a number attached, and a paragraph that earns it. Clients in
particular need to reach something they can *use*, so the live
<https://somstarkitchen.com> link is prominent rather than buried in a case
study.

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
(400/500/700) for body and UI. Loaded through `next/font/google`, which
self-hosts the files at build time — no render-blocking request to a third-party
host. Real fallback stacks declared (`Georgia, serif` and `system-ui,
sans-serif`). Body measure stays near 65 characters. Headings get
`text-wrap: balance`.

**Both themes are required.** The current site is dark-only. Tokens are declared
in bare `:root`, redefined under `@media (prefers-color-scheme: dark)` guarded as
`:root:not([data-theme="light"])`, and again under `:root[data-theme="dark"]`, so
the toggle wins in both directions. No colour is defined only inside a media
block.

## Structure

Four routes, statically exported.

| Route | Contents |
|---|---|
| `/` | Hero, three-entry work index, about, contact |
| `/work/somstar-catalogue/` | Case study — the trilingual catalogue site |
| `/work/somstar-system/` | Case study — the business system |
| `/work/earlier/` | The five 2024 Python projects |

Rejected: a single long page — deep case studies make it enormous and dilute the
editorial feel.

Each case study follows the same shape, so they read as a series:

1. **Standfirst** — one paragraph: what it is, who it is for, what was at stake.
2. **Facts strip** — three or four figures with labels.
3. **The problem** — the constraint that made it non-trivial.
4. **Two to four mechanism sections**, each ending in a figure.
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
in English, Somali and Arabic. Captured at 1280px, exported at 1× and 2×, served
as WebP with JPEG fallback, `loading="lazy"`, explicit `width`/`height`.

**Client-facing link.** This case study is the one a prospective client will
read, so it opens and closes with a plain link to the live site.

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
2. **A document either moves stock or it doesn't.** Quotations never touch stock
   until converted to an invoice. Every stock movement writes an audit row
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

One page, five short entries — a few hundred words each, honest about scope. All
five repos are public, so each links to GitHub and reuses its existing thumbnail
from `Assets/`.

| Project | Framing |
|---|---|
| Diabetes prediction | Logistic regression, grid-search CV, ROC AUC and a classification report |
| ChapterVerse | Concurrent scraping with retry on transient network errors, EPUB output |
| ExcelConvertGUI | Tkinter GUI merging many workbooks into one, sheet per file |
| GPA Calculator | PyQt5, multi-semester cumulative GPA |
| The previous portfolio | Included deliberately — the thing this redesign replaces |

## Diagram specification

Seven figures. Six are hand-authored inline SVG as React components; figure 7 is
tabular data and is marked up as an HTML `<table>`. No diagramming library.

**Rules for every figure** (the SVG-specific rules apply to figures 1–6):

- Colours come from the same CSS custom properties as the page, so figures work
  in both themes. No literal hex inside SVG except where a fill must not change.
- Every drawn shape gets an explicit `fill`. The `viewBox` leaves room for
  outermost labels.
- Each figure has a real `<figcaption>` stating what it shows — not a repeat of
  the heading above it.
- Each figure carries `role="img"` and a `<title>`, with the mechanism also
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
3. **Payload comparison** — a bar pair, 53KB source against ~6KB delivered. Both
   bars labelled with the value they reach.
4. **Weighted-average costing** — 2 units at $1,400 and 3 at $1,600 resolving to
   5 units held at $1,520, with the arithmetic visible.
5. **Document and stock flow** — quotation (no stock movement) and invoice (stock
   down, audit row written) as two paths from one product line.
6. **Year-close split** — net profit dividing 50/50, the investor half
   subdividing by days-held weighting.
7. **Role matrix** — Owner / Manager / Staff against capability rows.

## Technical approach

**Next.js, statically exported, served by GitHub Pages.** Same shape as the
SOMSTAR catalogue site, which means one deployment pattern to maintain rather
than two.

```js
// next.config.mjs
const nextConfig = {
  output: 'export',
  trailingSlash: true,      // emits /work/x/index.html — what Pages wants
  images: { unoptimized: true },  // required: no image optimiser on Pages
}
```

**Three things that break GitHub Pages if missed:**

1. **`.nojekyll` must exist in the published output.** Pages runs Jekyll by
   default, and Jekyll ignores directories beginning with an underscore — which
   silently drops all of `_next/`, leaving an unstyled page with no JavaScript.
2. **Pages source must change** from "deploy from a branch" to "GitHub Actions".
   The repo currently serves `index.html` from the root of `main`.
3. **No `basePath` is needed.** `saturnthehustler.github.io` is a user site
   served from the domain root, unlike a project site.

**Deployment:** a GitHub Actions workflow on push to `main` — build, upload the
`out/` directory as a Pages artifact, deploy. No manual step.

**Structure:** App Router. `app/layout.jsx`, `app/page.jsx`, one `page.jsx` per
case-study route, `components/` for the figure components and shared pieces, and
one `app/globals.css` holding the tokens. Plain JavaScript with JSX, no
TypeScript — matching both SOMSTAR repos.

**Styling:** one stylesheet, CSS custom properties, no framework. The SOMSTAR
site is built this way and it is the reason it has nothing to keep updated.

## Animation

Motion (`motion/react`). Purposeful, not decorative — the Field Notes direction
is quiet, so motion earns its place by explaining something or by acknowledging
input.

**Where motion is used:**

- **Load sequence on `/`.** Name, headline, standfirst and work-list entries
  stagger in once, on first paint. One orchestrated moment rather than an effect
  per section.
- **Figures assemble on entry.** The signature moment. Each diagram's elements
  reveal in the order the mechanism runs — the image pipeline builds
  left to right, source photo through to fingerprinted URL; the year-close split
  divides, then subdivides. The animation *is* the explanation, which is the only
  reason it belongs on a page this restrained.
- **Work-list entries** reveal on scroll with `whileInView` and
  `viewport={{ once: true }}`.
- **Controls** get hover and press feedback: the entry arrow shifts, the rule
  under a link grows from the left.

**Nothing else animates.** No parallax, no scroll-jacking, no section-by-section
fades.

**Content must never be gated behind motion.** Three defences, all required:

1. An inline script in `<head>` sets a `js` class on `<html>` before first
   paint. Hidden initial states apply only under `.js`, so with JavaScript
   disabled or hydration failed, the statically exported HTML renders plainly and
   completely.
2. `useReducedMotion()` short-circuits every animation to its resting state when
   the visitor has asked for reduced motion. Reveals become instant; the load
   sequence does not run.
3. A failsafe timer reveals anything still hidden after five seconds, so a failed
   observer can never leave a blank panel — the same guard used on the SOMSTAR
   site.

**Bundle cost:** `LazyMotion` with the `domAnimation` feature set and the `m`
component, so the full Motion bundle is not shipped on first load. Verify the
current API at implementation time.

## Budgets and quality bars

**Performance:** `/` under 250KB transferred on a cold load — HTML, CSS,
webfonts and JavaScript included, below-the-fold images excluded. This is a real
cost of choosing Next.js over static HTML: React and Motion are roughly 100KB of
it, where the hand-written version would have shipped almost none. The trade is
deliberate — it buys the animation, the component reuse across seven figures, and
one deployment pattern shared with the SOMSTAR site. The analytics beacon adds
about 2KB on top, deferred. The contact form adds nothing — it ships no library
and calls no service.

**Accessibility:** skip-to-content link, headings matching visual hierarchy,
visible keyboard focus, WCAG AA contrast on both themes, 44px touch targets,
`prefers-reduced-motion` honoured throughout. Verified at 390px, 768px, 1024px
and 1280px with no horizontal overflow.

## What gets deleted

- `particles.js` and its CDN script tag.
- The 15 skill-logo JPEGs (~250KB) and the skills section built from them. Skills
  are evidenced by the case studies; a wall of logos evidences nothing.
- `background-attachment: fixed` on the hero — broken on iOS.
- The duplicate-render bug: projects and experience currently exist as *both*
  hardcoded HTML and JS arrays rendering into `#project-list` and
  `.experience-grid`.
- The typewriter and blink animations on the hero heading.
- The entire Experience section — see below.

## Content decisions

- **No employment history anywhere on the site.** Macruuf Agency and Taaj
  Services are both removed, and the Experience section goes with them. The site
  presents projects only.
- **SOMSTAR appears as named client work, not as a job.** Dated "2026 —
  ongoing", which is what the repository history supports: both repos created
  2026-09-01, last pushed 2026-09-05.
- **Education and certifications stay:** BSc Computer Science, Cavendish
  University Uganda, 2020–2024; Kubicle Excel certificates; IBM Cybersecurity
  Practitioner. These are credentials rather than jobs, so they do not conflict
  with the rule above — but they are one line to delete if that reading is wrong.
- **No timeline.** Entry-based structure means gaps between projects are neither
  implied nor explained.
- **Contact:** the WhatsApp compose form (see below), with Abdirahman.bcs@gmail.com
  as a `mailto:` link beside it, plus GitHub, LinkedIn (`in/flyrye`) and X
  (`@Intelli9Hacker`).

## Contact form

**A compose form, not a submit form** — the same pattern as the SOMSTAR contact
page. The visitor fills it in, and the button builds a pre-filled message and
opens WhatsApp with it. Nothing is posted anywhere.

That choice carries three properties worth stating plainly: no backend exists to
pay for or maintain, no third-party service reads a message before he does, and
there is nothing to spam, because there is no endpoint to post to. It is also why
"no backend" survives as a constraint even though the site now has a form.

**Fields:** name; what you need (a short select — new build, existing system,
hiring, something else); the message. The select earns its place by making the
opening message specific rather than "hi".

**Mechanism:** the form composes `https://wa.me/<number>?text=<encoded message>`
and opens it. WhatsApp Web handles this on desktop, so it is not a phone-only
path.

**Requires his WhatsApp number.** The number published on somstarkitchen.com is
SOMSTAR's business line, not his, and must not be reused without asking.

**Without JavaScript** the composed URL cannot be built, so the form is replaced
at render time by what does work unaided: a plain WhatsApp link with no
pre-filled text, and the email address as a `mailto:` link. Both are present in
the contact section regardless, for anyone who does not use WhatsApp.

**Privacy:** the form collects nothing, stores nothing and transmits nothing. No
consent notice is needed for it.

## Analytics

**Cloudflare Web Analytics.** Free on all plans, sets no cookies, and does not
track visitors between sites. The reason it fits here specifically: it requires
neither a DNS change nor traffic proxied through Cloudflare, so it runs on
GitHub Pages unmodified.

**Setup:** register the site in the Cloudflare dashboard and paste the beacon
snippet it generates, which carries a site token. Roughly 2KB, loaded `defer` so
it never blocks paint. Copy the snippet from the dashboard rather than from
memory — it is the authoritative form.

**What it answers:** how many people arrive, which pages they read, where they
came from (a recruiter's email, LinkedIn, a search), which country, which device,
and Core Web Vitals as real visitors experience them. That last one is the useful
one against the 250KB budget — it measures the site on the connections it
actually gets, not on a developer's laptop.

**What it does not answer:** it reports pageviews, not custom events, so it
cannot tell him whether the somstarkitchen.com link was clicked. Outbound-link
tracking would need a different tool and is not worth adding one for.

**Disclosure:** it sets no cookies, so no cookie banner is required — but each
pageview is reported to Cloudflare, so the footer states plainly that Cloudflare
Web Analytics is in use.

## What is deliberately not published

SOMSTAR have given consent to be named as a client. That consent covers the
work, not their internals, so the following still stay off the site:

- No GitHub links for either SOMSTAR repo — both are private.
- No internal infrastructure detail: no Cloudflare Worker name, no account IDs,
  no secret names or rotation steps, no deploy commands.
- The admin hostname `inventory.somstarkitchen.com` is named in prose as the
  system's address but is not linked, and no login screen is shown.
- No real customer names, invoice numbers, balances, or the acceptance figures
  from the test suite.

`https://somstarkitchen.com` is the opposite case: it is public, it is the
strongest single piece of evidence on the site, and prospective clients should
land on it. It is linked from the hero, from the catalogue case study, and from
the contact section.

## Out of scope

- Any CMS, blog engine or content pipeline.
- A server-side form handler, a third-party form service, or stored submissions.
  The contact form composes a message; it never posts one.
- TypeScript.
- Translating the portfolio itself into Somali or Arabic.
- Changing anything in the SOMSTAR repositories.

## Success criteria

1. A reader who skims only headings and figures can state what both SOMSTAR
   systems do and one engineering decision from each.
2. Every claim on the site traces to something verified in this spec.
3. The site reads completely with JavaScript disabled, and with
   `prefers-reduced-motion: reduce` set.
4. Both themes pass WCAG AA on text and interactive elements.
5. No horizontal overflow at 390px.
6. `/` transfers under 250KB cold, excluding below-the-fold images.
7. The deployed Pages build serves `_next/` correctly — the `.nojekyll` check.
8. Nothing private is published, measured against "What is deliberately not
   published" above.
9. The contact form composes a correctly encoded WhatsApp message and opens it
   on both desktop and mobile. With JavaScript disabled, the contact section
   still offers a working WhatsApp link and a `mailto:` address.
10. The deployed site reports pageviews to Cloudflare Web Analytics, and the
    footer discloses that it does.

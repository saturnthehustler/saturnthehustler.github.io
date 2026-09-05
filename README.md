# saturnthehustler.github.io

My portfolio. Next.js, statically exported, deployed to GitHub Pages by GitHub
Actions.

## Working on it

```bash
npm install
npm run dev          # http://localhost:3000
```

## Before pushing

```bash
npm test                # unit and component tests
npm run check:contrast  # WCAG AA in both themes, computed from globals.css
npm run build           # static export into ./out
npm run check:build     # every route present, .nojekyll, no basePath leak
npm run check:privacy   # nothing confidential in the output, docs, source or tests
npm run test:browser    # no sideways scroll at 390px, no-JS, reduced motion, diagram bounds
```

CI runs all of them. A failed check stops the deploy rather than publishing a
broken or leaky site.

## Publishing

Push to `main`. GitHub Actions builds and deploys.

Two things must be set once in repository settings:

- **Pages → Source** must be **GitHub Actions**, not "Deploy from a branch".
- **Variables → `CF_BEACON_TOKEN`** carries the Cloudflare Web Analytics site
  token. Without it the beacon simply does not render, so it is optional.

## Structure

- `app/` — routes and the single stylesheet; `app/icon.svg` is the favicon,
  picked up automatically by the App Router
- `components/` — shared pieces; `components/figures/` holds the eight diagrams
- `lib/` — pure logic worth testing on its own
- `scripts/` — the guard scripts CI runs, plus a one-off apple-touch rasteriser

## A note on what is published

Two of the projects described here are private client systems. The site
publishes architecture, never data: no private repository links, no
infrastructure names or secrets, no client figures, and no commercial terms.

`scripts/check-privacy.mjs` enforces that, and it scans this repository's own
documents and source as well as the built output — the repo is public, so a
scrubbed page beside an unscrubbed spec would leak just as much.

## Design documents

- Spec: `docs/superpowers/specs/2026-09-05-portfolio-redesign-design.md`
- Plan: `docs/superpowers/plans/2026-09-05-portfolio-redesign.md`

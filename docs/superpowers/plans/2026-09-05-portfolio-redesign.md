# Field Notes Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace a single-file static portfolio with a four-route Next.js site that argues its author is an engineer businesses hire to build production systems, evidenced by two deeply-explained SOMSTAR case studies.

**Architecture:** Next.js App Router, statically exported (`output: 'export'`) and deployed to GitHub Pages by a GitHub Actions workflow. Plain JavaScript with JSX, no TypeScript, one stylesheet of CSS custom properties, no CSS framework. Animation is CSS-driven and gated behind a `js` class so the exported HTML reads completely without JavaScript; Motion supplies only the viewport trigger, the reduced-motion query, and press/hover springs.

**Tech Stack:** Next.js (App Router), React, Motion (`motion/react`), `next/font/google`, Vitest + Testing Library, Playwright, Cloudflare Web Analytics.

**Spec:** `docs/superpowers/specs/2026-09-05-portfolio-redesign-design.md`

## Global Constraints

Every task's requirements implicitly include this section.

- **Node 20 or newer.** Development machine is on Node 24.20.0, npm 11.19.0.
- **No TypeScript.** Plain `.jsx` and `.mjs` files, matching both SOMSTAR repos.
- **No CSS framework and no third-party UI library.** One stylesheet.
- **`output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`.** Non-negotiable — the last is required or the build throws `ExportError`.
- **No `basePath`.** `saturnthehustler.github.io` is a user site served from the domain root.
- **Content must never be gated behind motion.** Hidden initial states apply only under `html.js`. Every animated element is visible in the exported HTML.
- **`prefers-reduced-motion: reduce` disables all motion**, in CSS and in JS.
- **Colour tokens only.** No literal hex outside `app/globals.css`, including inside SVG.
- **Never publish:** private repo URLs (the two private repository names, and the admin host inside an `href`), the Cloudflare Worker name, secret names, `wrangler` commands, real client figures, or SOMSTAR's business phone number. Task 10 enforces this with a test.
- **WhatsApp number:** display `+252 61 950 0776`; in a `wa.me` URL, `252619500776` — digits only.
- **Live client link:** `https://somstarkitchen.com` appears in the hero, the catalogue case study, and the contact section.
- **Budget:** `/` under 250KB transferred cold, excluding below-the-fold images.

## File Structure

| Path | Responsibility |
|---|---|
| `package.json` | Scripts and dependencies |
| `next.config.mjs` | Static export configuration |
| `jsconfig.json` | `@/` path alias |
| `vitest.config.mjs`, `vitest.setup.js` | Unit test runner |
| `playwright.config.mjs` | Browser test runner |
| `.github/workflows/deploy.yml` | Build and deploy to Pages |
| `app/layout.jsx` | Document shell, fonts, pre-paint script, header, footer |
| `app/icon.svg` | Favicon — the monogram on its tile. Auto-detected by the App Router |
| `app/apple-icon.png` | 180px raster of the same mark, for iOS home screens |
| `public/monogram.svg` | Bare mark in `currentColor`, for use inside the page |
| `app/globals.css` | All tokens, all component styles, all reveal transitions |
| `app/page.jsx` | Index — hero, work index, about, contact |
| `app/work/somstar-catalogue/page.jsx` | Case study 1 |
| `app/work/somstar-system/page.jsx` | Case study 2 |
| `app/work/earlier/page.jsx` | The five 2024 projects |
| `components/ThemeToggle.jsx` | Light/dark toggle |
| `components/Reveal.jsx` | Viewport-triggered reveal wrapper with failsafe |
| `components/Figure.jsx` | Figure frame: caption, scroll container, sequencing |
| `components/ContactForm.jsx` | WhatsApp compose form |
| `components/Analytics.jsx` | Cloudflare beacon |
| `lib/whatsapp.js` | `composeWhatsAppUrl` — pure, unit tested |
| `lib/work.js` | Case-study metadata shared by index and pages |
| `components/figures/*.jsx` | Seven figure components |
| `scripts/check-build.mjs` | Asserts the exported output is correct |
| `scripts/check-privacy.mjs` | Asserts nothing forbidden reached `out/` |
| `scripts/check-contrast.mjs` | WCAG ratios for every token pair in use |
| `tests/*.test.jsx` | Unit and component tests |
| `tests/browser/*.spec.mjs` | Playwright checks |

Files that change together live together: each figure is its own component beside its siblings, and each route owns its page copy.

---

### Task 1: Scaffold, static export, and a proven Pages deployment

The riskiest part of this build is deployment, so it goes first and is proven before any design work.

**Files:**
- Create: `package.json`, `next.config.mjs`, `jsconfig.json`, `.gitignore`
- Create: `app/layout.jsx`, `app/page.jsx`, `public/.nojekyll`
- Create: `scripts/check-build.mjs`
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: nothing.
- Produces: a working `npm run build` emitting `out/`; `npm run check:build` asserting its shape. Later tasks add routes and re-run this check.

- [ ] **Step 1: Write the failing build check**

Create `scripts/check-build.mjs`:

```js
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'out';
const required = [
  'index.html',
  '.nojekyll',
  'work/somstar-catalogue/index.html',
  'work/somstar-system/index.html',
  'work/earlier/index.html',
];

const failures = [];
for (const rel of required) {
  if (!existsSync(join(OUT, rel))) failures.push(`missing: ${OUT}/${rel}`);
}

// trailingSlash:true must emit directories, not sibling .html files
if (existsSync(join(OUT, 'work/earlier.html'))) {
  failures.push('found out/work/earlier.html — trailingSlash is not set');
}

// A user site must not carry a basePath
if (existsSync(join(OUT, 'index.html'))) {
  const html = readFileSync(join(OUT, 'index.html'), 'utf8');
  if (html.includes('/saturnthehustler.github.io/_next/')) {
    failures.push('basePath leaked into asset URLs');
  }
  if (!html.includes('/_next/')) {
    failures.push('no /_next/ assets referenced — build may be empty');
  }
}

if (failures.length) {
  console.error('BUILD CHECK FAILED\n' + failures.map((f) => '  ! ' + f).join('\n'));
  process.exit(1);
}
console.log(`build check passed — ${required.length} required paths present`);
```

Only the three `work/*` routes are absent at this point; that is expected and they arrive in Tasks 7–9. Comment them out for now by trimming `required` to `['index.html', '.nojekyll']`, and restore the full list in Task 9.

- [ ] **Step 2: Run the check to verify it fails**

Run: `node scripts/check-build.mjs`
Expected: FAIL with `missing: out/index.html` — nothing has been built.

- [ ] **Step 3: Create the package manifest**

Create `package.json`:

```json
{
  "name": "abdirahman-portfolio",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "check:build": "node scripts/check-build.mjs",
    "test": "vitest run",
    "test:browser": "playwright test",
    "check:privacy": "node scripts/check-privacy.mjs",
    "check:contrast": "node scripts/check-contrast.mjs"
  }
}
```

Install dependencies at their current versions rather than pinning by hand:

```bash
npm install next@latest react@latest react-dom@latest motion@latest
```

- [ ] **Step 4: Configure the static export**

Create `next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
```

`images.unoptimized` is required: with the default loader, `next build` throws `ExportError` on a static export because there is no image optimisation server.

Create `jsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./*"] }
  }
}
```

Create `.gitignore`:

```
node_modules/
.next/
out/
.DS_Store
*.log
test-results/
playwright-report/
```

- [ ] **Step 5: Add the Jekyll guard**

Create an empty `public/.nojekyll`:

```bash
touch public/.nojekyll
```

Everything in `public/` is copied to `out/`.

**Why this exists:** with GitHub Actions deployment, Jekyll never runs — the uploaded artifact is served as-is — so this file is not strictly required today. It costs nothing and prevents a silent failure if the Pages source is ever switched back to branch deployment, where Jekyll *would* run and would drop every directory beginning with an underscore, including all of `_next/`. The result is an unstyled page with no JavaScript and no error message.

- [ ] **Step 6: Create a minimal shell so the build has something to export**

Create `app/layout.jsx`:

```jsx
export const metadata = {
  title: 'Abdirahman Hassan Abdi',
  description: 'Software engineer. I build the systems businesses run on.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Create `app/page.jsx`:

```jsx
export default function Home() {
  return <main><h1>Abdirahman Hassan Abdi</h1></main>;
}
```

- [ ] **Step 7: Build and verify the check passes**

Run: `npm run build && npm run check:build`
Expected: build succeeds, then `build check passed — 2 required paths present`.

If the build reports `ExportError` about image optimisation, `images.unoptimized` is missing from `next.config.mjs`.

- [ ] **Step 8: Add the deployment workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npm run check:build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

`npm run check:build` runs inside CI deliberately: a broken export fails the run rather than deploying a blank site.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json next.config.mjs jsconfig.json .gitignore app scripts public .github
git commit -m "feat: scaffold Next.js static export with Pages deployment"
```

**Manual step for the repo owner, needed once before the first deploy:** in GitHub → Settings → Pages, change **Source** from "Deploy from a branch" to **"GitHub Actions"**. Until this is changed the workflow will run and then fail at the deploy step.

---

### Task 2: Design tokens, fonts, layout shell, and theme toggle

**Files:**
- Create: `app/globals.css`
- Modify: `app/layout.jsx`
- Create: `components/ThemeToggle.jsx`
- Create: `scripts/check-contrast.mjs`
- Create: `vitest.config.mjs`, `vitest.setup.js`, `tests/theme-toggle.test.jsx`

**Interfaces:**
- Consumes: Task 1's `app/layout.jsx`.
- Produces: every token named below; `<ThemeToggle />`; `html.js` set before paint; `npm run check:contrast`.

- [ ] **Step 1: Set up the unit test runner**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

Create `vitest.config.mjs`:

```js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
    include: ['tests/**/*.test.{js,jsx}'],
  },
  resolve: { alias: { '@': new URL('./', import.meta.url).pathname } },
});
```

Create `vitest.setup.js`:

```js
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 2: Write the failing theme toggle test**

Create `tests/theme-toggle.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import ThemeToggle from '@/components/ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('stamps data-theme="dark" when toggled from light', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('persists the choice to localStorage', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('exposes its state to assistive technology', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npx vitest run tests/theme-toggle.test.jsx`
Expected: FAIL — `Failed to resolve import "@/components/ThemeToggle"`.

- [ ] **Step 4: Write the tokens**

Create `app/globals.css`:

```css
:root {
  --ground:  #F3F4F1;
  --surface: #FFFFFF;
  --ink:     #15181C;
  --dim:     #5C6169;
  --rule:    #D8DAD4;
  --accent:  #0F4C5C;

  --measure: 65ch;
  --step-0: 1rem;
  --step-1: 1.25rem;
  --step-2: 1.5rem;
  --step-3: clamp(1.75rem, 3vw, 2.25rem);
  --step-4: clamp(2.25rem, 5vw, 3.5rem);
  --gap: 1.5rem;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --ground:  #14161A;
    --surface: #1B1E22;
    --ink:     #E8E9E5;
    --dim:     #969A9F;
    --rule:    #2C3036;
    --accent:  #6FB6C9;
  }
}

:root[data-theme="dark"] {
  --ground:  #14161A;
  --surface: #1B1E22;
  --ink:     #E8E9E5;
  --dim:     #969A9F;
  --rule:    #2C3036;
  --accent:  #6FB6C9;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--ground);
  color: var(--ink);
  font-family: var(--font-body), system-ui, sans-serif;
  font-size: var(--step-0);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: var(--font-display), Georgia, serif;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -.015em;
  text-wrap: balance;
}

p { max-width: var(--measure); }

a { color: var(--accent); }

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--surface);
  color: var(--ink);
  padding: .75rem 1rem;
  z-index: 100;
}
.skip-link:focus { left: 0; }

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.wrap { width: min(72rem, 100% - 2.5rem); margin-inline: auto; }
```

Every colour is defined in the bare `:root` block first. A colour defined only inside a media query renders one theme's text on the other theme's ground.

- [ ] **Step 5: Write the contrast checker**

Create `scripts/check-contrast.mjs`:

```js
import { readFileSync } from 'node:fs';

const css = readFileSync('app/globals.css', 'utf8');

function tokensFrom(block) {
  const out = {};
  for (const [, name, value] of block.matchAll(/--([\w-]+):\s*(#[0-9A-Fa-f]{6})/g)) {
    out[name] = value;
  }
  return out;
}

const light = tokensFrom(css.slice(0, css.indexOf('@media')));
const dark = tokensFrom(css.slice(css.indexOf('[data-theme="dark"]')));

function luminance(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = c.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

const pairs = [
  ['ink', 'ground'],
  ['ink', 'surface'],
  ['dim', 'ground'],
  ['dim', 'surface'],
  ['accent', 'ground'],
  ['accent', 'surface'],
];

let failed = false;
for (const [themeName, tokens] of [['light', light], ['dark', dark]]) {
  for (const [fg, bg] of pairs) {
    const r = ratio(tokens[fg], tokens[bg]);
    const ok = r >= 4.5;
    if (!ok) failed = true;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${themeName}: ${fg} on ${bg} = ${r.toFixed(2)}:1`);
  }
}

if (failed) {
  console.error('\nContrast below WCAG AA (4.5:1) for normal text.');
  process.exit(1);
}
```

- [ ] **Step 6: Run the contrast check**

Run: `npm run check:contrast`
Expected: every pair at or above 4.5:1 in both themes. If a pair fails, adjust that token in `app/globals.css` and re-run — do not lower the threshold.

- [ ] **Step 7: Write the theme toggle**

Create `components/ThemeToggle.jsx`:

```jsx
'use client';

import { useEffect, useState } from 'react';

function current() {
  if (typeof document === 'undefined') return 'light';
  const stamped = document.documentElement.getAttribute('data-theme');
  if (stamped) return stamped;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => { setTheme(current()); }, []);

  function toggle() {
    const next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch {}
    setTheme(next);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={theme === 'dark'}
      aria-label="Use dark theme"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
```

- [ ] **Step 8: Run the tests to verify they pass**

Run: `npx vitest run tests/theme-toggle.test.jsx`
Expected: 3 passed.

- [ ] **Step 9: Wire the shell**

Replace `app/layout.jsx`:

```jsx
import { Instrument_Serif, Public_Sans } from 'next/font/google';
import ThemeToggle from '@/components/ThemeToggle';
import './globals.css';

const display = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Public_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://saturnthehustler.github.io'),
  title: 'Abdirahman Hassan Abdi',
  description: 'Software engineer. I build the systems businesses run on.',
};

const PRE_PAINT = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t==='dark'||t==='light')d.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <header className="site-head wrap">
          <a href="/" className="site-name">Abdirahman Hassan Abdi</a>
          <nav><a href="/work/earlier/">Earlier work</a><ThemeToggle /></nav>
        </header>
        <main id="main">{children}</main>
        <footer className="site-foot wrap">
          <p>© 2026 Abdirahman Hassan Abdi</p>
        </footer>
      </body>
    </html>
  );
}
```

`next/font/google` downloads both faces at build time and serves them from this domain — no request to a third-party font host.

The pre-paint script does two jobs: it adds `js`, which every hidden animation state depends on, and it applies the stored theme before first paint so there is no flash of the wrong theme.

- [ ] **Step 10: Rasterise the apple-touch icon**

`app/icon.svg` and `public/monogram.svg` already exist in the repo. Next.js App Router
picks up `app/icon.svg` as the favicon automatically — no `<link>` tag is needed.

iOS ignores SVG favicons when a page is added to the home screen, so it needs a PNG:

```bash
npm install -D sharp
```

Create `scripts/make-apple-icon.mjs`:

```js
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const svg = readFileSync('app/icon.svg');
const png = await sharp(svg, { density: 512 }).resize(180, 180).png().toBuffer();
writeFileSync('app/apple-icon.png', png);
console.log('app/apple-icon.png written — 180x180');
```

Run it once and commit the result:

```bash
node scripts/make-apple-icon.mjs
```

It is a one-off rather than a build step: the mark changes rarely, and a committed
PNG keeps `sharp` out of the deployment path entirely.

- [ ] **Step 11: Verify the build still exports**

Run: `npm run build && npm run check:build`
Expected: pass. Confirm `out/icon.svg` and `out/apple-icon.png` are both present.

- [ ] **Step 12: Commit**

```bash
git add app components scripts tests vitest.config.mjs vitest.setup.js package.json package-lock.json
git commit -m "feat: design tokens, fonts, layout shell and theme toggle"
```

---

### Task 3: Reveal animation with its three failure defences

Motion's `initial={{ opacity: 0 }}` writes an inline style into the server-rendered HTML. If hydration never happens, that content stays invisible forever. This task avoids that class of bug structurally: **the hidden state lives in CSS behind `html.js`, never in an inline style.** JavaScript only adds a `data-in` attribute.

Motion contributes `useInView` and `useReducedMotion`. It is not used to set opacity.

**Files:**
- Create: `components/Reveal.jsx`
- Modify: `app/globals.css`
- Create: `tests/reveal.test.jsx`

**Interfaces:**
- Consumes: `html.js` from Task 2.
- Produces: `<Reveal index={n}>{children}</Reveal>` — renders a `div[data-reveal]`, sets `data-in="true"` when in view, after a 5s failsafe, or immediately under reduced motion. `index` drives stagger via `--stagger-index`.

- [ ] **Step 1: Write the failing tests**

Create `tests/reveal.test.jsx`:

```jsx
import { render, screen, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Reveal from '@/components/Reveal';

vi.mock('motion/react', () => ({
  useInView: () => false,
  useReducedMotion: () => globalThis.__reduced ?? false,
}));

describe('Reveal', () => {
  beforeEach(() => { vi.useFakeTimers(); globalThis.__reduced = false; });
  afterEach(() => { vi.useRealTimers(); });

  it('always renders its children, so content is never lost', () => {
    render(<Reveal><p>Readable</p></Reveal>);
    expect(screen.getByText('Readable')).toBeInTheDocument();
  });

  it('starts hidden when out of view', () => {
    render(<Reveal><p>Readable</p></Reveal>);
    expect(screen.getByTestId('reveal')).toHaveAttribute('data-in', 'false');
  });

  it('reveals after the five second failsafe even if never in view', () => {
    render(<Reveal><p>Readable</p></Reveal>);
    act(() => { vi.advanceTimersByTime(5000); });
    expect(screen.getByTestId('reveal')).toHaveAttribute('data-in', 'true');
  });

  it('is revealed immediately when reduced motion is requested', () => {
    globalThis.__reduced = true;
    render(<Reveal><p>Readable</p></Reveal>);
    expect(screen.getByTestId('reveal')).toHaveAttribute('data-in', 'true');
  });

  it('passes its stagger index through as a custom property', () => {
    render(<Reveal index={3}><p>Readable</p></Reveal>);
    expect(screen.getByTestId('reveal').style.getPropertyValue('--stagger-index')).toBe('3');
  });
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run tests/reveal.test.jsx`
Expected: FAIL — `Failed to resolve import "@/components/Reveal"`.

- [ ] **Step 3: Implement Reveal**

Create `components/Reveal.jsx`:

```jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

export default function Reveal({ children, index = 0, as: Tag = 'div', className = '' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const [failsafe, setFailsafe] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFailsafe(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const shown = reduced || inView || failsafe;

  return (
    <Tag
      ref={ref}
      data-reveal
      data-testid="reveal"
      data-in={shown ? 'true' : 'false'}
      className={className}
      style={{ '--stagger-index': index }}
    >
      {children}
    </Tag>
  );
}
```

The failsafe means a broken or unsupported IntersectionObserver can never leave a blank panel.

- [ ] **Step 4: Add the CSS, gated on `js`**

Append to `app/globals.css`:

```css
/* Reveals are invisible ONLY when JavaScript is running to bring them back.
   Without html.js these rules never match and content renders plainly. */
html.js [data-reveal] {
  opacity: 0;
  transform: translateY(12px);
}

html.js [data-reveal][data-in="true"] {
  opacity: 1;
  transform: none;
  transition:
    opacity .5s cubic-bezier(.2, .6, .2, 1) calc(var(--stagger-index, 0) * 70ms),
    transform .5s cubic-bezier(.2, .6, .2, 1) calc(var(--stagger-index, 0) * 70ms);
}

@media (prefers-reduced-motion: reduce) {
  html.js [data-reveal] { opacity: 1; transform: none; }
  html.js [data-reveal][data-in="true"] { transition: none; }
}
```

The reduced-motion block is belt and braces: `useReducedMotion` already sets `data-in="true"` immediately, and this guarantees no transition even if that fails.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npx vitest run tests/reveal.test.jsx`
Expected: 5 passed.

- [ ] **Step 6: Commit**

```bash
git add components/Reveal.jsx app/globals.css tests/reveal.test.jsx
git commit -m "feat: reveal animation with reduced-motion, no-JS and failsafe defences"
```

---

### Task 4: WhatsApp compose contact form

**Files:**
- Create: `lib/whatsapp.js`
- Create: `components/ContactForm.jsx`
- Create: `tests/whatsapp.test.js`, `tests/contact-form.test.jsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: nothing.
- Produces: `composeWhatsAppUrl({ name, need, message })` → `string`; `<ContactForm />`.

- [ ] **Step 1: Write the failing composer tests**

Create `tests/whatsapp.test.js`:

```js
import { describe, expect, it } from 'vitest';
import { composeWhatsAppUrl, WHATSAPP_DIGITS, WHATSAPP_DISPLAY } from '@/lib/whatsapp';

describe('composeWhatsAppUrl', () => {
  it('targets the digits-only number with no plus or spaces', () => {
    expect(WHATSAPP_DIGITS).toBe('252619500776');
    expect(composeWhatsAppUrl({ name: 'A', need: 'hiring', message: 'Hi' }))
      .toContain('https://wa.me/252619500776?text=');
  });

  it('keeps a display form with the plus and spacing', () => {
    expect(WHATSAPP_DISPLAY).toBe('+252 61 950 0776');
  });

  it('percent-encodes newlines and spaces', () => {
    const url = composeWhatsAppUrl({ name: 'Ayaan', need: 'new-build', message: 'Two lines\nhere' });
    expect(url).not.toContain(' ');
    expect(url).toContain('%0A');
  });

  it('includes the name, a readable need label, and the message', () => {
    const url = composeWhatsAppUrl({ name: 'Ayaan', need: 'new-build', message: 'A shop system' });
    const text = decodeURIComponent(url.split('?text=')[1]);
    expect(text).toContain('Ayaan');
    expect(text).toContain('a new build');
    expect(text).toContain('A shop system');
  });

  it('falls back to a bare link when every field is empty', () => {
    expect(composeWhatsAppUrl({ name: '', need: '', message: '' }))
      .toBe('https://wa.me/252619500776');
  });
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run tests/whatsapp.test.js`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the composer**

Create `lib/whatsapp.js`:

```js
export const WHATSAPP_DIGITS = '252619500776';
export const WHATSAPP_DISPLAY = '+252 61 950 0776';
export const EMAIL = 'Abdirahman.bcs@gmail.com';

export const NEEDS = [
  { value: 'new-build', label: 'Something new built', phrase: 'a new build' },
  { value: 'existing', label: 'Work on an existing system', phrase: 'an existing system' },
  { value: 'hiring', label: 'A role', phrase: 'a role' },
  { value: 'other', label: 'Something else', phrase: 'something else' },
];

export function composeWhatsAppUrl({ name = '', need = '', message = '' }) {
  const base = `https://wa.me/${WHATSAPP_DIGITS}`;
  const phrase = NEEDS.find((n) => n.value === need)?.phrase;

  const lines = [];
  if (name) lines.push(`Hello, I'm ${name}.`);
  if (phrase) lines.push(`I'm getting in touch about ${phrase}.`);
  if (message) lines.push(message);

  if (lines.length === 0) return base;
  return `${base}?text=${encodeURIComponent(lines.join('\n\n'))}`;
}
```

`encodeURIComponent` turns spaces into `%20` and newlines into `%0A`, which is what `wa.me` expects.

- [ ] **Step 4: Run to verify they pass**

Run: `npx vitest run tests/whatsapp.test.js`
Expected: 5 passed.

- [ ] **Step 5: Write the failing form tests**

Create `tests/contact-form.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ContactForm from '@/components/ContactForm';

describe('ContactForm', () => {
  it('renders a usable WhatsApp link before any input, for the no-JS case', () => {
    render(<ContactForm />);
    const link = screen.getByRole('link', { name: /whatsapp/i });
    expect(link).toHaveAttribute('href', 'https://wa.me/252619500776');
  });

  it('offers the email address as an alternative', () => {
    render(<ContactForm />);
    expect(screen.getByRole('link', { name: /Abdirahman\.bcs@gmail\.com/i }))
      .toHaveAttribute('href', 'mailto:Abdirahman.bcs@gmail.com');
  });

  it('updates the link href as the visitor types', () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Ayaan' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello' } });
    expect(screen.getByRole('link', { name: /whatsapp/i }).getAttribute('href'))
      .toContain('Ayaan');
  });

  it('never posts anywhere — there is no action and no submit button', () => {
    const { container } = render(<ContactForm />);
    const form = container.querySelector('form');
    expect(form).not.toHaveAttribute('action');
    expect(container.querySelector('button[type="submit"], input[type="submit"]')).toBeNull();
  });
});
```

The last test is the architectural guarantee in executable form: there is no endpoint, so there is nothing to spam and nothing to store.

- [ ] **Step 6: Run to verify they fail**

Run: `npx vitest run tests/contact-form.test.jsx`
Expected: FAIL — module not found.

- [ ] **Step 7: Implement the form**

Create `components/ContactForm.jsx`:

```jsx
'use client';

import { useState } from 'react';
import { composeWhatsAppUrl, EMAIL, NEEDS, WHATSAPP_DISPLAY } from '@/lib/whatsapp';

export default function ContactForm() {
  const [fields, setFields] = useState({ name: '', need: '', message: '' });
  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form className="contact" onSubmit={(e) => e.preventDefault()}>
      <p className="contact-lede">
        Tell me what you need and this opens WhatsApp with the message written.
        Nothing is sent anywhere until you press send in WhatsApp.
      </p>

      <label htmlFor="cf-name">Your name</label>
      <input id="cf-name" name="name" value={fields.name} onChange={set('name')} autoComplete="name" />

      <label htmlFor="cf-need">What do you need?</label>
      <select id="cf-need" name="need" value={fields.need} onChange={set('need')}>
        <option value="">Choose one</option>
        {NEEDS.map((n) => <option key={n.value} value={n.value}>{n.label}</option>)}
      </select>

      <label htmlFor="cf-message">Message</label>
      <textarea id="cf-message" name="message" rows="4" value={fields.message} onChange={set('message')} />

      <a className="btn" href={composeWhatsAppUrl(fields)} target="_blank" rel="noopener noreferrer">
        Open WhatsApp
      </a>

      <p className="contact-alt">
        Or reach me directly on WhatsApp at {WHATSAPP_DISPLAY}, or by email at{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </form>
  );
}
```

The action is an anchor, not a submit button, so the href is always a valid `wa.me` link — including before anything is typed. Server-rendered HTML therefore contains a working link even if hydration never runs.

- [ ] **Step 8: Run to verify they pass**

Run: `npx vitest run tests/contact-form.test.jsx`
Expected: 4 passed.

- [ ] **Step 9: Commit**

```bash
git add lib components/ContactForm.jsx tests/whatsapp.test.js tests/contact-form.test.jsx app/globals.css
git commit -m "feat: WhatsApp compose contact form with no backend"
```

---

### Task 5: Index page

**Files:**
- Create: `lib/work.js`
- Modify: `app/page.jsx`, `app/globals.css`
- Create: `tests/home.test.jsx`

**Interfaces:**
- Consumes: `Reveal`, `ContactForm`.
- Produces: `WORK` — array of `{ slug, href, year, title, blurb }`, reused by Tasks 7–9.

- [ ] **Step 1: Write the failing page tests**

Create `tests/home.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Home from '@/app/page';

vi.mock('motion/react', () => ({ useInView: () => true, useReducedMotion: () => false }));

describe('Home', () => {
  it('states the argument in the first heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 }).textContent)
      .toMatch(/Monday morning/i);
  });

  it('links the live client site prominently for prospective clients', () => {
    render(<Home />);
    const links = screen.getAllByRole('link', { name: /somstarkitchen\.com/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', 'https://somstarkitchen.com');
  });

  it('lists all three work entries', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /business system/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /catalogue/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /earlier/i })).toBeInTheDocument();
  });

  it('mentions no employer anywhere', () => {
    const { container } = render(<Home />);
    expect(container.textContent).not.toMatch(/Macruuf|Taaj/i);
  });
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run tests/home.test.jsx`
Expected: FAIL — the heading does not match.

- [ ] **Step 3: Create the shared work metadata**

Create `lib/work.js`:

```js
export const WORK = [
  {
    slug: 'somstar-system',
    href: '/work/somstar-system/',
    year: '2026',
    title: 'The business system',
    blurb:
      "A client's invoicing, stock, debts, payroll and shareholder accounting on Cloudflare Workers and D1. No framework, no build step. Money in whole cents, a financial year that cannot be rewritten once closed, and around 590 checks that prove it.",
  },
  {
    slug: 'somstar-catalogue',
    href: '/work/somstar-catalogue/',
    year: '2026',
    title: 'The trilingual catalogue',
    blurb:
      'Sixty-three products in English, Somali and Arabic — 219 pages, statically exported. A build step trims every supplier photograph to the product itself and ships it in six sizes, so the grid is even and a phone pulls 6KB where the file is 53KB.',
  },
  {
    slug: 'earlier',
    href: '/work/earlier/',
    year: '2024',
    title: 'Earlier — Python, data, small tools',
    blurb:
      'A diabetes classifier, a novel scraper that builds EPUBs, a GPA calculator in PyQt5. Where I learned to finish things.',
  },
];
```

- [ ] **Step 4: Build the page**

Replace `app/page.jsx`:

```jsx
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { WORK } from '@/lib/work';

export default function Home() {
  return (
    <div className="wrap">
      <section className="hero">
        <Reveal index={0}><p className="kicker">Abdirahman Hassan Abdi — software engineer for hire</p></Reveal>
        <Reveal index={1}>
          <h1>Software that has to work on <em>Monday morning</em>.</h1>
        </Reveal>
        <Reveal index={2}>
          <p className="lede">
            A kitchen-equipment company in Mogadishu hired me to build the software that runs it.
            When the invoicing breaks, nobody files a ticket — their staff simply can&rsquo;t sell.
            That constraint shapes everything I build.
          </p>
        </Reveal>
        <Reveal index={3}>
          <p className="hero-link">
            See it running:{' '}
            <a href="https://somstarkitchen.com" target="_blank" rel="noopener noreferrer">
              somstarkitchen.com
            </a>
          </p>
        </Reveal>
      </section>

      <section className="work" aria-labelledby="work-h">
        <h2 id="work-h" className="section-label">Selected work</h2>
        <ul className="work-list">
          {WORK.map((item, i) => (
            <li key={item.slug}>
              <Reveal index={i}>
                <article className="entry">
                  <span className="entry-year">{item.year}</span>
                  <div>
                    <h3><a href={item.href}>{item.title}</a></h3>
                    <p>{item.blurb}</p>
                  </div>
                  <span className="entry-go" aria-hidden="true">→</span>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="about" aria-labelledby="about-h">
        <h2 id="about-h" className="section-label">About</h2>
        <Reveal>
          <p>
            I build and ship production systems — the kind a business opens in the morning and
            depends on all day. I work close to the problem, keep the stack small enough that
            nothing rots, and test the parts where being wrong costs money.
          </p>
          <p>
            BSc Computer Science, Cavendish University Uganda, 2020&ndash;2024. IBM Cybersecurity
            Practitioner. Data manipulation and formulas in Excel, Kubicle.
          </p>
        </Reveal>
      </section>

      <section className="contact-section" aria-labelledby="contact-h">
        <h2 id="contact-h" className="section-label">Get in touch</h2>
        <ContactForm />
      </section>
    </div>
  );
}
```

- [ ] **Step 5: Style the index**

Append to `app/globals.css`:

```css
.site-head { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: 1.25rem 0; border-bottom: 1px solid var(--rule); }
.site-head nav { display: flex; align-items: center; gap: 1rem; }
.site-name { font-weight: 700; color: var(--ink); text-decoration: none; }
.theme-toggle { background: none; border: 1px solid var(--rule); color: var(--ink); border-radius: 2px; padding: .5rem .75rem; min-height: 44px; cursor: pointer; }

.hero { padding: clamp(3rem, 9vw, 6rem) 0; display: flex; flex-direction: column; gap: 1.25rem; }
.kicker { font-size: .78rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: var(--accent); margin: 0; }
.hero h1 { font-size: var(--step-4); margin: 0; max-width: 17ch; }
.hero h1 em { font-style: italic; color: var(--accent); }
.lede { font-size: var(--step-1); color: var(--dim); margin: 0; }
.hero-link { margin: 0; }

.section-label { font-family: var(--font-body), system-ui, sans-serif; font-size: .78rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: var(--dim); margin: 0 0 1rem; }
section + section { padding-top: clamp(2.5rem, 6vw, 4rem); }

.work-list { list-style: none; margin: 0; padding: 0; }
.entry { display: grid; grid-template-columns: 5rem minmax(0, 1fr) 2rem; gap: 1.25rem; align-items: baseline; padding: 1.5rem 0; border-bottom: 1px solid var(--rule); }
.entry-year { font-size: .8rem; font-weight: 700; letter-spacing: .08em; color: var(--dim); font-variant-numeric: tabular-nums; }
.entry h3 { font-size: var(--step-2); margin: 0 0 .4rem; }
.entry h3 a { text-decoration: none; color: var(--ink); border-bottom: 1px solid var(--accent); }
.entry p { color: var(--dim); margin: 0; font-size: .95rem; }
.entry-go { color: var(--accent); transition: transform .2s ease; }
.entry:hover .entry-go { transform: translateX(4px); }

.contact { display: flex; flex-direction: column; gap: .5rem; max-width: 34rem; }
.contact label { font-size: .8rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--dim); margin-top: .5rem; }
.contact input, .contact select, .contact textarea { font: inherit; padding: .7rem .8rem; min-height: 44px; background: var(--surface); color: var(--ink); border: 1px solid var(--rule); border-radius: 2px; }
.btn { align-self: flex-start; margin-top: 1rem; background: var(--accent); color: var(--ground); text-decoration: none; font-weight: 700; padding: .8rem 1.4rem; border-radius: 2px; min-height: 44px; display: inline-flex; align-items: center; }
.contact-alt, .contact-lede { color: var(--dim); font-size: .9rem; }

.site-foot { border-top: 1px solid var(--rule); margin-top: 4rem; padding: 1.5rem 0; color: var(--dim); font-size: .85rem; }

@media (max-width: 640px) {
  .entry { grid-template-columns: 1fr; gap: .35rem; }
  .entry-go { display: none; }
}
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npx vitest run`
Expected: all suites pass.

- [ ] **Step 7: Verify the build**

Run: `npm run build && npm run check:build`
Expected: pass.

- [ ] **Step 8: Commit**

```bash
git add app lib tests
git commit -m "feat: index page with hero, work list, about and contact"
```

---

### Task 6: Figure primitive

Every figure in both case studies uses this. It supplies the caption, the horizontal scroll container, the accessible name, and the sequenced reveal that makes a diagram assemble in the order its mechanism runs.

**Files:**
- Create: `components/Figure.jsx`
- Modify: `app/globals.css`
- Create: `tests/figure.test.jsx`

**Interfaces:**
- Consumes: `Reveal` from Task 3.
- Produces: `<Figure id title caption>{svgOrTable}</Figure>`. Children marked `data-seq="n"` reveal in ascending order, 140ms apart.

- [ ] **Step 1: Write the failing tests**

Create `tests/figure.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Figure from '@/components/Figure';

vi.mock('motion/react', () => ({ useInView: () => true, useReducedMotion: () => false }));

describe('Figure', () => {
  it('renders the caption as a figcaption', () => {
    render(<Figure title="Pipeline" caption="How a photo becomes six files."><svg /></Figure>);
    expect(screen.getByText('How a photo becomes six files.').tagName).toBe('FIGCAPTION');
  });

  it('gives the figure an accessible name', () => {
    render(<Figure title="Pipeline" caption="c"><svg /></Figure>);
    expect(screen.getByRole('figure', { name: /Pipeline/i })).toBeInTheDocument();
  });

  it('puts wide content in its own scroll container', () => {
    const { container } = render(<Figure title="t" caption="c"><svg /></Figure>);
    expect(container.querySelector('.figure-scroll')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run tests/figure.test.jsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement Figure**

Create `components/Figure.jsx`:

```jsx
import Reveal from '@/components/Reveal';

export default function Figure({ title, caption, children }) {
  return (
    <Reveal as="figure" className="figure">
      <div className="figure-scroll">{children}</div>
      <figcaption>
        <span className="figure-title">{title}.</span> {caption}
      </figcaption>
    </Reveal>
  );
}
```

`Reveal` already renders the element with `data-reveal` and toggles `data-in`, so a figure inherits the failsafe, the reduced-motion behaviour and the no-JS safety without repeating any of it.

- [ ] **Step 4: Add figure and sequencing styles**

Append to `app/globals.css`:

```css
.figure { margin: 2.5rem 0; }
.figure-scroll { overflow-x: auto; border: 1px solid var(--rule); border-radius: 2px; background: var(--surface); padding: 1.5rem; }
.figure svg { display: block; width: 100%; height: auto; min-width: 34rem; }
.figure figcaption { margin-top: .75rem; font-size: .85rem; color: var(--dim); max-width: var(--measure); }
.figure-title { color: var(--ink); font-weight: 700; }

/* Sequenced assembly: parts appear in the order the mechanism runs. */
html.js .figure [data-seq] { opacity: 0; }
html.js .figure[data-in="true"] [data-seq] {
  opacity: 1;
  transition: opacity .45s ease calc(var(--seq-delay, 0ms));
}
html.js .figure [data-seq="1"] { --seq-delay: 0ms; }
html.js .figure [data-seq="2"] { --seq-delay: 140ms; }
html.js .figure [data-seq="3"] { --seq-delay: 280ms; }
html.js .figure [data-seq="4"] { --seq-delay: 420ms; }
html.js .figure [data-seq="5"] { --seq-delay: 560ms; }

@media (prefers-reduced-motion: reduce) {
  html.js .figure [data-seq] { opacity: 1; transition: none; }
}

.figure text { font-family: var(--font-body), system-ui, sans-serif; font-size: 12px; }
```

- [ ] **Step 5: Run to verify they pass**

Run: `npx vitest run tests/figure.test.jsx`
Expected: 3 passed.

- [ ] **Step 6: Commit**

```bash
git add components/Figure.jsx app/globals.css tests/figure.test.jsx
git commit -m "feat: figure primitive with sequenced assembly"
```

---

### Task 7: Catalogue case study and figures 1–3

**Files:**
- Create: `components/figures/ImagePipeline.jsx`, `UrlTree.jsx`, `PayloadBars.jsx`
- Create: `app/work/somstar-catalogue/page.jsx`
- Create: `tests/catalogue.test.jsx`

**Interfaces:**
- Consumes: `Figure`, `Reveal`.
- Produces: three figure components, each a default export taking no props.

- [ ] **Step 1: Write the failing tests**

Create `tests/catalogue.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/work/somstar-catalogue/page';

vi.mock('motion/react', () => ({ useInView: () => true, useReducedMotion: () => false }));

describe('Catalogue case study', () => {
  it('opens and closes with the live client link', () => {
    render(<Page />);
    const links = screen.getAllByRole('link', { name: /somstarkitchen\.com/i });
    expect(links.length).toBeGreaterThanOrEqual(2);
  });

  it('carries the verified figures', () => {
    const { container } = render(<Page />);
    expect(container.textContent).toContain('63');
    expect(container.textContent).toContain('219');
  });

  it('renders three figures', () => {
    render(<Page />);
    expect(screen.getAllByRole('figure')).toHaveLength(3);
  });

  it('never links the private repository', () => {
    const { container } = render(<Page />);
    expect(container.innerHTML).not.toContain('github.com/saturnthehustler/the private catalogue repository');
  });
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run tests/catalogue.test.jsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Build figure 1 — the image pipeline**

Create `components/figures/ImagePipeline.jsx`:

```jsx
export default function ImagePipeline() {
  const stages = [
    { x: 0,   label: 'Source',      sub: 'any shape' },
    { x: 130, label: 'Trim',        sub: 'to the product' },
    { x: 260, label: 'Normalise',   sub: '4:3, centred' },
    { x: 390, label: 'Six files',   sub: '400/800/1200' },
    { x: 520, label: 'Fingerprint', sub: 'cached a year' },
  ];

  return (
    <svg viewBox="0 0 640 170" role="img" aria-label="A supplier photograph passing through five build stages">
      <title>The image pipeline</title>
      {stages.map((s, i) => (
        <g key={s.label} data-seq={i + 1}>
          <rect x={s.x} y="30" width="104" height="64" rx="2"
                fill="var(--surface)" stroke="var(--rule)" />
          <text x={s.x + 52} y="60" textAnchor="middle" fill="var(--ink)" fontWeight="700">{s.label}</text>
          <text x={s.x + 52} y="78" textAnchor="middle" fill="var(--dim)" fontSize="11">{s.sub}</text>
          {i < stages.length - 1 && (
            <path d={`M${s.x + 108} 62 L${s.x + 126} 62`} stroke="var(--accent)" strokeWidth="1.5" fill="none"
                  markerEnd="url(#arrow)" />
          )}
        </g>
      ))}
      <defs>
        <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
        </marker>
      </defs>
      <text x="0" y="130" fill="var(--dim)" fontSize="11">
        Every product lands in an identical frame, so no card is left half empty.
      </text>
    </svg>
  );
}
```

- [ ] **Step 4: Build figure 2 — the URL tree**

Create `components/figures/UrlTree.jsx`:

```jsx
export default function UrlTree() {
  const branches = [
    { y: 40,  lang: 'English', prefix: '/' },
    { y: 82,  lang: 'Somali',  prefix: '/so/' },
    { y: 124, lang: 'Arabic',  prefix: '/ar/' },
  ];

  return (
    <svg viewBox="0 0 640 190" role="img" aria-label="Three language prefixes sharing one English slug">
      <title>The trilingual URL tree</title>
      {branches.map((b, i) => (
        <g key={b.lang} data-seq={i + 1}>
          <text x="0" y={b.y + 4} fill="var(--dim)" fontSize="11">{b.lang}</text>
          <rect x="70" y={b.y - 14} width="70" height="24" rx="2" fill="var(--surface)" stroke="var(--accent)" />
          <text x="105" y={b.y + 3} textAnchor="middle" fill="var(--accent)" fontWeight="700">{b.prefix}</text>
          <path d={`M144 ${b.y - 2} L214 ${b.y - 2}`} stroke="var(--rule)" strokeWidth="1.5" fill="none" />
          <rect x="218" y={b.y - 14} width="330" height="24" rx="2" fill="var(--surface)" stroke="var(--rule)" />
          <text x="230" y={b.y + 3} fill="var(--ink)">products/cooking-equipment/gas-griddle/</text>
        </g>
      ))}
      <g data-seq="4">
        <text x="0" y="170" fill="var(--dim)" fontSize="11">
          Slugs stay English, so one product&rsquo;s three pages are obviously the same product. 219 URLs in total.
        </text>
      </g>
    </svg>
  );
}
```

- [ ] **Step 5: Build figure 3 — the payload comparison**

Create `components/figures/PayloadBars.jsx`:

```jsx
export default function PayloadBars() {
  const max = 53;
  const scale = 460 / max;
  const bars = [
    { label: 'Source file', kb: 53, fill: 'var(--rule)',   ink: 'var(--ink)' },
    { label: 'Sent to a phone', kb: 6, fill: 'var(--accent)', ink: 'var(--accent)' },
  ];

  return (
    <svg viewBox="0 0 640 150" role="img" aria-label="Bar comparison of 53KB against 6KB">
      <title>What the phone actually downloads</title>
      {bars.map((b, i) => (
        <g key={b.label} data-seq={i + 1}>
          <text x="0" y={i * 56 + 26} fill="var(--dim)" fontSize="11">{b.label}</text>
          <rect x="0" y={i * 56 + 34} width={b.kb * scale} height="26" rx="2" fill={b.fill} />
          <text x={b.kb * scale + 10} y={i * 56 + 52} fill={b.ink} fontWeight="700"
                style={{ fontVariantNumeric: 'tabular-nums' }}>
            {b.kb}KB
          </text>
        </g>
      ))}
      <g data-seq="3">
        <text x="0" y="140" fill="var(--dim)" fontSize="11">
          Six variants per photograph, chosen by srcset and sizes.
        </text>
      </g>
    </svg>
  );
}
```

- [ ] **Step 6: Write the case study page**

Create `app/work/somstar-catalogue/page.jsx`:

```jsx
import Figure from '@/components/Figure';
import Reveal from '@/components/Reveal';
import ImagePipeline from '@/components/figures/ImagePipeline';
import UrlTree from '@/components/figures/UrlTree';
import PayloadBars from '@/components/figures/PayloadBars';

export const metadata = {
  title: 'The trilingual catalogue — Abdirahman Hassan Abdi',
  description:
    'Sixty-three products in English, Somali and Arabic: 219 statically exported pages with a build-time image pipeline.',
};

const FACTS = [
  ['63', 'products across six categories'],
  ['219', 'URLs in the sitemap'],
  ['3', 'languages, each with real pages'],
];

export default function Page() {
  return (
    <article className="wrap study">
      <Reveal index={0}><p className="kicker">Client work · SOMSTAR Kitchen Equipment · 2026</p></Reveal>
      <Reveal index={1}><h1>The trilingual catalogue</h1></Reveal>
      <Reveal index={2}>
        <p className="lede">
          SOMSTAR sells commercial kitchen equipment across Somalia. They needed a catalogue their
          customers could actually read — which meant Somali and Arabic as real languages, not a
          widget that swaps text after the page loads. It is live at{' '}
          <a href="https://somstarkitchen.com" target="_blank" rel="noopener noreferrer">somstarkitchen.com</a>.
        </p>
      </Reveal>

      <Reveal index={3}>
        <dl className="facts">
          {FACTS.map(([n, label]) => (
            <div key={label}><dt>{n}</dt><dd>{label}</dd></div>
          ))}
        </dl>
      </Reveal>

      <h2>Sixty-three photographs, no two alike</h2>
      <p>
        Supplier photographs arrive at wildly different shapes and with different amounts of
        whitespace baked in — a portrait grinder, a 2:1 oven, a kettle floating in the middle of an
        empty frame. Drop those into a grid untouched and one product fills its card while the next
        sits marooned in white space.
      </p>
      <p>
        So the build does it instead. Every file in <code>images/</code> is matched to a product by
        name, trimmed back to the product itself, then scaled into a fixed frame and centred on a
        4:3 canvas. A filename that matches nothing is reported by name and the build carries on, so
        a typo is visible rather than silent.
      </p>
      <Figure
        title="Figure 1"
        caption="A supplier photograph becomes six files and one fingerprinted URL. Trimming and re-framing are what keep the grid even."
      >
        <ImagePipeline />
      </Figure>

      <h2>Three languages, one URL shape</h2>
      <p>
        English keeps <code>/</code>. Somali gets <code>/so/</code>, Arabic <code>/ar/</code>. No
        existing URL moved, so the search positions the site already held kept working.
      </p>
      <p>
        Slugs stay English. A Somali page lives at <code>/so/products/cooking-equipment/gas-griddle/</code>,
        not a transliterated path — so all three languages share one URL shape, a product&rsquo;s three
        pages are obviously the same product, and no address depends on a translation being right.
      </p>
      <p>
        There is no automatic redirect by browser language. Auto-redirecting breaks shared links,
        confuses crawlers, and guesses wrong for the many phones in Somalia set to English. The
        switcher is explicit and the URL is the only thing that carries the language.
      </p>
      <Figure
        title="Figure 2"
        caption="Three prefixes, one shared English slug. 219 URLs, each declaring its own canonical address."
      >
        <UrlTree />
      </Figure>

      <h2>What the phone actually downloads</h2>
      <p>
        Each photograph ships at 400, 800 and 1200px in both WebP and JPEG, chosen by{' '}
        <code>srcset</code> and <code>sizes</code>. A phone pulls about 6KB where the full file is
        53KB — on the connections this site is actually opened on, that is the difference between a
        catalogue and a blank screen.
      </p>
      <p>
        Each URL carries a short fingerprint of the source file. Untouched photographs stay cached
        for a year as immutable; a replaced photograph becomes a different URL that no cache has
        ever seen, so it appears immediately without anyone clearing anything.
      </p>
      <Figure
        title="Figure 3"
        caption="The same photograph as stored and as delivered. Fingerprinted URLs make a year-long cache and an instant update compatible."
      >
        <PayloadBars />
      </Figure>

      <h2>What I would change</h2>
      <p>
        The Somali equipment vocabulary is my best effort and it should not be. Those terms belong
        to the people who use them daily, and the right process would have been to draft the
        structure and have the wording corrected before launch rather than after. Every string lives
        in a data file precisely so that correction is an edit rather than a rebuild — but building
        the escape hatch is not the same as not needing it.
      </p>

      <Reveal>
        <p className="study-out">
          See it running:{' '}
          <a href="https://somstarkitchen.com" target="_blank" rel="noopener noreferrer">somstarkitchen.com</a>
        </p>
      </Reveal>
    </article>
  );
}
```

- [ ] **Step 7: Style the case study**

Append to `app/globals.css`:

```css
.study { padding: clamp(2.5rem, 7vw, 4.5rem) 0; }
.study h1 { font-size: var(--step-4); margin: .5rem 0 1rem; max-width: 18ch; }
.study h2 { font-size: var(--step-3); margin: 3rem 0 .75rem; max-width: 22ch; }
.study p { margin: 0 0 1rem; }
.study code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .88em; background: var(--surface); border: 1px solid var(--rule); border-radius: 2px; padding: .1em .35em; }
.study-out { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--rule); }

.facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr)); gap: 1rem; margin: 2rem 0; padding: 1.25rem 0; border-block: 1px solid var(--rule); }
.facts dt { font-family: var(--font-display), Georgia, serif; font-size: var(--step-3); color: var(--accent); font-variant-numeric: tabular-nums; }
.facts dd { margin: .25rem 0 0; font-size: .85rem; color: var(--dim); }
```

- [ ] **Step 8: Run the tests to verify they pass**

Run: `npx vitest run tests/catalogue.test.jsx`
Expected: 4 passed.

- [ ] **Step 9: Commit**

```bash
git add app/work/somstar-catalogue components/figures app/globals.css tests/catalogue.test.jsx
git commit -m "feat: catalogue case study with image pipeline, URL tree and payload figures"
```

---

### Task 8: Business system case study and figures 4–7

No screenshots exist for this system and none may be taken: it is behind authentication and holds a client's real financial data. Every number below is illustrative.

**Files:**
- Create: `components/figures/WeightedCost.jsx`, `DocumentFlow.jsx`, `YearClose.jsx`, `RoleMatrix.jsx`
- Create: `app/work/somstar-system/page.jsx`
- Create: `tests/system.test.jsx`

**Interfaces:**
- Consumes: `Figure`, `Reveal`.
- Produces: four figure components, each a default export taking no props. `RoleMatrix` renders an HTML `<table>`, not SVG — it is tabular data.

- [ ] **Step 1: Write the failing tests**

Create `tests/system.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/work/somstar-system/page';

vi.mock('motion/react', () => ({ useInView: () => true, useReducedMotion: () => false }));

describe('Business system case study', () => {
  it('renders four figures', () => {
    render(<Page />);
    expect(screen.getAllByRole('figure')).toHaveLength(4);
  });

  it('names the admin host in prose but never links it', () => {
    const { container } = render(<Page />);
    expect(container.textContent).toContain('inventory.somstarkitchen.com');
    expect(container.querySelector('a[href*="inventory.somstarkitchen.com"]')).toBeNull();
  });

  it('publishes no real client figures', () => {
    const { container } = render(<Page />);
    expect(container.textContent).not.toContain(ACCEPTANCE_FIGURE);
    
  });

  it('presents the role matrix as a table', () => {
    render(<Page />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run tests/system.test.jsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Build figure 4 — weighted-average costing**

Create `components/figures/WeightedCost.jsx`:

```jsx
export default function WeightedCost() {
  return (
    <svg viewBox="0 0 640 180" role="img" aria-label="Two purchases blending into one held cost">
      <title>Weighted-average costing</title>

      <g data-seq="1">
        <rect x="0" y="20" width="200" height="52" rx="2" fill="var(--surface)" stroke="var(--rule)" />
        <text x="16" y="44" fill="var(--ink)" fontWeight="700">2 ovens at $1,400</text>
        <text x="16" y="62" fill="var(--dim)" fontSize="11">first purchase — $2,800</text>
      </g>

      <g data-seq="2">
        <rect x="0" y="86" width="200" height="52" rx="2" fill="var(--surface)" stroke="var(--rule)" />
        <text x="16" y="110" fill="var(--ink)" fontWeight="700">3 ovens at $1,600</text>
        <text x="16" y="128" fill="var(--dim)" fontSize="11">later purchase — $4,800</text>
      </g>

      <g data-seq="3">
        <path d="M204 46 L268 46 L268 80" stroke="var(--rule)" strokeWidth="1.5" fill="none" />
        <path d="M204 112 L268 112 L268 80" stroke="var(--rule)" strokeWidth="1.5" fill="none" />
        <path d="M268 80 L330 80" stroke="var(--accent)" strokeWidth="1.5" fill="none" markerEnd="url(#arrow2)" />
        <text x="276" y="70" fill="var(--dim)" fontSize="11">$7,600 ÷ 5</text>
      </g>

      <g data-seq="4">
        <rect x="340" y="52" width="230" height="58" rx="2" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="358" y="78" fill="var(--accent)" fontWeight="700" fontSize="15">5 ovens held at $1,520</text>
        <text x="358" y="96" fill="var(--dim)" fontSize="11">stored as 152000 cents</text>
      </g>

      <text x="0" y="166" fill="var(--dim)" fontSize="11">
        Illustrative figures. All money is held as whole cents, so the average never drifts.
      </text>

      <defs>
        <marker id="arrow2" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
        </marker>
      </defs>
    </svg>
  );
}
```

- [ ] **Step 4: Build figure 5 — document and stock flow**

Create `components/figures/DocumentFlow.jsx`:

```jsx
export default function DocumentFlow() {
  return (
    <svg viewBox="0 0 640 200" role="img" aria-label="A quotation moves no stock; an invoice moves stock and writes an audit row">
      <title>Document and stock flow</title>

      <g data-seq="1">
        <rect x="0" y="72" width="150" height="48" rx="2" fill="var(--surface)" stroke="var(--rule)" />
        <text x="16" y="94" fill="var(--ink)" fontWeight="700">Product line</text>
        <text x="16" y="111" fill="var(--dim)" fontSize="11">name, code, cost</text>
      </g>

      <g data-seq="2">
        <path d="M154 88 L214 40" stroke="var(--rule)" strokeWidth="1.5" fill="none" />
        <rect x="218" y="14" width="180" height="52" rx="2" fill="var(--surface)" stroke="var(--rule)" />
        <text x="234" y="38" fill="var(--ink)" fontWeight="700">Quotation · SKE</text>
        <text x="234" y="55" fill="var(--dim)" fontSize="11">stock unchanged</text>
      </g>

      <g data-seq="3">
        <path d="M154 104 L214 152" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
        <rect x="218" y="126" width="180" height="52" rx="2" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="234" y="150" fill="var(--accent)" fontWeight="700">Invoice · SKI</text>
        <text x="234" y="167" fill="var(--dim)" fontSize="11">stock down, values frozen</text>
      </g>

      <g data-seq="4">
        <path d="M402 152 L456 152" stroke="var(--accent)" strokeWidth="1.5" fill="none" markerEnd="url(#arrow3)" />
        <rect x="462" y="126" width="170" height="52" rx="2" fill="var(--surface)" stroke="var(--rule)" />
        <text x="478" y="150" fill="var(--ink)" fontWeight="700">Audit row</text>
        <text x="478" y="167" fill="var(--dim)" fontSize="11">what, balance, why, who</text>
      </g>

      <g data-seq="5">
        <path d="M308 70 L308 122" stroke="var(--dim)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" markerEnd="url(#arrow3)" />
        <text x="318" y="100" fill="var(--dim)" fontSize="11">only on “turn into invoice”</text>
      </g>

      <defs>
        <marker id="arrow3" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
        </marker>
      </defs>
    </svg>
  );
}
```

- [ ] **Step 5: Build figure 6 — the close-and-reopen gate**

Create `components/figures/YearClose.jsx`. It must show only the state
machine — open, closed, a blocked late entry, and the two reopen conditions.
**It must not depict how profit is divided:** SOMSTAR consented to being
named as a client, not to having their commercial terms published. See the
shipped component for the exact drawing.

- [ ] **Step 6: Build figure 7 — the role matrix**

Create `components/figures/RoleMatrix.jsx`:

```jsx
const ROWS = [
  ['Sales, quotations, customers, repayments', true, true, true],
  ['Cost prices, purchases, voiding, expenses', true, true, false],
  ['Salary, shareholders, users, settings', true, false, false],
];

export default function RoleMatrix() {
  return (
    <table className="matrix">
      <caption className="visually-hidden">
        What each role can do. Permission is re-checked on the server for every request and every save.
      </caption>
      <thead>
        <tr>
          <th scope="col">Can do</th>
          <th scope="col">Owner</th>
          <th scope="col">Manager</th>
          <th scope="col">Staff</th>
        </tr>
      </thead>
      <tbody>
        {ROWS.map(([label, ...cells]) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            {cells.map((allowed, i) => (
              <td key={i} data-allowed={allowed ? 'yes' : 'no'}>
                <span aria-hidden="true">{allowed ? '●' : '—'}</span>
                <span className="visually-hidden">{allowed ? 'Allowed' : 'Not allowed'}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

Add to `app/globals.css`:

```css
.visually-hidden { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.matrix { border-collapse: collapse; width: 100%; min-width: 30rem; font-size: .9rem; }
.matrix th, .matrix td { border-bottom: 1px solid var(--rule); padding: .7rem .6rem; text-align: left; }
.matrix thead th { font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; color: var(--dim); }
.matrix tbody th { font-weight: 400; color: var(--ink); }
.matrix td { text-align: center; width: 5.5rem; }
.matrix td[data-allowed="yes"] { color: var(--accent); }
.matrix td[data-allowed="no"] { color: var(--dim); }
```

- [ ] **Step 7: Write the case study page**

Create `app/work/somstar-system/page.jsx`:

```jsx
import Figure from '@/components/Figure';
import Reveal from '@/components/Reveal';
import WeightedCost from '@/components/figures/WeightedCost';
import DocumentFlow from '@/components/figures/DocumentFlow';
import YearClose from '@/components/figures/YearClose';
import RoleMatrix from '@/components/figures/RoleMatrix';

export const metadata = {
  title: 'The business system — Abdirahman Hassan Abdi',
  description:
    'Invoicing, stock, debts and shareholder accounting on Cloudflare Workers and D1, with around 590 automated checks.',
};

const FACTS = [
  ['590', 'automated checks'],
  ['0', 'floating point numbers in the money paths'],
  ['3', 'roles, re-checked on every save'],
];

export default function Page() {
  return (
    <article className="wrap study">
      <Reveal index={0}><p className="kicker">Client work · SOMSTAR Kitchen Equipment · 2026</p></Reveal>
      <Reveal index={1}><h1>The business system</h1></Reveal>
      <Reveal index={2}>
        <p className="lede">
          Everything behind the counter: invoicing, quotations, stock, debts, expenses, payroll and
          the partnership accounting that decides who is owed what at the end of the year. It runs at
          inventory.somstarkitchen.com, behind a login, on Cloudflare&rsquo;s free tier.
        </p>
      </Reveal>

      <Reveal index={3}>
        <dl className="facts">
          {FACTS.map(([n, label]) => (
            <div key={label}><dt>{n}</dt><dd>{label}</dd></div>
          ))}
        </dl>
      </Reveal>

      <p className="note">
        The screenshots you would normally expect here are missing on purpose. The system holds a
        client&rsquo;s real trading figures, so every diagram below uses invented numbers and shows
        mechanism rather than data.
      </p>

      <h2>Money that cannot drift</h2>
      <p>
        Every amount is stored as a whole number of cents. There is no floating point anywhere in
        the money paths, because a tenth of a cent lost per line becomes a balance nobody can
        explain three months later.
      </p>
      <p>
        Purchases blend into a weighted average rather than replacing the last price. Buy two ovens
        at $1,400 and later three at $1,600, and all five are held at $1,520 — so the profit on the
        next sale is honest regardless of which physical oven leaves the shop.
      </p>
      <Figure
        title="Figure 4"
        caption="Two purchases resolving into one held cost. Figures are illustrative; the arithmetic is exact because it never leaves whole cents."
      >
        <WeightedCost />
      </Figure>

      <h2>A document either moves stock or it doesn&rsquo;t</h2>
      <p>
        A quotation is a promise, not a sale, so it never touches stock. It becomes an invoice only
        when someone presses &ldquo;turn into invoice&rdquo;, and that is the moment stock comes down.
      </p>
      <p>
        Each invoice line freezes that day&rsquo;s product name, code, model and cost. Rename a
        product next year and last year&rsquo;s invoice still says what it said — history cannot be
        rewritten by an edit made later. Every stock movement writes an audit row recording what
        changed, the balance that resulted, why, on which document, and by whom.
      </p>
      <Figure
        title="Figure 5"
        caption="One product line, two possible fates. Only the invoice path moves stock, and it always leaves a trail."
      >
        <DocumentFlow />
      </Figure>

      <h2>Closing a year is a one-way door</h2>
      <p>
        Closing a financial year settles every shareholder balance and freezes it.
        The commercial terms behind that settlement are the client's business and are not
        described here. Reopening is gated on two conditions rather than a permission.
      </p>
      <Figure
        title="Figure 6"
        caption="Closing is one-way, and reopening is a gate rather than a right."
      >
        <YearClose />
      </Figure>

      <h2>Three roles, checked twice</h2>
      <p>
        Staff sell. Managers also see cost prices and purchases. Owners also see salaries,
        shareholders and settings. Hiding a page is presentation, not security, so the server
        re-checks permission on every request and every save — the hidden pages refuse a direct
        request just as firmly as the navigation refuses to show them.
      </p>
      <p>
        Around that sit the ordinary defences: six wrong passwords lock an account for fifteen
        minutes, the error never reveals whether an account exists, sessions are HttpOnly, Secure
        and SameSite, and forms refuse cross-site posts twice over.
      </p>
      <Figure
        title="Figure 7"
        caption="What each role can reach. The same matrix is enforced on the server, not just reflected in the navigation."
      >
        <RoleMatrix />
      </Figure>

      <h2>What I would change</h2>
      <p>
        There is no build step, no framework and no client-side library, which makes the system
        almost impossible to break by accident and very easy to redeploy — but it also means the
        pages are assembled as strings, and the larger ones have grown past the size where that
        stays comfortable to read. The next serious change should split the biggest page modules
        before adding to them, not after.
      </p>
    </article>
  );
}
```

Add to `app/globals.css`:

```css
.note { border-left: 2px solid var(--accent); padding: .5rem 0 .5rem 1rem; color: var(--dim); font-size: .92rem; margin: 2rem 0; }
```

- [ ] **Step 8: Run the tests to verify they pass**

Run: `npx vitest run tests/system.test.jsx`
Expected: 4 passed.

- [ ] **Step 9: Commit**

```bash
git add app/work/somstar-system components/figures app/globals.css tests/system.test.jsx
git commit -m "feat: business system case study with costing, flow, year-close and role figures"
```

---

### Task 9: Earlier work page

**Files:**
- Create: `app/work/earlier/page.jsx`
- Modify: `scripts/check-build.mjs` (restore the full `required` list)
- Create: `tests/earlier.test.jsx`

**Interfaces:**
- Consumes: `Reveal`.
- Produces: the third and final route, completing the build check.

- [ ] **Step 1: Write the failing test**

Create `tests/earlier.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/work/earlier/page';

vi.mock('motion/react', () => ({ useInView: () => true, useReducedMotion: () => false }));

describe('Earlier work', () => {
  it('lists all five projects', () => {
    render(<Page />);
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(5);
  });

  it('links each public repository', () => {
    render(<Page />);
    const links = screen.getAllByRole('link', { name: /on github/i });
    expect(links).toHaveLength(5);
    links.forEach((l) => expect(l.getAttribute('href')).toContain('github.com/saturnthehustler/'));
  });

  it('frames the work honestly rather than inflating it', () => {
    const { container } = render(<Page />);
    expect(container.textContent).toMatch(/learned to finish/i);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run tests/earlier.test.jsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the page**

Create `app/work/earlier/page.jsx`:

```jsx
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Earlier work — Abdirahman Hassan Abdi',
  description: 'Python, data and small tools from 2024 — where I learned to finish things.',
};

const PROJECTS = [
  {
    title: 'Machine learning model for diabetes prediction',
    repo: 'https://github.com/saturnthehustler/Machine-Model-for-Diabetes-Prediction',
    body:
      'Predicts diabetes from health indicators — age, BMI, blood glucose and the rest. The interesting part was not the model but the preparation: filling missing values without inventing patients, encoding the categorical columns, and normalising the numeric ones. Logistic regression tuned by grid-search cross-validation, judged on ROC AUC and a full classification report rather than raw accuracy, which flatters any classifier on an unbalanced set.',
  },
  {
    title: 'ChapterVerse — scraping to EPUB',
    repo: 'https://github.com/saturnthehustler/chapterverse-scraper',
    body:
      'Scrapes serialised novels chapter by chapter and assembles them into EPUB files with a cover. Concurrent fetching to make a few hundred chapters bearable, and automatic retries for the transient network errors that are guaranteed at that volume. The lesson that stuck: anything touching a network needs a retry policy decided up front, not bolted on after the first failed run.',
  },
  {
    title: 'ExcelConvertGUI',
    repo: 'https://github.com/saturnthehustler/ExcelConvertGUI',
    body:
      'A Tkinter desktop tool that merges many Excel workbooks into one file, each source on its own sheet. Written for people who are not going to open a terminal, which made validation and plain-language error messages the whole job rather than an afterthought.',
  },
  {
    title: 'Dynamic GPA calculator',
    repo: 'https://github.com/saturnthehustler/GPA-Calculator',
    body:
      'A PyQt5 application for adding semesters, entering grades and credit units per module, and getting both semester and cumulative GPA. Small, but the first thing I built where the interface had to survive someone using it wrong.',
  },
  {
    title: 'The previous version of this site',
    repo: 'https://github.com/saturnthehustler/saturnthehustler.github.io',
    body:
      'A single HTML file with a particle background, a typewriter heading and fifteen logo images standing in for a skills section. It is here deliberately: it is the thing this redesign replaced, and keeping it visible is more useful than pretending the earlier version never existed.',
  },
];

export default function Page() {
  return (
    <article className="wrap study">
      <Reveal index={0}><p className="kicker">2024</p></Reveal>
      <Reveal index={1}><h1>Earlier work</h1></Reveal>
      <Reveal index={2}>
        <p className="lede">
          Python, data and small tools. None of it is production software and none of it carries a
          business — but this is where I learned to finish things, which turned out to be the part
          that transferred.
        </p>
      </Reveal>

      {PROJECTS.map((p, i) => (
        <Reveal key={p.title} index={i}>
          <section className="earlier-item">
            <h2>{p.title}</h2>
            <p>{p.body}</p>
            <p>
              <a href={p.repo} target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </p>
          </section>
        </Reveal>
      ))}
    </article>
  );
}
```

Add to `app/globals.css`:

```css
.earlier-item { padding: 2rem 0; border-bottom: 1px solid var(--rule); }
.earlier-item h2 { font-size: var(--step-2); margin: 0 0 .6rem; }
```

- [ ] **Step 4: Restore the full build check**

In `scripts/check-build.mjs`, set `required` back to all five entries:

```js
const required = [
  'index.html',
  '.nojekyll',
  'work/somstar-catalogue/index.html',
  'work/somstar-system/index.html',
  'work/earlier/index.html',
];
```

- [ ] **Step 5: Run everything**

Run: `npx vitest run && npm run build && npm run check:build`
Expected: all suites pass; `build check passed — 5 required paths present`.

- [ ] **Step 6: Commit**

```bash
git add app/work/earlier app/globals.css scripts/check-build.mjs tests/earlier.test.jsx
git commit -m "feat: earlier work page and full route coverage in the build check"
```

---

### Task 10: Analytics, the privacy guard, and browser checks

**Files:**
- Create: `components/Analytics.jsx`
- Modify: `app/layout.jsx`
- Create: `scripts/check-privacy.mjs`
- Create: `playwright.config.mjs`, `tests/browser/site.spec.mjs`

**Interfaces:**
- Consumes: the built `out/` directory.
- Produces: `npm run check:privacy` and `npm run test:browser`, both wired into CI.

- [ ] **Step 1: Write the privacy guard**

Create `scripts/check-privacy.mjs`. It walks the built output **and this
repository's own documents and source** — the repo is public, so a scrubbed
page beside an unscrubbed spec leaks equally — and fails the build if any
forbidden string appears, or if the admin host turns up inside an `href`.

**Do not list the forbidden strings in this document.** They are the private
repository names, the Cloudflare Worker and secret names, the test suite's
acceptance figure, the client's business phone number, and their partnership
terms. They live in the script, which exempts itself from its own scan, and
nowhere else. Writing them here would publish exactly what the check exists
to keep unpublished.

- [ ] **Step 2: Run it against the current build**

Run: `npm run build && npm run check:privacy`
Expected: PASS. If `wrangler` is reported, it will be from a stray note in page copy — remove the wording rather than relaxing the check.

- [ ] **Step 3: Add the analytics beacon**

Create `components/Analytics.jsx`:

```jsx
const TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export default function Analytics() {
  if (!TOKEN) return null;
  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: TOKEN })}
    />
  );
}
```

Returning `null` without a token means local development and tests send nothing, and a missing secret degrades to no analytics rather than a broken page.

**Copy the exact beacon snippet from the Cloudflare dashboard** when registering the site (Web Analytics → Add a site), and confirm the attribute names match what is written above before relying on it. The dashboard is authoritative.

Set the token as a repository variable, then expose it in `.github/workflows/deploy.yml` on the build step:

```yaml
      - run: npm run build
        env:
          NEXT_PUBLIC_CF_BEACON_TOKEN: ${{ vars.CF_BEACON_TOKEN }}
```

- [ ] **Step 4: Wire it in with the disclosure**

In `app/layout.jsx`, import `Analytics` and update the footer:

```jsx
        <footer className="site-foot wrap">
          <p>© 2026 Abdirahman Hassan Abdi</p>
          <p className="disclosure">
            This site uses Cloudflare Web Analytics, which counts visits without cookies and
            without tracking anyone between sites.
          </p>
        </footer>
        <Analytics />
```

- [ ] **Step 5: Add browser checks**

```bash
npm install -D @playwright/test
npx playwright install chromium
```

Create `playwright.config.mjs`:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  webServer: {
    command: 'npx serve out -l 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
  },
  use: { baseURL: 'http://localhost:4321' },
});
```

Create `tests/browser/site.spec.mjs`:

```js
import { expect, test } from '@playwright/test';

const ROUTES = ['/', '/work/somstar-catalogue/', '/work/somstar-system/', '/work/earlier/'];

for (const route of ROUTES) {
  test(`${route} has no horizontal overflow at 390px`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflows).toBe(false);
  });
}

test('content is readable with JavaScript disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/work/somstar-system/');
  await expect(page.getByRole('heading', { name: 'The business system' })).toBeVisible();
  await expect(page.getByRole('figure').first()).toBeVisible();
  await context.close();
});

test('the contact link works before any typing and without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('link', { name: /open whatsapp/i }))
    .toHaveAttribute('href', 'https://wa.me/252619500776');
  await context.close();
});

test('everything is visible under reduced motion', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: /somstarkitchen\.com/i }).first()).toBeVisible();
  await context.close();
});
```

The JavaScript-disabled tests are the ones that matter most: they are the executable form of "content must never be gated behind motion".

- [ ] **Step 6: Run the browser checks**

```bash
npm install -D serve
npm run build && npm run test:browser
```

Expected: all pass. A failure on the reduced-motion or no-JS tests means a hidden state escaped the `html.js` gate — find the inline `opacity: 0` and move it into CSS.

- [ ] **Step 7: Add both checks to CI**

In `.github/workflows/deploy.yml`, after `npm run check:build`:

```yaml
      - run: npm test
      - run: npm run check:privacy
      - run: npm run check:contrast
```

- [ ] **Step 8: Commit**

```bash
git add components/Analytics.jsx app/layout.jsx scripts/check-privacy.mjs playwright.config.mjs tests/browser .github package.json package-lock.json
git commit -m "feat: analytics beacon, privacy guard and browser checks"
```

---

### Task 11: Cutover

**Files:**
- Delete: `index.html`, the 15 skill-logo JPEGs in `Assets/`
- Modify: `README.md`

**Interfaces:**
- Consumes: everything above.
- Produces: a deployable branch ready to merge to `main`.

- [ ] **Step 1: Confirm what the old assets are used for**

```bash
grep -rn "Assets/" app components lib || echo "no references from the new site"
```

Expected: no references. The new site links to GitHub rather than showing thumbnails, so none of the old images are needed.

- [ ] **Step 2: Delete the legacy site**

```bash
git rm index.html
git rm "Assets/Python.jpg" "Assets/CSS.jpg" "Assets/HTML.jpg" "Assets/Javascript.jpg" "Assets/Pyqt5.jpg" \
       "Assets/Pandas.jpg" "Assets/Django.png" "Assets/Flask.jpg" "Assets/Tkinter.jpeg" "Assets/beautifulsoup.jpg" \
       "Assets/Scicit learn.webp" "Assets/Requests.jpg" "Assets/Seaborn.png" "Assets/Matplotlib.png" \
       "Assets/Openpyxl.jpg" "Assets/skills.jpg" "Assets/IBM.png" "Assets/excel.png"
```

The résumé PDF, the social icons and the project thumbnails stay — the PDF because it is linked from elsewhere, the rest because they cost little and may be wanted later. Everything removed here remains recoverable from git history.

- [ ] **Step 3: Rewrite the README**

Replace `README.md`:

```markdown
# saturnthehustler.github.io

My portfolio. Next.js, statically exported, deployed to GitHub Pages by GitHub Actions.

## Working on it

```bash
npm install
npm run dev          # http://localhost:3000
```

## Before pushing

```bash
npm test             # unit and component tests
npm run build        # static export into ./out
npm run check:build  # asserts the export has every route and .nojekyll
npm run check:privacy   # asserts nothing confidential reached ./out
npm run check:contrast  # asserts WCAG AA in both themes
npm run test:browser    # 390px overflow, no-JS, reduced motion
```

## Publishing

Push to `main`. GitHub Actions builds, runs every check, and deploys. A failed
check stops the deploy rather than publishing a broken site.

Pages **Source** must be set to "GitHub Actions" in repository settings.

## Structure

- `app/` — routes and the single stylesheet
- `components/` — shared pieces; `components/figures/` holds the seven diagrams
- `lib/` — pure logic worth testing on its own
- `scripts/` — the three guard scripts run in CI

## Design documents

- Spec: `docs/superpowers/specs/2026-09-05-portfolio-redesign-design.md`
- Plan: `docs/superpowers/plans/2026-09-05-portfolio-redesign.md`
```

- [ ] **Step 4: Run the full suite one last time**

```bash
npx vitest run && npm run build && npm run check:build && npm run check:privacy && npm run check:contrast && npm run test:browser
```

Expected: everything passes.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove the legacy single-file site and rewrite the README"
```

- [ ] **Step 6: Merge and verify live**

```bash
git checkout main
git merge redesign/field-notes
git push
```

Then watch the run at `https://github.com/saturnthehustler/saturnthehustler.github.io/actions`. When it goes green, open `https://saturnthehustler.github.io` and confirm: styles applied (if unstyled, `_next/` was dropped and Pages Source is still on branch deployment), the theme toggle works, all four routes load, and the WhatsApp button opens a composed message.

---

## Self-review

**Spec coverage.** Every spec section maps to a task: direction and tokens → 2; structure and four routes → 1, 5, 7, 8, 9; both case studies → 7, 8; all seven figures → 6, 7, 8; earlier work → 9; technical approach and the three Pages gotchas → 1; animation and its three defences → 3, 6, 10; budgets and accessibility → 2, 10; deletions → 11; contact form → 4; analytics → 10; "what is deliberately not published" → 10's privacy guard; success criteria 1–10 → each has an executable check except criterion 1, which is a human judgement made at review.

**Known gaps, deliberately deferred.** The spec calls for real screenshots of somstarkitchen.com in the catalogue case study. They are not in this plan: capturing, cropping and optimising them needs the live site open and a human eye on which frames are worth showing. The case study reads completely without them — three diagrams already carry the mechanism — so they are best added as a follow-up once the site is up. The 250KB budget is likewise checked by Cloudflare's Core Web Vitals after launch rather than asserted in CI, since a transferred-bytes assertion is brittle against font subsetting.

**Type consistency.** `Reveal` takes `{ children, index, as, className }` and is used with all four throughout. `Figure` takes `{ title, caption, children }` in Tasks 6, 7 and 8 identically. `composeWhatsAppUrl({ name, need, message })` is defined in Task 4 and called with exactly those keys in `ContactForm`. `WORK` from Task 5 exposes `slug`, `href`, `year`, `title`, `blurb` and is consumed only by the index. Figure components take no props anywhere.

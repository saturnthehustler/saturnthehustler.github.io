import { expect, test } from '@playwright/test';

const ROUTES = [
  '/',
  '/work/somstar-catalogue/',
  '/work/somstar-system/',
  '/work/earlier/',
];

for (const route of ROUTES) {
  test(`${route} cannot be scrolled sideways at 390px`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);

    // scrollWidth is the wrong metric on this page: it counts content inside
    // the overflow-x:auto figure containers, which is exactly what those
    // containers exist to hold, and reports overflow on a page that has none.
    // Two things actually matter to a reader — the page must not move
    // sideways, and nothing may be painted where they cannot reach it.
    const result = await page.evaluate(() => {
      window.scrollTo(500, 0);
      const moved = window.scrollX;
      window.scrollTo(0, 0);

      const docW = document.documentElement.clientWidth;
      const escaped = [...document.querySelectorAll('body *')]
        .filter((el) => {
          for (let p = el.parentElement; p; p = p.parentElement) {
            const o = getComputedStyle(p).overflowX;
            if (o === 'auto' || o === 'scroll' || o === 'hidden') return false;
          }
          return Math.round(el.getBoundingClientRect().right) > docW + 1;
        })
        .map((el) => `${el.tagName}.${el.className}`);

      return { moved, escaped };
    });

    expect(result.moved).toBe(0);
    expect(result.escaped).toEqual([]);
  });
}

test('every diagram fits inside its own viewBox', async ({ page }) => {
  const clipped = [];
  for (const route of ROUTES) {
    await page.goto(route);
    const bad = await page.evaluate(() =>
      [...document.querySelectorAll('.figure svg')]
        .map((s, i) => {
          const bb = s.getBBox();
          const vb = s.getAttribute('viewBox').split(' ').map(Number);
          return {
            i,
            right: Math.round(bb.x + bb.width),
            bottom: Math.round(bb.y + bb.height),
            vbW: vb[2],
            vbH: vb[3],
          };
        })
        .filter((f) => f.right > f.vbW || f.bottom > f.vbH)
    );
    bad.forEach((b) => clipped.push({ route, ...b }));
  }
  expect(clipped).toEqual([]);
});

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
  await expect(page.getByRole('link', { name: /open whatsapp/i })).toHaveAttribute(
    'href',
    'https://wa.me/252619500776'
  );
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

test('the pages load without console errors', async ({ page }) => {
  // The analytics beacon reports to cloudflareinsights.com, which rejects a
  // localhost origin with CORS — a property of running a production beacon off
  // its registered hostname, not a defect in the page. Serve it an empty script
  // so it never runs, and keep this assertion strict for everything else.
  // Fulfil rather than abort: an aborted request logs net::ERR_FAILED, which is
  // the very kind of console error being asserted against.
  await page.route('**cloudflareinsights.com/**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/javascript', body: '' })
  );

  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));

  for (const route of ROUTES) {
    await page.goto(route);
    await page.waitForLoadState('networkidle');
  }
  expect(errors).toEqual([]);
});

test('the analytics beacon is wired correctly when a token is configured', async ({ page }) => {
  // No token in local development, so there is nothing to assert there.
  // In CI the repository variable is set and the beacon must carry it.
  await page.route('**cloudflareinsights.com/**', (r) =>
    r.fulfill({ status: 200, contentType: 'application/javascript', body: '' })
  );
  await page.goto('/');

  const beacon = await page.evaluate(() => {
    const el = document.querySelector('script[src*="cloudflareinsights.com"]');
    if (!el) return null;
    return { type: el.getAttribute('type'), data: el.getAttribute('data-cf-beacon') };
  });

  test.skip(beacon === null, 'no beacon in this build — NEXT_PUBLIC_CF_BEACON_TOKEN is unset');

  expect(beacon.type).toBe('module');
  expect(JSON.parse(beacon.data).token).toMatch(/^[a-f0-9]{16,}$/);
});

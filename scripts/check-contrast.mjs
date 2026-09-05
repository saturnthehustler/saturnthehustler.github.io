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

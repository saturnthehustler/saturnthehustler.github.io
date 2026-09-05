import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// The built site is not the only public surface: this repository is public
// too, so a scrubbed page beside an unscrubbed spec leaks just as much.
const ROOTS = ['out', 'docs', 'app', 'components', 'lib', 'tests'];
const SCANNABLE = /\.(html|txt|json|js|jsx|mjs|css|md)$/;

// Everything published is architecture, not data. These are the strings that
// would cross that line, and the check fails rather than let them ship.
const FORBIDDEN = [
  ['somstar-website', 'private repository name'],
  ['github.com/saturnthehustler/inventory', 'private repository link'],
  ['black-haze-e617', 'Cloudflare Worker name'],
  ['CLOUDFLARE_API_TOKEN', 'secret name'],
  ['CLOUDFLARE_ACCOUNT_ID', 'secret name'],
  ['61641', 'real client acceptance figure'],
  ['61,641', 'real client acceptance figure'],
  ['9777738', "SOMSTAR's business phone number"],
  ['977 7738', "SOMSTAR's business phone number"],
  // SOMSTAR consented to being named as a client, not to having their
  // commercial arrangements described.
  ['operating partner', 'partnership terms'],
  ['days held', 'partnership terms'],
  ['days-held', 'partnership terms'],
  ['profit is split', 'partnership terms'],
  ['splits net profit', 'partnership terms'],
  ['% investors', 'partnership terms'],
];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    if (name === 'node_modules' || name === '.git') return [];
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const files = ROOTS.filter(existsSync).flatMap(walk).filter((f) => SCANNABLE.test(f));
const failures = [];

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const lower = text.toLowerCase();
  for (const [needle, why] of FORBIDDEN) {
    if (lower.includes(needle.toLowerCase())) {
      failures.push(`${file}: contains "${needle}" — ${why}`);
    }
  }
  // The admin host may be named in prose, but never linked.
  for (const [, href] of text.matchAll(/href="([^"]*inventory\.somstarkitchen\.com[^"]*)"/g)) {
    failures.push(`${file}: links the admin host — ${href}`);
  }
}

// This file necessarily contains every forbidden string, so it exempts itself.
const real = failures.filter((f) => !f.startsWith('scripts'));

if (real.length) {
  console.error('PRIVACY CHECK FAILED\n' + real.map((f) => '  ! ' + f).join('\n'));
  process.exit(1);
}
console.log(
  `privacy check passed — ${files.length} files across ${ROOTS.filter(existsSync).length} roots, ${FORBIDDEN.length} patterns clear`
);

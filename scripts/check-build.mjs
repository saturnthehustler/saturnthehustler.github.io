import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'out';

const required = [
  'index.html',
  '.nojekyll',
  'work/somstar-catalogue/index.html',
  'work/somstar-system/index.html',
  'work/earlier/index.html',
  'build/index.html',
  'build/website/index.html',
  'build/system/index.html',
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

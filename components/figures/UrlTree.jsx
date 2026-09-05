// Claim: three language prefixes converge on one English slug, so a
// product's three pages are obviously the same product.
export default function UrlTree() {
  const langs = [
    { y: 40, label: 'English', prefix: '/' },
    { y: 96, label: 'Somali', prefix: '/so/' },
    { y: 152, label: 'Arabic', prefix: '/ar/' },
  ];

  return (
    <svg
      viewBox="0 0 640 176"
      role="img"
      aria-label="Three language prefixes converging on one shared English slug across 219 URLs"
    >
      {langs.map((l, i) => (
        <g key={l.prefix} data-seq={i + 1}>
          <text x="14" y={l.y + 4} fill="currentColor" opacity=".65">{l.label}</text>
          <rect x="88" y={l.y - 14} width="74" height="26" rx="2" fill="none" stroke="var(--accent)" />
          <text x="125" y={l.y + 4} textAnchor="middle" fill="var(--accent)" fontWeight="700">
            {l.prefix}
          </text>
          <path
            d={`M166 ${l.y - 1} C 210 ${l.y - 1}, 236 96, 286 96`}
            fill="none" stroke="currentColor" opacity=".4" strokeWidth="1.5"
          />
        </g>
      ))}

      <g data-seq="4">
        <rect x="292" y="82" width="334" height="28" rx="2" fill="none" stroke="currentColor" opacity=".55" />
        <text x="306" y="100" fill="currentColor">products/cooking-equipment/gas-griddle/</text>
        <text x="292" y="130" fill="currentColor" opacity=".6">one slug, never transliterated</text>
      </g>

    </svg>
  );
}

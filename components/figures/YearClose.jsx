// Claim: net profit halves, and the investor half subdivides by how
// many days each investor's capital was actually held.
export default function YearClose() {
  const investors = [
    { name: 'Investor A', days: 365, share: '50%' },
    { name: 'Investor B', days: 210, share: '29%' },
    { name: 'Investor C', days: 150, share: '21%' },
  ];

  return (
    <svg
      viewBox="0 0 640 204"
      role="img"
      aria-label="Net profit splitting evenly between the operating partner and the investors, with the investor half subdivided by days of capital held"
    >
      <g data-seq="1">
        <rect x="0" y="16" width="176" height="48" rx="2" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="16" y="39" fill="var(--accent)" fontWeight="700">Net profit</text>
        <text x="16" y="56" fill="currentColor" opacity=".6">15 March &ndash; 14 March</text>
      </g>

      <g data-seq="2">
        <path d="M180 40 L216 40 L216 86" fill="none" stroke="currentColor" opacity=".45" strokeWidth="1.5" />
        <line x1="216" y1="86" x2="240" y2="86" stroke="currentColor" opacity=".45" strokeWidth="1.5"
              markerEnd="url(#yc-arrow-dim)" />
        <rect x="248" y="62" width="164" height="48" rx="2" fill="none" stroke="currentColor" opacity=".55" />
        <text x="264" y="85" fill="currentColor" fontWeight="700">50% operating partner</text>
        <text x="264" y="102" fill="currentColor" opacity=".6">for running the business</text>
      </g>

      <g data-seq="3">
        <path d="M216 86 L216 144" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <line x1="216" y1="144" x2="240" y2="144" stroke="var(--accent)" strokeWidth="1.5"
              markerEnd="url(#yc-arrow)" />
        <rect x="248" y="120" width="164" height="48" rx="2" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="264" y="143" fill="var(--accent)" fontWeight="700">50% investors</text>
        <text x="264" y="160" fill="currentColor" opacity=".6">weighted by days held</text>
      </g>

      <g data-seq="4">
        {investors.map((inv, i) => {
          const y = 18 + i * 58;
          return (
            <g key={inv.name}>
              <path d={`M416 144 C 444 144, 448 ${y + 21}, 470 ${y + 21}`}
                    fill="none" stroke="currentColor" opacity=".35" strokeWidth="1" />
              <rect x="474" y={y} width="162" height="42" rx="2" fill="none" stroke="currentColor" opacity=".5" />
              <text x="488" y={y + 19} fill="currentColor">{inv.name}</text>
              <text x="488" y={y + 34} fill="currentColor" opacity=".6">
                {inv.days} days &rarr; {inv.share}
              </text>
            </g>
          );
        })}
      </g>

      <defs>
        <marker id="yc-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
        </marker>
        <marker id="yc-arrow-dim" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="currentColor" opacity=".5" />
        </marker>
      </defs>
    </svg>
  );
}

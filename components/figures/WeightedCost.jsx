// Claim: two purchases at different prices resolve into one held cost.
export default function WeightedCost() {
  return (
    <svg
      viewBox="0 0 640 158"
      role="img"
      aria-label="Two ovens bought at 1400 dollars and three at 1600 dollars resolving to five ovens held at 1520 dollars each"
    >
      <g data-seq="1">
        <rect x="0" y="16" width="196" height="50" rx="2" fill="none" stroke="currentColor" opacity=".55" />
        <text x="16" y="40" fill="currentColor" fontWeight="700">2 ovens at $1,400</text>
        <text x="16" y="57" fill="currentColor" opacity=".6">first purchase &mdash; $2,800</text>
      </g>

      <g data-seq="2">
        <rect x="0" y="82" width="196" height="50" rx="2" fill="none" stroke="currentColor" opacity=".55" />
        <text x="16" y="106" fill="currentColor" fontWeight="700">3 ovens at $1,600</text>
        <text x="16" y="123" fill="currentColor" opacity=".6">later purchase &mdash; $4,800</text>
      </g>

      <g data-seq="3">
        <path d="M200 41 L240 41 L240 74" fill="none" stroke="currentColor" opacity=".45" strokeWidth="1.5" />
        <path d="M200 107 L240 107 L240 74" fill="none" stroke="currentColor" opacity=".45" strokeWidth="1.5" />
        <line x1="240" y1="74" x2="326" y2="74" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#wc-arrow)" />
        <text x="283" y="66" textAnchor="middle" fill="var(--accent)">$7,600 &divide; 5</text>
      </g>

      <g data-seq="4">
        <rect x="336" y="48" width="248" height="54" rx="2" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="354" y="74" fill="var(--accent)" fontWeight="700" fontSize="15">5 ovens held at $1,520</text>
        <text x="354" y="92" fill="currentColor" opacity=".6">stored as 152000 cents</text>
      </g>

      <defs>
        <marker id="wc-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
        </marker>
      </defs>
    </svg>
  );
}

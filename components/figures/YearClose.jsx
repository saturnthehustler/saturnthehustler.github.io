// Claim: closing a financial year is one-way. Later entries cannot reach
// back into it, and reopening is gated on two conditions rather than a
// permission. Deliberately says nothing about how profit is divided.
export default function YearClose() {
  return (
    <svg
      viewBox="0 0 640 202"
      role="img"
      aria-label="An open financial year closing one way, with later entries unable to reach back and reopening gated on two conditions"
    >
      <g data-seq="1">
        <rect x="0" y="62" width="146" height="52" rx="2" fill="none" stroke="currentColor" opacity=".55" />
        <text x="16" y="86" fill="currentColor" fontWeight="700">Year open</text>
        <text x="16" y="103" fill="currentColor" opacity=".6">entries still land</text>
      </g>

      <g data-seq="2">
        <line x1="150" y1="88" x2="204" y2="88" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#yc-arrow)" />
        <text x="177" y="80" textAnchor="middle" fill="var(--accent)">close</text>
        <rect x="212" y="62" width="170" height="52" rx="2" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="228" y="86" fill="var(--accent)" fontWeight="700">Year closed</text>
        <text x="228" y="103" fill="currentColor" opacity=".6">balances frozen</text>
      </g>

      <g data-seq="3">
        <rect x="212" y="152" width="170" height="42" rx="2" fill="none" stroke="currentColor" opacity=".45" />
        <text x="228" y="178" fill="currentColor" opacity=".6">A late expense</text>
        <line x1="297" y1="148" x2="297" y2="124" stroke="currentColor" opacity=".45" strokeWidth="1.5" />
        <path d="M290 141 L304 131 M290 131 L304 141" stroke="currentColor" opacity=".7" strokeWidth="1.5" />
        <text x="316" y="140" fill="currentColor" opacity=".6">cannot reach back</text>
      </g>

      <g data-seq="4">
        <line x1="386" y1="88" x2="424" y2="88" stroke="currentColor" opacity=".45" strokeWidth="1.5"
              strokeDasharray="4 4" markerEnd="url(#yc-arrow-dim)" />
        <text x="405" y="80" textAnchor="middle" fill="currentColor" opacity=".6">reopen</text>
        <rect x="432" y="42" width="204" height="92" rx="2" fill="none" stroke="currentColor" opacity=".4" />
        <text x="446" y="64" fill="currentColor" opacity=".65">only while both hold</text>
        <text x="446" y="88" fill="currentColor">1. no later year closed</text>
        <text x="446" y="110" fill="currentColor">2. the moved capital is</text>
        <text x="460" y="126" fill="currentColor">still there, by amount</text>
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

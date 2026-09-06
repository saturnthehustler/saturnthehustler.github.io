// Claim: every document a business writes moves stock, money, or neither —
// and whatever moves leaves a record.
export default function SystemShape() {
  const docs = [
    { y: 14, label: 'A purchase', stock: 'raises', money: null },
    { y: 74, label: 'A sale', stock: 'lowers', money: 'brings in' },
    { y: 134, label: 'A quotation', stock: null, money: null },
    { y: 194, label: 'An expense', stock: null, money: 'takes out' },
  ];

  return (
    <svg
      viewBox="0 0 640 268"
      role="img"
      aria-label="Four kinds of business document, each moving stock, money, both or neither, with every movement writing an audit record"
    >
      <g data-seq="1">
        {docs.map((d) => (
          <g key={d.label}>
            <rect x="0" y={d.y} width="150" height="42" rx="2" fill="none" stroke="currentColor" opacity=".5" />
            <text x="16" y={d.y + 26} fill="currentColor">{d.label}</text>
          </g>
        ))}
      </g>

      <g data-seq="2">
        <rect x="248" y="34" width="116" height="46" rx="2" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="306" y="62" textAnchor="middle" fill="var(--accent)" fontWeight="700">Stock</text>
        <rect x="248" y="164" width="116" height="46" rx="2" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="306" y="192" textAnchor="middle" fill="var(--accent)" fontWeight="700">Money</text>
      </g>

      <g data-seq="3">
        {docs.map((d) => (
          <g key={d.label}>
            {d.stock && (
              <path d={`M154 ${d.y + 21} C 196 ${d.y + 21}, 210 57, 242 57`}
                    fill="none" stroke="var(--accent)" opacity=".75" strokeWidth="1.5" markerEnd="url(#ss-arrow)" />
            )}
            {d.money && (
              <path d={`M154 ${d.y + 21} C 196 ${d.y + 21}, 210 187, 242 187`}
                    fill="none" stroke="var(--accent)" opacity=".75" strokeWidth="1.5" markerEnd="url(#ss-arrow)" />
            )}
            {!d.stock && !d.money && (
              <>
                <path d={`M154 ${d.y + 21} L 214 ${d.y + 21}`} fill="none" stroke="currentColor"
                      opacity=".35" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="220" y={d.y + 25} fill="currentColor" opacity=".55">moves nothing yet</text>
              </>
            )}
          </g>
        ))}
      </g>

      <g data-seq="4">
        <path d="M368 57 C 400 57, 410 122, 440 122" fill="none" stroke="currentColor" opacity=".45" strokeWidth="1.5" markerEnd="url(#ss-arrow-dim)" />
        <path d="M368 187 C 400 187, 410 122, 440 122" fill="none" stroke="currentColor" opacity=".45" strokeWidth="1.5" markerEnd="url(#ss-arrow-dim)" />
        <rect x="448" y="94" width="186" height="56" rx="2" fill="none" stroke="currentColor" opacity=".55" />
        <text x="464" y="118" fill="currentColor" fontWeight="700">Every movement</text>
        <text x="464" y="136" fill="currentColor" opacity=".65">recorded: what, why, who</text>
      </g>

      <g data-seq="5">
        <text x="0" y="258" fill="currentColor" opacity=".6">
          A quotation becomes a sale only when you say so — which is when stock finally moves.
        </text>
      </g>

      <defs>
        <marker id="ss-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
        </marker>
        <marker id="ss-arrow-dim" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="currentColor" opacity=".5" />
        </marker>
      </defs>
    </svg>
  );
}

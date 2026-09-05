// Claim: one product line has two possible fates, and only the invoice
// path moves stock — which is why it always leaves a trail.
export default function DocumentFlow() {
  return (
    <svg
      viewBox="0 0 640 196"
      role="img"
      aria-label="A product line becoming either a quotation, which moves no stock, or an invoice, which reduces stock and writes an audit row"
    >
      <g data-seq="1">
        <rect x="0" y="70" width="150" height="48" rx="2" fill="none" stroke="currentColor" opacity=".55" />
        <text x="16" y="92" fill="currentColor" fontWeight="700">Product line</text>
        <text x="16" y="109" fill="currentColor" opacity=".6">name, code, cost</text>
      </g>

      <g data-seq="2">
        <line x1="154" y1="86" x2="212" y2="46" stroke="currentColor" opacity=".45" strokeWidth="1.5"
              markerEnd="url(#df-arrow-dim)" />
        <rect x="220" y="12" width="180" height="50" rx="2" fill="none" stroke="currentColor" opacity=".55" />
        <text x="236" y="35" fill="currentColor" fontWeight="700">Quotation &middot; SKE</text>
        <text x="236" y="52" fill="currentColor" opacity=".6">stock unchanged</text>
      </g>

      <g data-seq="3">
        <line x1="154" y1="104" x2="212" y2="146" stroke="var(--accent)" strokeWidth="1.5"
              markerEnd="url(#df-arrow)" />
        <rect x="220" y="124" width="180" height="50" rx="2" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="236" y="147" fill="var(--accent)" fontWeight="700">Invoice &middot; SKI</text>
        <text x="236" y="164" fill="currentColor" opacity=".6">stock down, values frozen</text>
      </g>

      <g data-seq="4">
        <line x1="404" y1="149" x2="452" y2="149" stroke="var(--accent)" strokeWidth="1.5"
              markerEnd="url(#df-arrow)" />
        <text x="428" y="141" textAnchor="middle" fill="var(--accent)">writes</text>
        <rect x="460" y="124" width="176" height="50" rx="2" fill="none" stroke="currentColor" opacity=".55" />
        <text x="476" y="147" fill="currentColor" fontWeight="700">Audit row</text>
        <text x="476" y="164" fill="currentColor" opacity=".6">what, balance, why, who</text>
      </g>

      <g data-seq="5">
        <line x1="310" y1="66" x2="310" y2="120" stroke="currentColor" opacity=".45" strokeWidth="1.5"
              strokeDasharray="4 4" markerEnd="url(#df-arrow-dim)" />
        <text x="320" y="97" fill="currentColor" opacity=".6">only on &ldquo;turn into invoice&rdquo;</text>
      </g>

      <defs>
        <marker id="df-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
        </marker>
        <marker id="df-arrow-dim" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="currentColor" opacity=".5" />
        </marker>
      </defs>
    </svg>
  );
}

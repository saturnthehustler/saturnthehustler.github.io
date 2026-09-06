// Claim: what a client hands over is short, and what comes back is not.
export default function WebsiteAnatomy() {
  const given = ['Your product list', 'Photos, any shape', 'Phone and address'];
  // Kept short deliberately: a label wider than its box overflows the viewBox,
  // and the explanation belongs in the caption rather than the drawing.
  const shipped = [
    'A page per product, per language',
    'Photos trimmed and resized',
    'Findable in search',
    'Enquiries in your WhatsApp',
  ];

  return (
    <svg
      viewBox="0 0 640 236"
      role="img"
      aria-label="Three things a client provides passing through a build step and returning as four things the finished site does"
    >
      <g data-seq="1">
        <text x="0" y="14" fill="currentColor" opacity=".65">You provide</text>
        {given.map((g, i) => (
          <g key={g}>
            <rect x="0" y={30 + i * 54} width="176" height="42" rx="2" fill="none" stroke="currentColor" opacity=".5" />
            <text x="16" y={56 + i * 54} fill="currentColor">{g}</text>
          </g>
        ))}
      </g>

      <g data-seq="2">
        <line x1="182" y1="112" x2="216" y2="112" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#wa-arrow)" />
        <rect x="224" y="80" width="104" height="64" rx="2" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="276" y="108" textAnchor="middle" fill="var(--accent)" fontWeight="700">The build</text>
        <text x="276" y="126" textAnchor="middle" fill="currentColor" opacity=".65">runs on every</text>
        <text x="276" y="140" textAnchor="middle" fill="currentColor" opacity=".65">change</text>
        <line x1="334" y1="112" x2="368" y2="112" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#wa-arrow)" />
      </g>

      <g data-seq="3">
        <text x="376" y="14" fill="currentColor" opacity=".65">What you get back</text>
        {shipped.map((s, i) => (
          <g key={s}>
            <rect x="376" y={24 + i * 50} width="258" height="38" rx="2" fill="none" stroke="var(--accent)" opacity=".7" />
            <text x="390" y={48 + i * 50} fill="currentColor">{s}</text>
          </g>
        ))}
      </g>

      <defs>
        <marker id="wa-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
        </marker>
      </defs>
    </svg>
  );
}

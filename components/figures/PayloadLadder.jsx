// Claim: the browser picks one of six variants from srcset; a phone
// transfers 6KB of a 53KB source.
export default function PayloadLadder() {
  const widths = ['400', '800', '1200'];
  const devices = [
    { x: 198, label: '390px phone', picked: true },
    { x: 348, label: '768px tablet', picked: false },
    { x: 498, label: '1280px desktop', picked: false },
  ];

  return (
    <svg
      viewBox="0 0 640 216"
      role="img"
      aria-label="One source file encoded into six variants, from which a phone selects the 400 pixel WebP and transfers 6 kilobytes of a 53 kilobyte source"
    >
      <g data-seq="1">
        <rect x="14" y="60" width="100" height="46" rx="2" fill="none" stroke="currentColor" opacity=".55" />
        <text x="64" y="80" textAnchor="middle" fill="currentColor">Source</text>
        <text x="64" y="97" textAnchor="middle" fill="currentColor" opacity=".6">53KB</text>
        <line
          x1="118" y1="83" x2="142" y2="83"
          stroke="currentColor" opacity=".5" strokeWidth="1.5" markerEnd="url(#pl-arrow-dim)"
        />
      </g>

      <g data-seq="2">
        <text x="150" y="34" fill="currentColor" opacity=".65">Six variants, written at build time</text>
        {widths.map((w, i) => {
          const x = 150 + i * 150;
          const lead = w === '400';
          return (
            <g key={w}>
              <rect
                x={x} y="46" width="96" height="30" rx="2" fill="none"
                stroke={lead ? 'var(--accent)' : 'currentColor'} opacity={lead ? 1 : 0.5}
              />
              <text x={x + 48} y="66" textAnchor="middle" fill={lead ? 'var(--accent)' : 'currentColor'}>
                {w} WebP
              </text>
              <rect x={x} y="82" width="96" height="30" rx="2" fill="none" stroke="currentColor" opacity=".5" />
              <text x={x + 48} y="102" textAnchor="middle" fill="currentColor" opacity=".7">{w} JPEG</text>
            </g>
          );
        })}
      </g>

      <g data-seq="3">
        {devices.map((d) => (
          <g key={d.label}>
            <line
              x1={d.x} y1="168" x2={d.x} y2="120"
              stroke={d.picked ? 'var(--accent)' : 'currentColor'}
              opacity={d.picked ? 1 : 0.45}
              strokeWidth="1.5"
              markerEnd={d.picked ? 'url(#pl-arrow)' : 'url(#pl-arrow-dim)'}
            />
            <text
              x={d.x} y="186" textAnchor="middle"
              fill={d.picked ? 'var(--accent)' : 'currentColor'}
              opacity={d.picked ? 1 : 0.65}
            >
              {d.label}
            </text>
          </g>
        ))}
        <text x="198" y="204" textAnchor="middle" fill="var(--accent)" fontWeight="700">transfers 6KB</text>
      </g>


      <defs>
        <marker id="pl-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
        </marker>
        <marker id="pl-arrow-dim" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="currentColor" opacity=".5" />
        </marker>
      </defs>
    </svg>
  );
}

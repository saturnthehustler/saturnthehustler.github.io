// Claim: closing a year computes a settlement per shareholder and writes it
// to their capital. The arrangement drawn here is a plain equal split used as
// an example — it is not any client's actual arrangement.
export default function ShareSplit() {
  const holders = [
    { y: 16, name: 'Shareholder A' },
    { y: 80, name: 'Shareholder B' },
    { y: 144, name: 'Shareholder C' },
  ];

  return (
    <svg
      viewBox="0 0 640 204"
      role="img"
      aria-label="An example year's net result divided into three equal shareholder settlements of twenty thousand dollars each"
    >
      <g data-seq="1">
        <rect x="0" y="78" width="158" height="52" rx="2" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="16" y="102" fill="var(--accent)" fontWeight="700">Year result</text>
        <text x="16" y="119" fill="currentColor" opacity=".6">$60,000 &mdash; example</text>
      </g>

      <g data-seq="2">
        <text x="200" y="96" textAnchor="middle" fill="var(--accent)">divided</text>
        <text x="200" y="112" textAnchor="middle" fill="var(--accent)">equally</text>
        {holders.map((h) => (
          <path
            key={h.name}
            d={`M162 104 C 200 104, 210 ${h.y + 24}, 242 ${h.y + 24}`}
            fill="none" stroke="currentColor" opacity=".4" strokeWidth="1.5"
          />
        ))}
      </g>

      <g data-seq="3">
        {holders.map((h) => (
          <g key={h.name}>
            <rect x="250" y={h.y} width="224" height="48" rx="2" fill="none" stroke="currentColor" opacity=".5" />
            <text x="266" y={h.y + 21} fill="currentColor">{h.name}</text>
            <text x="266" y={h.y + 38} fill="currentColor" opacity=".6">$20,000 &mdash; one third</text>
          </g>
        ))}
      </g>

      <g data-seq="4">
        <path d="M488 16 L496 16 L496 192 L488 192" fill="none" stroke="currentColor" opacity=".35" />
        <text x="508" y="98" fill="currentColor" opacity=".7">written to capital,</text>
        <text x="508" y="114" fill="currentColor" opacity=".7">then frozen</text>
      </g>
    </svg>
  );
}

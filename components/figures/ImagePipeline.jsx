// Claim: supplier photographs arrive at unrelated shapes and scales;
// the build re-frames every one into an identical canvas.
export default function ImagePipeline() {
  const sources = [
    { x: 62, y: 22, w: 52, h: 70, rx: 14, ry: 26 },   // tall, tight crop
    { x: 30, y: 120, w: 116, h: 44, rx: 38, ry: 14 }, // wide, letterboxed
    { x: 50, y: 194, w: 76, h: 66, rx: 12, ry: 11 },  // square, mostly padding
  ];
  // Each product is scaled to 80% of the frame width or 84% of its height,
  // whichever it meets first, so all three touch the same bounds.
  // y values put each framed canvas on the same centre line as its source,
  // which also makes the gaps between them even at 13px.
  const framed = [
    { y: 21, rx: 16, ry: 30 },
    { y: 106, rx: 38, ry: 14 },
    { y: 191, rx: 33, ry: 30 },
  ];

  return (
    <svg
      viewBox="0 0 640 275"
      role="img"
      aria-label="Three supplier photographs at unrelated shapes and scales, re-framed by the build into three identical four-by-three canvases"
    >
      <g data-seq="1">
        <text x="20" y="12" fill="currentColor" opacity=".65">As supplied</text>
        {sources.map((s, i) => (
          <g key={i}>
            <rect
              x={s.x} y={s.y} width={s.w} height={s.h}
              fill="none" stroke="currentColor" strokeDasharray="3 3" opacity=".45"
            />
            <ellipse
              cx={s.x + s.w / 2} cy={s.y + s.h / 2} rx={s.rx} ry={s.ry}
              fill="currentColor" opacity=".8"
            />
          </g>
        ))}
      </g>

      <g data-seq="2">
        <line
          x1="176" y1="140" x2="404" y2="140"
          stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#pipe-arrow)"
        />
        <text x="290" y="132" textAnchor="middle" fill="var(--accent)">
          trim, re-frame to 4:3, encode &times;6
        </text>
        <text x="290" y="158" textAnchor="middle" fill="currentColor" opacity=".6">
          at build time
        </text>
      </g>

      <g data-seq="3">
        <text x="432" y="12" fill="currentColor" opacity=".65">As served</text>
        {framed.map((f, i) => (
          <g key={i}>
            <rect x="432" y={f.y} width="96" height="72" fill="none" stroke="var(--accent)" />
            <ellipse cx="480" cy={f.y + 36} rx={f.rx} ry={f.ry} fill="var(--accent)" opacity=".85" />
          </g>
        ))}
        <text x="540" y="140" fill="currentColor" opacity=".6">same frame,</text>
        <text x="540" y="156" fill="currentColor" opacity=".6">same scale</text>
      </g>


      <defs>
        <marker id="pipe-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
        </marker>
      </defs>
    </svg>
  );
}

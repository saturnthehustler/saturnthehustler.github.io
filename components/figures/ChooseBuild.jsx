// Claim: the two offers answer different questions, and which one you need
// follows from who is on the other side of the screen.
//
// Layout note: the arrow labels sit in the gap between the question box
// (ends at x=170) and the outcome boxes (start at x=300). Everything is
// sized to keep that corridor clear — a label that overlaps a box reads as
// a mistake, and the bounds test cannot catch overlap, only overflow.
export default function ChooseBuild() {
  return (
    <svg
      viewBox="0 0 640 208"
      role="img"
      aria-label="One question, who is it for, forking into a website for customers deciding whether to buy and a system for staff working after they decide"
    >
      <g data-seq="1">
        <rect x="0" y="72" width="170" height="60" rx="2" fill="none" stroke="currentColor" opacity=".55" />
        <text x="16" y="96" fill="currentColor" fontWeight="700">Who is on the</text>
        <text x="16" y="113" fill="currentColor" fontWeight="700">other side?</text>
      </g>

      <g data-seq="2">
        <path d="M174 100 C 220 100, 250 50, 292 50" fill="none" stroke="var(--accent)" strokeWidth="1.5"
              markerEnd="url(#cb-arrow)" />
        <text x="228" y="60" textAnchor="middle" fill="currentColor" opacity=".7">before they buy</text>
        <rect x="300" y="18" width="336" height="62" rx="2" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="318" y="44" fill="var(--accent)" fontWeight="700" fontSize="15">A website</text>
        <text x="318" y="64" fill="currentColor" opacity=".7">Someone deciding whether to buy</text>
      </g>

      <g data-seq="3">
        <path d="M174 106 C 220 106, 250 156, 292 156" fill="none" stroke="var(--accent)" strokeWidth="1.5"
              markerEnd="url(#cb-arrow)" />
        <text x="228" y="152" textAnchor="middle" fill="currentColor" opacity=".7">after they buy</text>
        <rect x="300" y="124" width="336" height="62" rx="2" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="318" y="150" fill="var(--accent)" fontWeight="700" fontSize="15">A system</text>
        <text x="318" y="170" fill="currentColor" opacity=".7">You and your staff, behind the counter</text>
      </g>

      <defs>
        <marker id="cb-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
        </marker>
      </defs>
    </svg>
  );
}

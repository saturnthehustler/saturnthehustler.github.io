import Reveal from '@/components/Reveal';

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function Figure({ title, caption, children }) {
  // A <figure> takes its accessible name from <figcaption> only patchily
  // across assistive technology, so the association is made explicit.
  const captionId = `fig-${slug(title)}`;

  return (
    <Reveal as="figure" className="figure" aria-labelledby={captionId}>
      <div className="figure-scroll">{children}</div>
      <figcaption id={captionId}>
        <span className="figure-title">{title}.</span> {caption}
      </figcaption>
    </Reveal>
  );
}

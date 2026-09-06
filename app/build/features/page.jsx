import Reveal from '@/components/Reveal';
import { INCLUDED, NOT_INCLUDED } from '@/lib/features';

export const metadata = {
  title: 'What a catalogue site includes — Abdirahman Hassan Abdi',
  description:
    'Every feature of the SOMSTAR catalogue explained, and an honest account of what it deliberately does not do and when a business would actually need it.',
};

const total = INCLUDED.reduce((n, g) => n + g.items.length, 0);

export default function Page() {
  return (
    <article className="wrap study">
      <p className="kicker">Reference · what you would actually receive</p>
      <h1>Everything a catalogue site can do</h1>
      <p className="lede">
        This is the full inventory of what the SOMSTAR catalogue does &mdash; {total} things, each
        explained in terms of what it changes for the business rather than what it is called. Then
        the harder half: what it deliberately does not do, and when a business genuinely needs each
        of those.
      </p>
      <p>
        Every item on this page is checked against{' '}
        <a href="https://somstarkitchen.com" target="_blank" rel="noopener noreferrer">
          somstarkitchen.com
        </a>{' '}
        as it runs today, not against a list of things I could imagine building. Open it and hold it
        to this.
      </p>

      {INCLUDED.map((group) => (
        <section key={group.group}>
          <h2>{group.group}</h2>
          <p>{group.lead}</p>
          <dl className="features">
            {group.items.map((item, i) => (
              <Reveal key={item.name} index={i} as="div" className="feature">
                <dt>{item.name}</dt>
                <dd>{item.what}</dd>
              </Reveal>
            ))}
          </dl>
        </section>
      ))}

      <h2>What it does not do</h2>
      <p>
        None of these are impossible &mdash; every one of them can be built, and some of them I have
        built elsewhere. They are absent from the catalogue because that business does not need them,
        and each one carries a cost that is easy to miss when you are reading a feature list: another
        thing to maintain, another way to break, another decision to keep making.
      </p>
      <p>
        The second column is the useful one. If you recognise your own situation there, say so and we
        will build it.
      </p>

      <div className="figure-scroll">
        <table className="matrix features-matrix">
          <caption className="visually-hidden">
            Features the catalogue does not include, what each one is, and when a business would
            actually need it.
          </caption>
          <thead>
            <tr>
              <th scope="col">Not included</th>
              <th scope="col">What it is</th>
              <th scope="col">When you would actually want it</th>
            </tr>
          </thead>
          <tbody>
            {NOT_INCLUDED.map((item) => (
              <tr key={item.name}>
                <th scope="row">{item.name}</th>
                <td>{item.what}</td>
                <td>{item.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>How to read this page</h2>
      <p>
        A feature list is a poor way to choose anything, because everything on it sounds worth
        having. The question worth asking about each line is not &ldquo;would I like that?&rdquo; but
        &ldquo;what happens in my business if it is missing?&rdquo; Most of the first half of this
        page answers that with &ldquo;customers do not find you&rdquo; or &ldquo;you do the work by
        hand forever&rdquo;. Most of the second half answers it with &ldquo;nothing&rdquo; &mdash;
        until the day it doesn&rsquo;t, which is exactly when to build it.
      </p>

      <p className="study-out">
        <a href="/build/">← Back to what I can build you</a>
      </p>
    </article>
  );
}

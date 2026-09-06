import Reveal from '@/components/Reveal';
import { SYSTEM_INCLUDED, SYSTEM_NOT_INCLUDED } from '@/lib/system-features';

export const metadata = {
  title: 'What a business system includes — Abdirahman Hassan Abdi',
  description:
    'Every part of the SOMSTAR business system explained, and an honest account of what it deliberately does not do and when a business would actually need it.',
};

const total = SYSTEM_INCLUDED.reduce((n, g) => n + g.items.length, 0);

export default function Page() {
  return (
    <article className="wrap study">
      <p className="kicker">Reference · what you would actually receive</p>
      <h1>Everything a business system can do</h1>
      <p className="lede">
        The full inventory of the system running behind the counter at SOMSTAR &mdash; {total}{' '}
        things, each explained by what it changes for the business rather than what it is called.
        Then the harder half: what it deliberately does not do, and when a business genuinely needs
        each of those.
      </p>
      <p>
        Unlike the catalogue, you cannot open this one and look &mdash; it sits behind a login at
        inventory.somstarkitchen.com and holds a client&rsquo;s real trading figures. So everything
        below is described in terms of mechanism, never data, and nothing here reveals how any
        particular business divides its money. The engineering is pulled apart further in the{' '}
        <a href="/work/somstar-system/">business system write-up</a>.
      </p>

      {SYSTEM_INCLUDED.map((group) => (
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
        None of these are impossible &mdash; every one of them can be built. They are absent because
        the business it was built for does not need them, and each carries a cost that a feature list
        hides: another thing to maintain, another way to be wrong, another decision to keep making
        forever.
      </p>
      <p>
        Two of them are worth flagging as genuinely expensive rather than merely absent. Working
        offline means two copies of the truth that have to be reconciled, and tax handling has to be
        written to the rules of one specific place. Everything else on this list is ordinary work.
      </p>

      <div className="figure-scroll">
        <table className="matrix features-matrix">
          <caption className="visually-hidden">
            Parts the business system does not include, what each one is, and when a business would
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
            {SYSTEM_NOT_INCLUDED.map((item) => (
              <tr key={item.name}>
                <th scope="row">{item.name}</th>
                <td>{item.what}</td>
                <td>{item.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>The part that is hard to see on a list</h2>
      <p>
        Almost everything above is something you could tick off in a comparison with off-the-shelf
        software, and most packages would tick more boxes. What they will not do is match how your
        business actually trades &mdash; the discount you always give that customer, the supplier who
        invoices in stages, the way your stock arrives by container twice a year.
      </p>
      <p>
        A system that fits the real routine gets used. One that fits an idealised routine gets
        abandoned within a month, and the notebook comes back out. That fit is the whole reason to
        have something built rather than bought, and it is not a feature on any list.
      </p>

      <p className="study-out">
        <a href="/build/">← Back to what I can build you</a>
      </p>
    </article>
  );
}

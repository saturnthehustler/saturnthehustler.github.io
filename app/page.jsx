import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { WORK } from '@/lib/work';

export default function Home() {
  return (
    <div className="wrap">
      {/* The hero staggers in via CSS animation on .hero > * — no wrapper
          components, so it runs off the main thread during first paint. */}
      <section className="hero">
        <p className="kicker">Abdirahman Hassan Abdi — software engineer for hire</p>
        <h1>Software that has to work on <em>Monday morning</em>.</h1>
        <p className="lede">
          A kitchen-equipment company in Mogadishu hired me to build the software that runs it.
          When the invoicing breaks, nobody files a ticket — their staff simply can&rsquo;t sell.
          That constraint shapes everything I build.
        </p>
        <p className="hero-link">
          See it running:{' '}
          <a href="https://somstarkitchen.com" target="_blank" rel="noopener noreferrer">
            somstarkitchen.com
          </a>
        </p>
      </section>

      {/* The lead: most visitors here are deciding whether to hire, so the
          offer comes before the evidence rather than after it. */}
      <section className="lead-in" aria-labelledby="lead-h">
        <h2 id="lead-h" className="section-label">If you are here to hire me</h2>
        <p className="lead-copy">
          I build two things for businesses: a website your customers can actually find, and the
          system behind the counter that runs what happens after they buy. Both explained in full
          &mdash; what ships with them, what I would need from you, and what they deliberately are
          not.
        </p>
        <p>
          <a className="btn" href="/build/">What I can build you</a>
        </p>
      </section>

      <section className="work" aria-labelledby="work-h">
        <h2 id="work-h" className="section-label">Selected work</h2>
        <ul className="work-list">
          {WORK.map((item, i) => (
            <li key={item.slug}>
              <Reveal index={i}>
                <article className="entry">
                  <span className="entry-year">{item.year}</span>
                  <div>
                    <h3><a href={item.href}>{item.title}</a></h3>
                    <p>{item.blurb}</p>
                  </div>
                  <span className="entry-go" aria-hidden="true">→</span>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="about" aria-labelledby="about-h">
        <h2 id="about-h" className="section-label">About</h2>
        <p>
          I build and ship production systems — the kind a business opens in the morning and
          depends on all day. I work close to the problem, keep the stack small enough that
          nothing rots, and test the parts where being wrong costs money.
        </p>
        <p>
          BSc Computer Science, Cavendish University Uganda, 2020&ndash;2024. IBM Cybersecurity
          Practitioner. Data manipulation and formulas in Excel, Kubicle.
        </p>
      </section>

      <section className="contact-section" aria-labelledby="contact-h">
        <h2 id="contact-h" className="section-label">Get in touch</h2>
        <ContactForm />
      </section>
    </div>
  );
}

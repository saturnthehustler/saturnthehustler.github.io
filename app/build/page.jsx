import Figure from '@/components/Figure';
import ContactForm from '@/components/ContactForm';
import ChooseBuild from '@/components/figures/ChooseBuild';
import WebsiteAnatomy from '@/components/figures/WebsiteAnatomy';
import SystemShape from '@/components/figures/SystemShape';

export const metadata = {
  title: 'What I can build you — Abdirahman Hassan Abdi',
  description:
    'Two things I build for businesses: a website customers can find, and the system behind the counter that runs what happens after they buy.',
};

export default function Page() {
  return (
    <article className="wrap study">
      <p className="kicker">For businesses · built, deployed, kept running</p>
      <h1>What I can build you</h1>
      <p className="lede">
        Two problems, and they are not the same problem. One is that people can&rsquo;t find what you
        sell. The other is that the business runs on paper, WhatsApp and memory, and nobody is quite
        sure what the stock is. I build for both &mdash; and I keep them running afterwards, because
        software nobody maintains stops being an asset within a year.
      </p>

      <Figure
        title="Figure 9"
        caption="Most businesses eventually need both, in that order — but they are different jobs, and starting the wrong one first wastes a season."
      >
        <ChooseBuild />
      </Figure>

      <h2>A website customers can actually find</h2>
      <p>
        Not a brochure. A catalogue with a real page for every product you sell, so that when
        somebody searches for the machine they need, the page that answers them is yours. Built as
        flat files that load fast on a phone in a place where data costs money, and hosted somewhere
        that charges nothing to serve them.
      </p>
      <p>
        Everything you would otherwise pay a person to do by hand happens in the build instead. You
        drop a photograph in with the product&rsquo;s name on it; the build trims it, sizes it,
        makes six versions and picks the right one for each visitor&rsquo;s screen. You add a
        product to a list; the page, the category count, the sitemap and the navigation all update
        themselves.
      </p>

      <Figure
        title="Figure 10"
        caption="What you hand over is short. What comes back is a catalogue that maintains its own structure, so adding the sixty-fourth product is as cheap as adding the third."
      >
        <WebsiteAnatomy />
      </Figure>

      <p className="callout">
        <a href="/build/website/">
          Every feature a catalogue site includes, explained &mdash; and what it deliberately
          doesn&rsquo;t do &rarr;
        </a>
      </p>

      <h3>What I would need from you</h3>
      <p>
        A list of what you sell, photographs in whatever state you have them, and your contact
        details. If you want it in more than one language, we talk about who checks the wording
        &mdash; I can draft it, but the words should end up belonging to someone who speaks it
        daily.
      </p>

      <h3>What it deliberately isn&rsquo;t</h3>
      <p>
        There is no shopping cart, no card payments and no customer accounts. Enquiries arrive on
        WhatsApp, where your customers already are and where you can answer in your own words. That
        is a deliberate choice for businesses that sell considered, high-value things &mdash; if you
        need people checking out at three in the morning without talking to you, this is the wrong
        build and I will say so.
      </p>

      <h2>A system that runs what happens after they buy</h2>
      <p>
        The thing behind the counter. Invoices and quotations, stock that goes down when you sell
        and up when you buy, what customers owe you, what you spend, what your staff are paid, and
        who is allowed to see which of those.
      </p>
      <p>
        The reason this is harder than it sounds is that a business system is mostly about what must
        <em> not</em> happen. Money must not drift, so every amount is whole cents and never a
        decimal fraction. History must not rewrite itself, so an invoice remembers the price on the
        day it was written even after you change it. And a hidden page is not a locked one, so
        permission is checked on the server for every single request, not just reflected in what the
        menu shows.
      </p>

      <Figure
        title="Figure 11"
        caption="Every document a business writes does one of four things, and the difference between them is the whole design. Getting the quotation case wrong is how stock counts start lying to you."
      >
        <SystemShape />
      </Figure>

      <p className="callout">
        <a href="/build/system/">
          Everything the system does, explained &mdash; and what it deliberately doesn&rsquo;t do
          &rarr;
        </a>
      </p>

      <h3>What I would need from you</h3>
      <p>
        How you actually work today &mdash; not how you think you should. The books you keep, the
        arguments you have about numbers, the thing somebody always forgets. A system that fits the
        real routine gets used; one that fits an idealised routine gets abandoned in a month.
      </p>

      <h3>What it deliberately isn&rsquo;t</h3>
      <p>
        It is not accounting software and will not file your taxes. It is not a phone app. It does
        not run several companies from one login. It is a working tool for one business, built
        around how that business actually trades.
      </p>

      <h2>How it goes</h2>
      <p>
        We talk first, and that conversation is most of the scoping &mdash; what you sell, how you
        work, what is actually going wrong. I come back with what I think it should be and what it
        would take. Then I build it, put it online, and sit with you while you use it for real,
        because the first week always finds things no plan does.
      </p>
      <p>
        After that I keep it running. Fixes, changes, the new product line, the thing you thought of
        in month four. I still ship changes to work I delivered, which is the part most people
        discover too late is the part that mattered.
      </p>

      <h2>Something you can check</h2>
      <p>
        SOMSTAR Kitchen Equipment in Mogadishu has both. The catalogue is public &mdash; open{' '}
        <a href="https://somstarkitchen.com" target="_blank" rel="noopener noreferrer">
          somstarkitchen.com
        </a>{' '}
        on your phone and judge it the way your own customers would. The system behind it is
        described in detail, without the client&rsquo;s figures, in the{' '}
        <a href="/work/somstar-system/">business system write-up</a>, and the catalogue build is
        pulled apart in the{' '}
        <a href="/work/somstar-catalogue/">catalogue write-up</a>.
      </p>

      <h2>Start a conversation</h2>
      <p>
        I don&rsquo;t publish prices, because the honest answer to what something costs depends on
        what it turns out to be, and I would rather tell you it is more than you want to spend than
        take the job and cut corners. Tell me what you are dealing with and I will tell you what I
        think it needs.
      </p>
      <ContactForm />
    </article>
  );
}

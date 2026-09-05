import Figure from '@/components/Figure';
import ImagePipeline from '@/components/figures/ImagePipeline';
import UrlTree from '@/components/figures/UrlTree';
import PayloadLadder from '@/components/figures/PayloadLadder';

export const metadata = {
  title: 'The trilingual catalogue — Abdirahman Hassan Abdi',
  description:
    'Sixty-three products in English, Somali and Arabic: 219 statically exported pages with a build-time image pipeline.',
};

const FACTS = [
  ['63', 'products across six categories'],
  ['219', 'URLs in the sitemap'],
  ['3', 'languages, each with real pages'],
];

export default function Page() {
  return (
    <article className="wrap study">
      <p className="kicker">Client work · SOMSTAR Kitchen Equipment · 2026</p>
      <h1>The trilingual catalogue</h1>
      <p className="lede">
        SOMSTAR sells commercial kitchen equipment across Somalia. They needed a catalogue their
        customers could actually read &mdash; which meant Somali and Arabic as real languages, not a
        widget that swaps text after the page loads. It is live at{' '}
        <a href="https://somstarkitchen.com" target="_blank" rel="noopener noreferrer">
          somstarkitchen.com
        </a>
        .
      </p>

      <dl className="facts">
        {FACTS.map(([n, label]) => (
          <div key={label}>
            <dt>{n}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>

      <h2>Sixty-three photographs, no two alike</h2>
      <p>
        Supplier photographs arrive at wildly different shapes and with different amounts of
        whitespace baked in &mdash; a portrait grinder, a 2:1 oven, a kettle floating in the middle
        of an empty frame. Drop those into a grid untouched and one product fills its card while the
        next sits marooned in white space.
      </p>
      <p>
        So the build does it instead. Every file in <code>images/</code> is matched to a product by
        name, trimmed back to the product itself, then scaled into a fixed frame and centred on a
        4:3 canvas. A filename that matches nothing is reported by name and the build carries on, so
        a typo is visible rather than silent.
      </p>
      <Figure
        title="Figure 1"
        caption="Three photographs as supplied and as served. Trimming alone is not enough — the product inside the frame has to be re-scaled too, or the grid stays uneven."
      >
        <ImagePipeline />
      </Figure>

      <h2>Three languages, one URL shape</h2>
      <p>
        English keeps <code>/</code>. Somali gets <code>/so/</code>, Arabic <code>/ar/</code>. No
        existing URL moved, so the search positions the site already held kept working.
      </p>
      <p>
        Slugs stay English. A Somali page lives at{' '}
        <code>/so/products/cooking-equipment/gas-griddle/</code>, not a transliterated path &mdash;
        so all three languages share one URL shape, a product&rsquo;s three pages are obviously the
        same product, and no address depends on a translation being right.
      </p>
      <p>
        There is no automatic redirect by browser language. Auto-redirecting breaks shared links,
        confuses crawlers, and guesses wrong for the many phones in Somalia set to English. The
        switcher is explicit, and the URL is the only thing that carries the language.
      </p>
      <Figure
        title="Figure 2"
        caption="Every language prefix leads to the same English slug, which is what makes one product's three pages recognisable as one product. 63 products across six categories in three languages — 219 URLs, each declaring its own canonical address."
      >
        <UrlTree />
      </Figure>

      <h2>What the phone actually downloads</h2>
      <p>
        Each photograph ships at 400, 800 and 1200px in both WebP and JPEG, chosen by{' '}
        <code>srcset</code> and <code>sizes</code>. A phone pulls about 6KB where the full file is
        53KB &mdash; on the connections this site is actually opened on, that is the difference
        between a catalogue and a blank screen.
      </p>
      <p>
        Each URL carries a short fingerprint of the source file. Untouched photographs stay cached
        for a year as immutable; a replaced photograph becomes a different URL that no cache has
        ever seen, so it appears immediately without anyone clearing anything.
      </p>
      <Figure
        title="Figure 3"
        caption="Six variants exist; srcset and sizes decide which single one a device transfers. The fingerprint on each URL is what makes a year-long cache and an instant update compatible."
      >
        <PayloadLadder />
      </Figure>

      <h2>What I would change</h2>
      <p>
        The Somali equipment vocabulary is my best effort and it should not be. Those terms belong
        to the people who use them daily, and the right process would have been to draft the
        structure and have the wording corrected before launch rather than after. Every string lives
        in a data file precisely so that correction is an edit rather than a rebuild &mdash; but
        building the escape hatch is not the same as not needing it.
      </p>

      <p className="study-out">
        See it running:{' '}
        <a className="link-block" href="https://somstarkitchen.com" target="_blank" rel="noopener noreferrer">
          somstarkitchen.com
        </a>
      </p>
    </article>
  );
}

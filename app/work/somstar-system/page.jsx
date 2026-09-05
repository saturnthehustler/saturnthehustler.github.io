import Figure from '@/components/Figure';
import WeightedCost from '@/components/figures/WeightedCost';
import DocumentFlow from '@/components/figures/DocumentFlow';
import ShareSplit from '@/components/figures/ShareSplit';
import YearClose from '@/components/figures/YearClose';
import RoleMatrix from '@/components/figures/RoleMatrix';

export const metadata = {
  title: 'The business system — Abdirahman Hassan Abdi',
  description:
    'Invoicing, stock, debts and shareholder accounting on Cloudflare Workers and D1, with around 590 automated checks.',
};

const FACTS = [
  ['590', 'automated checks'],
  ['0', 'floating point numbers in the money paths'],
  ['3', 'roles, re-checked on every save'],
];

export default function Page() {
  return (
    <article className="wrap study">
      <p className="kicker">Client work · SOMSTAR Kitchen Equipment · 2026</p>
      <h1>The business system</h1>
      <p className="lede">
        Everything behind the counter: invoicing, quotations, stock, debts, expenses, payroll and
        the partnership accounting that decides who is owed what at the end of the year. It runs at
        inventory.somstarkitchen.com, behind a login, on Cloudflare&rsquo;s free tier.
      </p>

      <dl className="facts">
        {FACTS.map(([n, label]) => (
          <div key={label}>
            <dt>{n}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>

      <p className="note">
        The screenshots you would normally expect here are missing on purpose. The system holds a
        client&rsquo;s real trading figures, so every diagram below uses invented numbers and shows
        mechanism rather than data.
      </p>

      <h2>Money that cannot drift</h2>
      <p>
        Every amount is stored as a whole number of cents. There is no floating point anywhere in
        the money paths, because a tenth of a cent lost per line becomes a balance nobody can
        explain three months later.
      </p>
      <p>
        Purchases blend into a weighted average rather than replacing the last price. Buy two ovens
        at $1,400 and later three at $1,600, and all five are held at $1,520 &mdash; so the profit on
        the next sale is honest regardless of which physical oven leaves the shop.
      </p>
      <Figure
        title="Figure 4"
        caption="Two purchases resolving into one held cost. The figures are illustrative; the arithmetic is exact because it never leaves whole cents."
      >
        <WeightedCost />
      </Figure>

      <h2>A document either moves stock or it doesn&rsquo;t</h2>
      <p>
        A quotation is a promise, not a sale, so it never touches stock. It becomes an invoice only
        when someone presses &ldquo;turn into invoice&rdquo;, and that is the moment stock comes
        down.
      </p>
      <p>
        Each invoice line freezes that day&rsquo;s product name, code, model and cost. Rename a
        product next year and last year&rsquo;s invoice still says what it said &mdash; history
        cannot be rewritten by an edit made later. Every stock movement writes an audit row
        recording what changed, the balance that resulted, why, on which document, and by whom.
      </p>
      <Figure
        title="Figure 5"
        caption="One product line, two possible fates. Only the invoice path moves stock, and it always leaves a trail."
      >
        <DocumentFlow />
      </Figure>

      <h2>Closing a year is a one-way door</h2>
      <p>
        Closing a financial year works out what each shareholder is owed, writes it to their
        capital, and freezes it. The example below divides the year&rsquo;s result equally between
        three shareholders; the real arrangement is configurable, and the commercial terms any
        particular business runs on are theirs rather than mine to publish.
      </p>
      <Figure
        title="Figure 6"
        caption="An equal three-way split, shown as an example — the numbers and the arrangement are invented, not any client's. What the system guarantees is that the settlement lands in capital and stops being editable."
      >
        <ShareSplit />
      </Figure>

      <p>
        The harder half is what happens afterwards. Once the year is closed, nothing later can
        quietly change it: a back-dated expense cannot reach into a closed year and move a balance
        somebody has already been paid on.
      </p>
      <p>
        Reopening is deliberately not a permission. It is allowed only while two conditions still
        hold: no later year has been closed, and the money the close moved into people&rsquo;s
        capital is still there &mdash; checked by amount rather than by date, because withdrawals can
        be back-dated. When either fails, the year stays shut and the correction has to be made
        forward, where it is visible.
      </p>
      <Figure
        title="Figure 7"
        caption="Closing is one-way, and reopening is a gate rather than a right. Making the second condition an amount check rather than a date check is what stops a back-dated withdrawal from unlocking a settled year."
      >
        <YearClose />
      </Figure>

      <h2>Three roles, checked twice</h2>
      <p>
        Staff sell. Managers also see cost prices and purchases. Owners also see salaries,
        shareholders and settings. Hiding a page is presentation, not security, so the server
        re-checks permission on every request and every save &mdash; the hidden pages refuse a
        direct request just as firmly as the navigation refuses to show them.
      </p>
      <p>
        Around that sit the ordinary defences: six wrong passwords lock an account for fifteen
        minutes, the error never reveals whether an account exists, sessions are HttpOnly, Secure
        and SameSite, and forms refuse cross-site posts twice over.
      </p>
      <Figure
        title="Figure 8"
        caption="What each role can reach. The same matrix is enforced on the server, not merely reflected in the navigation."
      >
        <RoleMatrix />
      </Figure>

      <h2>What I would change</h2>
      <p>
        There is no build step, no framework and no client-side library, which makes the system
        almost impossible to break by accident and very easy to redeploy &mdash; but it also means
        the pages are assembled as strings, and the larger ones have grown past the size where that
        stays comfortable to read. The next serious change should split the biggest page modules
        before adding to them, not after.
      </p>
    </article>
  );
}

// Verified against the SOMSTAR business system's own source and routes rather
// than recalled, because these are public claims about what a client receives.
// Checked 2026-09-06. Nothing here describes any client's commercial terms.

export const SYSTEM_INCLUDED = [
  {
    group: 'The daily work',
    lead:
      'The things somebody touches every day. If these are slow or fiddly, the system quietly stops being used and the notebook comes back out.',
    items: [
      {
        name: 'Sales and invoices',
        what:
          'Numbered invoices raised from a product list, with stock coming down as you save. Every line freezes that day’s product name, code, model and cost, so an invoice from last year still says what it said even after prices change.',
      },
      {
        name: 'Quotations that become invoices',
        what:
          'A quote is a promise, not a sale, so it touches no stock. When the customer agrees, one action turns it into an invoice — and that is the moment stock actually moves. Getting this boundary wrong is the usual reason stock counts drift.',
      },
      {
        name: 'Products, edited in bulk when needed',
        what:
          'The catalogue of what you sell, with codes, models and cost prices. Bulk editing exists because the alternative — changing forty prices one at a time — is how price updates get postponed indefinitely.',
      },
      {
        name: 'Customers',
        what:
          'Who you sell to, what they have bought and what they still owe, in one place rather than reconstructed from a pile of invoices when somebody asks.',
      },
      {
        name: 'Purchases that blend cost',
        what:
          'Buying stock raises the count and recalculates what it is held at, blending old and new prices rather than overwriting. It means the profit on the next sale is honest regardless of which physical unit leaves the shop.',
      },
      {
        name: 'Import orders, stage by stage',
        what:
          'Buying a container is not one event. This tracks an import through its stages so that at any moment the system can say where the order actually is — which is the question that otherwise gets answered by ringing somebody.',
      },
      {
        name: 'Returns',
        what:
          'Goods coming back, with stock going up again and the original document adjusted rather than quietly edited, so the history of what happened stays readable.',
      },
      {
        name: 'A dashboard worth opening',
        what:
          'What happened today and what needs attention, so the first screen of the morning answers a question instead of presenting a menu.',
      },
    ],
  },
  {
    group: 'Knowing where the money is',
    lead:
      'Most small businesses can tell you what they sold. Far fewer can tell you what they are owed, what they hold, and whether the month was actually profitable.',
    items: [
      {
        name: 'One number for what you are owed',
        what:
          'Personal debts and unpaid invoices shown together, because they are the same question. Anyone signed in can record a repayment; only a manager can open a new debt.',
      },
      {
        name: 'Expenses',
        what:
          'What the business spends, categorised, feeding straight into the profit calculation rather than being reconciled separately at the end of a period.',
      },
      {
        name: 'Staff salary',
        what:
          'What people are paid, recorded where it counts against profit, and visible only to an owner.',
      },
      {
        name: 'Money accounts',
        what:
          'What the business holds and where — cash, bank, mobile money. Every payment names the account it moved through, but only an owner sees the balances.',
      },
      {
        name: 'Profit worked through properly',
        what:
          'Revenue, then cost of goods, then gross profit, then expenses and salary subtracted to reach net. Not a revenue figure presented as if it were earnings — the distinction that decides whether a good month was actually a good month.',
      },
      {
        name: 'Best sellers and daily takings',
        what:
          'What actually moves and what came in each day, so buying decisions rest on the record rather than on impressions of what feels popular.',
      },
      {
        name: 'Everything the business holds, on one page',
        what:
          'Stock at cost, money in accounts, what you are owed and what you owe, together. It answers a different question from profit: not “did we do well” but “what is actually here”.',
      },
      {
        name: 'Part-ownership accounting',
        what:
          'Where a business has more than one owner, capital and profit are tracked separately for each person, and money someone takes for themselves is never recorded as a business expense. The arrangement itself is configurable and belongs to the business, not to me.',
      },
    ],
  },
  {
    group: 'The parts that must not go wrong',
    lead:
      'A business system is mostly defined by what it refuses to let happen. These are the guarantees, and they are the reason the numbers can be trusted a year later.',
    items: [
      {
        name: 'Money as whole cents, never decimals',
        what:
          'Every amount is a whole number of cents throughout. Floating-point arithmetic loses fractions in ways that accumulate, and a balance that is wrong by a few cents is a balance nobody can reconcile or explain.',
      },
      {
        name: 'Nothing may half-happen',
        what:
          'Saving a sale validates everything first, then writes the invoice lines, the stock movements and the audit records together as one operation. There is no state where stock moved but the invoice did not, which is the failure that quietly corrupts a stock count.',
      },
      {
        name: 'History that cannot be rewritten',
        what:
          'Documents keep the values they were written with. Renaming a product or changing its price next year does not reach backwards and alter what a customer was already invoiced.',
      },
      {
        name: 'A closed year stays closed',
        what:
          'Once a financial year is settled, later entries cannot reach back into it. Reopening is gated on conditions rather than granted as a permission, so a back-dated entry cannot quietly unlock a period somebody has already been paid on.',
      },
      {
        name: 'Every movement recorded',
        what:
          'Each stock change writes what changed, the balance that resulted, why, on which document, and by whom. When a count is wrong, the question becomes answerable instead of a matter of memory.',
      },
      {
        name: 'Deletion that can be undone',
        what:
          'Removing something puts it somewhere recoverable and logs who did it, rather than destroying it. The alternative is a system nobody dares use properly, or one where a mistake is permanent.',
      },
      {
        name: 'A log of who did what',
        what:
          'Actions attributed to people with times attached. Not for surveillance — for the conversation that starts “this number changed and nobody knows why”.',
      },
    ],
  },
  {
    group: 'Who can see what',
    lead:
      'Cost prices, salaries and balances are not for everyone, and hiding a page is not the same as locking it.',
    items: [
      {
        name: 'Three roles, not one password shared around',
        what:
          'Staff sell. Managers also see cost prices, purchases and expenses. Owners also see salaries, ownership and settings. Everyone has their own login, so the audit log means something.',
      },
      {
        name: 'Enforced on the server, not in the menu',
        what:
          'Permission is re-checked on every request and every save. A hidden page refuses a direct request just as firmly as the navigation refuses to show it — hiding a link is presentation, not security.',
      },
      {
        name: 'Profit invisible to staff',
        what:
          'Cost prices and margins are withheld from staff accounts at the route level rather than merely left off the screen, so the number cannot be reached by trying.',
      },
      {
        name: 'Accounts that lock under attack',
        what:
          'Six wrong passwords lock an account for fifteen minutes, and the error never reveals whether an account exists — so a stolen list of names cannot be tested against it.',
      },
      {
        name: 'Sessions that resist hijacking',
        what:
          'Login cookies are inaccessible to scripts, sent only over a secure connection, and forms refuse submissions originating from another site — checked twice, by two independent means.',
      },
    ],
  },
  {
    group: 'Living with it',
    lead:
      'What the system is like to own once the novelty has worn off and I am not standing next to you.',
    items: [
      {
        name: 'Sets itself up the first time',
        what:
          'The first visit walks through company details and the first owner account. Tables are created automatically; there are no migration commands to run, ever, including after a disaster.',
      },
      {
        name: 'Documents that print properly',
        what:
          'Invoices, quotations and returns print as documents a customer can accept, carrying your own logo, signature and stamp rather than a screenshot of a web page.',
      },
      {
        name: 'Backups you can actually restore',
        what:
          'A single command exports the whole database to a file you keep. Restoring is importing it. If everything were lost, redeploying and reopening the site brings back first-time setup, and nothing needs hand-written SQL to recover.',
      },
      {
        name: 'Around 590 automated checks',
        what:
          'The money paths, the stock arithmetic and the permission rules are tested against a real database on every change, including real-browser tests. It is why a change to one part does not quietly break another.',
      },
      {
        name: 'Runs on a free tier',
        what:
          'The whole system runs inside a free hosting allowance at this size, with no server to patch and no monthly bill that grows as you do.',
      },
      {
        name: 'No framework to go stale',
        what:
          'No build step, no front-end framework, no client-side libraries — plain files. Nothing to upgrade every six months, and nothing that stops working because a dependency was abandoned.',
      },
    ],
  },
];

export const SYSTEM_NOT_INCLUDED = [
  {
    name: 'Several companies in one login',
    what: 'Running more than one business from a single installation.',
    when:
      'When you genuinely operate separate legal entities and want them side by side. Two installations is usually cleaner, and cheaper, than one system trying to keep them apart.',
  },
  {
    name: 'More than one currency',
    what: 'Trading, holding and reporting in multiple currencies.',
    when:
      'When you buy in one currency and sell in another and the rate moves enough to matter. It brings exchange-rate history and revaluation, which is real work rather than a setting.',
  },
  {
    name: 'Tax and VAT handling',
    what: 'Calculating, tracking and filing sales tax.',
    when:
      'When you operate somewhere that levies it. It has to match the rules of the specific jurisdiction, so it is built to a place rather than in general.',
  },
  {
    name: 'Export to accounting software',
    what: 'Feeding figures into QuickBooks, Xero or an accountant’s package.',
    when:
      'When an external accountant needs the data in their own format. Worth building once you know which package, since the format is theirs, not yours.',
  },
  {
    name: 'Barcode scanning',
    what: 'Scanning products at the counter or during a stock count.',
    when:
      'When you have enough items moving fast enough that typing a code is the bottleneck. Below that, the scanner is a device to keep charged for no gain.',
  },
  {
    name: 'Several warehouses',
    what: 'Stock counted separately per location, with transfers between them.',
    when:
      'When you hold stock in more than one place and need to know which. It changes every stock figure in the system from one number into several.',
  },
  {
    name: 'Serial or batch tracking',
    what: 'Following individual units by serial number, or batches by expiry.',
    when:
      'When you handle warranties per unit, or perishable goods. Essential in some trades and pure overhead in others.',
  },
  {
    name: 'Automatic reordering',
    what: 'The system deciding what to buy and when, from sales history.',
    when:
      'When purchasing is routine enough to be a rule. Where buying depends on shipping windows and what a supplier actually has, a suggestion is often noise.',
  },
  {
    name: 'A customer or supplier portal',
    what: 'Outsiders logging in to see their own orders, invoices or statements.',
    when:
      'When customers ask for statements often enough that sending them is a job. It opens the system to the outside, which is a different security posture.',
  },
  {
    name: 'Payroll tax and statutory deductions',
    what: 'Full payroll rather than recording what was paid.',
    when:
      'When you have enough staff that payroll is its own process. Like tax, it is written to a jurisdiction rather than in general.',
  },
  {
    name: 'A phone app',
    what: 'A native application installed from an app store.',
    when:
      'When staff work away from a counter and need it offline. The system works in a phone browser today; an app is a second thing to build, sign and keep published.',
  },
  {
    name: 'Working offline',
    what: 'Carrying on through an internet outage and syncing afterwards.',
    when:
      'When your connection genuinely drops during trading hours. It is the single most expensive item on this page, because two copies of the truth must be reconciled.',
  },
  {
    name: 'Approval workflows',
    what: 'Purchases or discounts requiring somebody else to sign off first.',
    when:
      'When enough people spend money that authority needs to be explicit. In a small team the roles already cover it.',
  },
  {
    name: 'Automatic reminders to customers',
    what: 'The system chasing unpaid invoices by message or email.',
    when:
      'When you carry enough credit that chasing is a routine task. It needs a sending service and a tone you are comfortable putting your name to automatically.',
  },
];

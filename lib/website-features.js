// Every entry here is verified against the live somstarkitchen.com build
// rather than recalled, because these are public claims about what a client
// would receive. Checked 2026-09-06.

export const INCLUDED = [
  {
    group: 'Being found at all',
    lead:
      'Most of a catalogue’s value is decided before anyone reaches it. These are the parts that make a search engine able to understand what you sell, and able to send the right person to the right page.',
    items: [
      {
        name: 'A real page for every product',
        what:
          'Not one long list, but a separate address per product, each with its own title, description and photograph. That is what lets a search for one specific machine land on the page about that machine, rather than on a homepage the visitor then has to work through.',
      },
      {
        name: 'Search across the catalogue',
        what:
          'A search box that filters the whole product range as you type, running entirely in the browser with no server to call. Useful once a catalogue passes about thirty products, which is the point at which browsing by category stops being faster than asking.',
      },
      {
        name: 'Categories that count themselves',
        what:
          'Products are grouped, and each group knows how many things are in it. Add a product to the data and the category count, the navigation and the totals on the homepage all update — nothing is typed in two places, so nothing drifts out of date.',
      },
      {
        name: 'Breadcrumbs, marked up for search engines',
        what:
          'Every deep page shows the path back to where it sits, and publishes that path in the format Google reads. It is why a result can appear as “Cooking Equipment › Gas Griddle” rather than as a bare URL.',
      },
      {
        name: 'A sitemap and a robots file',
        what:
          'A machine-readable index of every page on the site, regenerated on each build, plus the file that tells crawlers what they may read. Without them a new page waits to be stumbled upon; with them it is offered up deliberately.',
      },
      {
        name: 'Structured data about the business',
        what:
          'The address, coordinates, phone number and opening hours are published in the format search engines parse, so they can appear directly in results and in maps rather than only inside the page text.',
      },
      {
        name: 'Canonical addresses on every page',
        what:
          'Each page states its own official address. It stops the same content counted twice under different URLs, which is one of the quietest ways a site competes against itself in search results.',
      },
    ],
  },
  {
    group: 'Being read by the people you sell to',
    lead:
      'A catalogue that is technically findable and practically unreadable has solved nothing. This is the part that decides whether the person who arrives stays.',
    items: [
      {
        name: 'Whole languages, not a translate widget',
        what:
          'Each language gets its own addresses and its own pages, so a Somali page can be shared, bookmarked and found in search on its own terms. A widget that swaps text after loading is invisible to search engines and disappears the moment someone shares the link.',
      },
      {
        name: 'A language switcher that keeps your place',
        what:
          'Switching language on a product page takes you to that same product in the new language, not back to the homepage. The three versions of a product share one address shape precisely so this can work.',
      },
      {
        name: 'Light and dark, following the phone',
        what:
          'The site matches whatever the visitor’s phone is set to, with a control to override it. On a phone in a bright kitchen or a dim storeroom, this is the difference between readable and not.',
      },
      {
        name: 'Type chosen and hosted by you',
        what:
          'The heading typeface is downloaded at build time and served from your own domain, so nothing is requested from a third party while the page is trying to appear. It also means the site keeps working if that third party does not.',
      },
      {
        name: 'Readable for people who need it to be',
        what:
          'Text contrast tested against the accessibility standard, a skip link for keyboard users, touch targets big enough for a thumb, a high-contrast mode, and an alternative for anyone who has asked their device to reduce motion.',
      },
      {
        name: 'A print stylesheet',
        what:
          'A product page printed or saved to PDF comes out as a usable specification sheet rather than a screenshot of a website. Buyers who compare machines on paper, or who need to hand something to a manager, get something worth carrying.',
      },
      {
        name: 'Frequently asked questions, marked up',
        what:
          'Common questions answered on the site and published in the format that lets them appear directly in search results, so a question answered once can bring people in repeatedly.',
      },
    ],
  },
  {
    group: 'Photographs, handled for you',
    lead:
      'Product photography is where catalogue sites usually fall apart, because the work is repetitive and nobody keeps doing it by hand.',
    items: [
      {
        name: 'Drop a photo in, named after the product',
        what:
          'That is the entire process. No cropping, no resizing, no editing software, and no touching the catalogue data. If a filename matches nothing, the build says so by name rather than failing silently.',
      },
      {
        name: 'Every photo trimmed and re-framed',
        what:
          'The build cuts away whatever whitespace the supplier baked into the shot, then scales the product into a fixed frame so it sits at a consistent size. This is what stops one card looking full while the next looks empty.',
      },
      {
        name: 'Six versions of each photograph',
        what:
          'Three sizes in two modern formats, with the browser picking the smallest one that still looks sharp on that particular screen. A phone downloads a fraction of what a desktop does without anyone choosing.',
      },
      {
        name: 'Replaced photos appear immediately',
        what:
          'Each image address carries a fingerprint of the file. Photos nobody has touched stay cached for a year; a replaced photo becomes a new address no cache has seen, so it updates instantly with nobody clearing anything.',
      },
    ],
  },
  {
    group: 'Turning a reader into an enquiry',
    lead:
      'The point of the catalogue is the message that follows it, so the path from reading to asking is kept as short as the medium allows.',
    items: [
      {
        name: 'Enquiries through WhatsApp, pre-written',
        what:
          'The form composes the message — what they were looking at, what they need — and opens WhatsApp with it ready to send. It arrives where you already read messages, from a number you can reply to, with no inbox to remember to check.',
      },
      {
        name: 'A WhatsApp button that follows the page',
        what:
          'Always reachable while scrolling, so the decision to ask never depends on someone finding their way back to a contact page.',
      },
      {
        name: 'Opening hours, published properly',
        what:
          'Stated on the site and marked up so search engines can show whether you are open right now, which is often what decides between calling you and calling someone else.',
      },
      {
        name: 'A map of where you are',
        what:
          'An embedded map on the contact page for customers who intend to come in person, alongside coordinates published in a form that mapping apps can read directly.',
      },
      {
        name: 'Copy-to-clipboard on the details that matter',
        what:
          'Phone number and email copy with one tap instead of being selected by hand on a phone, which is a small thing that removes a real, common irritation.',
      },
    ],
  },
  {
    group: 'Being shared, and being fast',
    lead:
      'Links get pasted into WhatsApp groups far more than they get typed. What happens then is worth designing.',
    items: [
      {
        name: 'A proper link preview',
        what:
          'Pasted into WhatsApp, Facebook or a message, the link expands into a card with an image and a description instead of a bare address. It is the difference between a link that gets opened and one that gets ignored.',
      },
      {
        name: 'Installable to a phone home screen',
        what:
          'The site declares a name and icon so a regular customer can add it to their home screen and open it like an app, without you building or maintaining an app.',
      },
      {
        name: 'Flat files, served from everywhere',
        what:
          'The whole site is built into plain files ahead of time and served from a network with locations worldwide. There is no server doing work while somebody waits, which is why it stays fast on a slow connection.',
      },
      {
        name: 'Hosting that costs nothing to run',
        what:
          'The catalogue runs inside a free tier and stays there at this size. There is no monthly hosting bill to forget, and no invoice that quietly grows as traffic does.',
      },
      {
        name: 'A description written for AI assistants',
        what:
          'A plain-text summary of the site at a known address, which is increasingly how assistants answer questions about a business. Cheap to include now, awkward to retrofit later.',
      },
    ],
  },
  {
    group: 'Keeping it alive after launch',
    lead:
      'The launch is the easy day. These are the parts that decide what the site is like to own in year two.',
    items: [
      {
        name: 'Publishing by saving a change',
        what:
          'A change is published by committing it. The site rebuilds and deploys itself, running its own checks first and refusing to publish if any of them fail — so a mistake stops before it reaches customers rather than after.',
      },
      {
        name: 'One-command rollback',
        what:
          'If a change turns out wrong, the previous version can be put back immediately, without a rebuild and without finding out what broke first. Fix it afterwards, calmly.',
      },
      {
        name: 'Content in plain data files',
        what:
          'Products, categories, contact details and the story text live in readable files, separate from the code that renders them. Changing a phone number or adding a product does not mean touching the site’s logic.',
      },
      {
        name: 'A written handbook, not tribal knowledge',
        what:
          'Documentation covering the actual tasks — add a product, replace a photo, change the phone number, undo a bad deploy — written for whoever ends up doing it, including someone who is not me.',
      },
      {
        name: 'A custom page for wrong addresses',
        what:
          'A mistyped or long-dead link lands on a page that helps rather than a browser error, and old addresses are redirected so links shared years ago keep working.',
      },
    ],
  },
];

export const NOT_INCLUDED = [
  {
    name: 'Card payments and a checkout',
    what: 'Customers paying on the site rather than agreeing a price with you first.',
    when:
      'When you sell fixed-price items nobody negotiates and you would rather not be in the conversation at all. For considered, high-value equipment it usually removes the conversation that wins the sale.',
  },
  {
    name: 'Customer accounts',
    what: 'Logins, saved details, order history.',
    when:
      'When the same customers buy repeatedly and want their own record. For most equipment suppliers it adds a password nobody remembers to a site they visit twice a year.',
  },
  {
    name: 'Live stock levels',
    what: 'Showing customers what is physically in the warehouse right now.',
    when:
      'When stock genuinely runs out and a wasted journey costs you a customer. It requires the catalogue and the stock system to be joined together, which is a real piece of work rather than a setting.',
  },
  {
    name: 'A quote basket',
    what: 'Collecting several products, then sending them as one enquiry.',
    when:
      'When customers routinely fit out a whole kitchen rather than replacing one machine. For single-item enquiries it adds a step between wanting something and asking about it.',
  },
  {
    name: 'Product filtering',
    what: 'Narrowing by power, capacity, dimensions, fuel type and so on.',
    when:
      'When products have specifications buyers genuinely compare on, and there are enough of them that scrolling stops working. It needs that specification data to exist and be consistent first.',
  },
  {
    name: 'Reviews and ratings',
    what: 'Customers publishing their opinion on your product pages.',
    when:
      'When you have enough happy customers to ask, and the appetite to moderate what arrives. Empty review sections are worse than none, and so is one bad review with no others around it.',
  },
  {
    name: 'A blog or news section',
    what: 'Articles, guides, announcements — regularly published pages.',
    when:
      'When somebody will actually write them. It is genuinely effective for search, and it is also the feature most often built and then abandoned after three posts.',
  },
  {
    name: 'A newsletter',
    what: 'Collecting email addresses and sending to them.',
    when:
      'When you have something worth sending regularly. It brings a mailing service, a subscription list to look after and data-protection obligations that did not exist before.',
  },
  {
    name: 'An admin panel for editing',
    what: 'Editing the site through a web interface instead of data files.',
    when:
      'When several non-technical people need to change content often and independently. For one owner making occasional changes, it is a second system to maintain in exchange for convenience.',
  },
  {
    name: 'Booking or appointments',
    what: 'Customers reserving a slot for a visit, a demonstration or a service call.',
    when:
      'When your calendar is the thing being sold. It needs somewhere to store bookings, which means the site stops being flat files.',
  },
  {
    name: 'Downloadable catalogue or spec sheets',
    what: 'A PDF of the range, or per-product specification documents.',
    when:
      'When buyers circulate documents internally for approval. The print stylesheet already covers much of this; a maintained PDF is a second copy of the truth that has to be kept in step.',
  },
  {
    name: 'Multi-currency pricing',
    what: 'Showing prices, converted, per visitor.',
    when:
      'When you publish prices at all and sell across borders. The catalogue currently quotes on enquiry, which is usually the right choice for negotiated equipment.',
  },
  {
    name: 'Delivery tracking',
    what: 'Customers following an order from your warehouse to their door.',
    when:
      'When you run your own logistics and customers ask where things are often enough to cost you time. It belongs with the business system rather than the catalogue.',
  },
  {
    name: 'Video',
    what: 'Product demonstrations or walkthroughs on product pages.',
    when:
      'When a machine is easier to understand moving than still. Worth doing properly or not at all — badly shot video reads as less professional than a good photograph.',
  },
];

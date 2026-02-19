/* ─────────────────────────────────────────────────────────────────────────────
   Xero App Store Reviews — 22 verified reviews, all 5-star
   Source: https://apps.xero.com/uk/app/hedgeflows/reviews
   ─────────────────────────────────────────────────────────────────────────── */

export interface XeroReview {
  name: string;
  role?: string;
  company?: string;
  date: string;
  title: string;
  quote: string;
  /** Which pages this review is most relevant for */
  tags: string[];
}

export const xeroStats = {
  rating: 5.0,
  totalReviews: 22,
  fiveStarPercent: 100,
  url: 'https://apps.xero.com/uk/app/hedgeflows/reviews',
};

export const xeroReviews: XeroReview[] = [
  {
    name: 'Nick Curran',
    date: 'Feb 2026',
    title: 'Makes FX risk and multi-currency payments easy to manage with great support',
    quote: 'HedgeFlows has made managing multi-currency payments and FX risk much easier day to day. The personalised support around setting up hedging has been really helpful, and it\'s given us much better visibility over FX exposure and cash flow.',
    tags: ['homepage', 'platform', 'professional-services'],
  },
  {
    name: 'Granite Accounts',
    date: 'Apr 2025',
    title: 'Very quick and easy setup with good support',
    quote: 'The team at Hedgeflows have made our setup very quick and easy and the app does exactly what we need it to do — send and receive foreign currency. The app is really intuitive and easy to use.',
    tags: ['homepage'],
  },
  {
    name: 'Michal Jahns',
    date: 'Nov 2024',
    title: 'Great workflow and excellent support',
    quote: 'We\'ve switched to HedgeFlows from Wise for international payment runs, and we haven\'t looked back. The tool has good workflow mechanisms and the Xero integration works flawlessly, taking care of reconciliations and saving time.',
    tags: ['homepage', 'platform', 'e-commerce'],
  },
  {
    name: 'Jason Burt',
    date: 'May 2024',
    title: 'Brilliant Solution and Fantastic Support',
    quote: 'HF provides a great solution to FX payments around the world and creates time and cost efficiencies throughout the end-to-end payment and reconciliation process. Their support team is extremely responsive.',
    tags: ['homepage', 'platform'],
  },
  {
    name: 'Ghaidaa Ibrahim',
    date: 'Mar 2024',
    title: 'Brilliant Support',
    quote: 'Hedgeflow made my life easier; it has considerably improved how we manage payments, saving us a lot of time and work. They really stand out for the excellent service they offer and their prompt response times.',
    tags: ['homepage'],
  },
  {
    name: 'Mohammad Omoush',
    role: 'Finance Director',
    company: 'VogaCloset',
    date: 'Mar 2024',
    title: 'Real Game Changer!',
    quote: 'HedgeFlows is a real game changer for us. It\'s saved us loads of time and effort, completely revolutionizing how we handle payments. Its user-friendly interface is loaded with features, making it easy to navigate and highly flexible.',
    tags: ['homepage', 'e-commerce'],
  },
  {
    name: 'Accounts Team',
    company: 'TransferRoom',
    date: 'Dec 2023',
    title: 'Great FX Option with brilliant support',
    quote: 'We have been using Hedgeflows for almost 10 months now. Brilliant FX service with the sync with Xero works very well. The team are also very quick to provide support which is really appreciated especially around month end.',
    tags: ['staffing'],
  },
  {
    name: 'Chris Standeven',
    role: 'Managing Director',
    company: 'FirstPoint Logistics',
    date: 'Aug 2023',
    title: 'Game Changer!',
    quote: 'After starting to use Hedgeflows recently we have not only saved a huge amount of time and effort but also created a super slick process that has literally changed the way we do international payment runs forever!',
    tags: ['homepage', 'logistics'],
  },
  {
    name: 'Sophie Dale',
    date: 'Jul 2023',
    title: 'Great FX Solution',
    quote: 'We have been spending incredible amounts on bank fees thanks to foreign payments. Very pleased to have signed up to HedgeFlows, we have already saved hundreds in just a couple of transactions. The system is incredibly easy to use.',
    tags: ['homepage', 'advisory'],
  },
  {
    name: 'Tracey Mayling',
    date: 'Jul 2023',
    title: 'Fantastic',
    quote: 'So glad we changed to Hedgeflows! Very easy to use, great currency information, fantastic exchange rates. Love that I can lock in a rate without having to transfer funds until they are needed.',
    tags: ['advisory', 'platform'],
  },
  {
    name: 'Stephanie Mills',
    date: 'Jun 2023',
    title: 'Super access to treasury for smaller companies',
    quote: 'Hedgeflows offer better exchange rates than our bank, excellent client focused service, and plenty of data to make better currency decisions. The perfect option for a smaller business.',
    tags: ['homepage', 'advisory'],
  },
  {
    name: 'Chris Morris',
    date: 'May 2023',
    title: 'Great system',
    quote: 'Hedgeflow has made our weekly payment runs far quicker and easier, and is a great workaround to Xero\'s restrictions on only creating payment runs for GBP.',
    tags: ['platform'],
  },
  {
    name: 'Ben Nightingale',
    date: 'Feb 2023',
    title: 'Amazing',
    quote: 'Makes FX transfers and payments simple. The interface is user friendly — can\'t recommend HedgeFlows enough. The team at HedgeFlows are fantastic and will help whenever you need them!',
    tags: ['homepage'],
  },
  {
    name: 'Geoff Deane',
    date: 'Feb 2023',
    title: 'Great solution',
    quote: 'Managing FX and payments is always tricky but Hedgeflows really helps. The Hedgeflows team are happy to help get things right and are clearly putting the customer at the centre of the app.',
    tags: ['homepage'],
  },
  {
    name: 'Rebeca Campos',
    date: 'Feb 2023',
    title: 'Very good app and tools',
    quote: 'Great to deal with them, good integration and solutions. Highly recommend. Amazing customer service too!',
    tags: [],
  },
  {
    name: 'Cento Clothing Ltd',
    date: 'Nov 2022',
    title: 'Great service',
    quote: 'Really easy platform to use and quick service.',
    tags: ['e-commerce'],
  },
  {
    name: 'Philip Owen',
    date: 'Nov 2022',
    title: 'Xero FX',
    quote: 'The app is a great way to see and manage FX exposures. The team in Hedgeflows are reactive and keen to further enhance the features — definitely something that I can see being core to my FX management.',
    tags: ['platform'],
  },
  {
    name: 'Ben Weaver',
    date: 'Nov 2022',
    title: 'Great simple to use platform!',
    quote: 'Has made making non-GBP payments simpler and cheaper to do! It also helps recognise where we are exposed as a business to FX rates. The support from the Hedgeflows team is excellent.',
    tags: ['platform'],
  },
  {
    name: 'Tom Courtney',
    date: 'May 2022',
    title: 'Simple to use and great service!',
    quote: 'The platform is pleasing on the eye and is incredibly easy to use. The rates and level of services provided are excellent!',
    tags: ['homepage'],
  },
  {
    name: 'Nesbat Khan',
    date: 'May 2022',
    title: 'International Finance Simplified',
    quote: 'Hedgeflows are at the forefront and provide a system like no other. Managing cash flows, automating international payments at a click of a button, hedging FX exposure — all whilst saving valuable time.',
    tags: ['homepage', 'advisory'],
  },
  {
    name: 'Alice Hobson',
    date: 'May 2022',
    title: 'Easy to use, efficient',
    quote: 'Hedgeflows has integrated very easily with our day to day running of the business. The team at Hedgeflows are easy to get hold of and always resolve any questions.',
    tags: [],
  },
  {
    name: 'Inna Fikh',
    date: 'Apr 2022',
    title: 'Very simple to use so far!',
    quote: 'Very pleased with HedgeFlows so far. It makes paying invoices, even in bulk so simple and their exchange rates a lot better than my bank.',
    tags: ['homepage'],
  },
];

/** Get reviews filtered by tag */
export function getReviewsByTag(tag: string): XeroReview[] {
  return xeroReviews.filter((r) => r.tags.includes(tag));
}

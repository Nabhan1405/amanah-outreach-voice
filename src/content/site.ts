/**
 * AMANAH OUTREACH VOICE — site content
 * ------------------------------------------------------------------
 * Single source of truth for copy, campaigns, stories and figures.
 *
 * VERIFIED FACTS (from the official brand presentation):
 *   • Amanah Outreach Voice is a non-profit charity organisation
 *     operating in Mangalore, Karnataka.
 *   • It works to bridge gaps in resources and livelihood for
 *     children, the differently-abled, the elderly and animals.
 *   • Programme categories, brand colours and logo are as supplied.
 *
 * PLACEHOLDERS — every item marked `placeholder: true`, and every
 * number in `impactStats`, `campaigns`, `trustFigures` and
 * `financials`, is EDITABLE SAMPLE DATA. Replace with audited
 * figures before publishing. No legal, financial or impact claim
 * here has been independently verified.
 * ------------------------------------------------------------------
 */

export const org = {
  name: "Amanah Outreach Voice",
  shortName: "Amanah",
  initials: "A.O.V.",
  tagline: "Empowering lives, inspiring hope.",
  microTagline: "Making every life matter.",
  city: "Mangalore",
  state: "Karnataka",
  country: "India",
  /** Verified, from the brand presentation. */
  description:
    "Amanah Outreach Voice is a non-profit charity organisation operating in Mangalore, Karnataka, bridging gaps in resources and livelihood for children, the differently-abled, the elderly and animals.",
  /** Placeholder contact details — replace with the real ones. */
  email: "hello@amanahoutreach.org",
  phone: "+91 00000 00000",
  address: "Mangalore, Karnataka, India",
  placeholderContact: true,
} as const;

export const nav = [
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Stories", href: "/stories" },
  { label: "Transparency", href: "/transparency" },
  { label: "Contact", href: "/contact" },
] as const;

/** The three lines the brand deck leads with. Verified copy. */
export const brandQuotes = [
  "A better world begins with a heart willing to help.",
  "Your kindness can become someone else’s tomorrow.",
  "Every child deserves a chance to learn, dream, and grow.",
] as const;

/* ------------------------------------------------------------------
   Areas of work — the six categories named in the brand presentation
   ------------------------------------------------------------------ */

export type Area = {
  slug: string;
  title: string;
  arabic?: string;
  summary: string;
  detail: string;
  image: string;
  imageAlt: string;
};

export const areas: Area[] = [
  {
    slug: "children-education",
    title: "Children & Education",
    summary:
      "School fees, books, uniforms and tuition for children whose families cannot carry the cost of a full year.",
    detail:
      "We work with families one academic year at a time — covering admission, materials and transport so that a child’s education is never interrupted by a month of hardship.",
    image: "/images/work-education.jpg",
    imageAlt:
      "Students seated at wooden desks in a bright classroom, working through their lessons.",
  },
  {
    slug: "medical-health-relief",
    title: "Medical & Health Relief",
    summary:
      "Treatment costs, medication and follow-up care for patients without the means to complete a course of treatment.",
    detail:
      "Support is arranged directly with hospitals and pharmacies wherever possible, so that help reaches the treatment rather than passing through many hands.",
    image: "/images/work-health.jpg",
    imageAlt:
      "A health worker sitting beside a man, dressing his arm with care and conversation.",
  },
  {
    slug: "elderly-care",
    title: "Elderly Care & Dignity",
    summary:
      "Monthly provisions, medicine and companionship for elders living alone or without family support.",
    detail:
      "Age should not mean invisibility. Our volunteers keep a standing relationship with each elder on the register — a visit, not only a delivery.",
    image: "/images/work-elderly.jpg",
    imageAlt: "A portrait of an elderly woman looking directly at the camera.",
  },
  {
    slug: "differently-abled",
    title: "Ability & Inclusion",
    summary:
      "Learning support, assistive equipment and vocational pathways for differently-abled children and adults.",
    detail:
      "We fund what makes participation possible: therapy hours, mobility equipment, adapted learning materials and, where we can, a route into work.",
    image: "/images/learning-support.jpg",
    imageAlt:
      "A teacher leaning down to speak with a child during a learning-support session.",
  },
  {
    slug: "animal-welfare",
    title: "Animal Welfare",
    summary:
      "Feeding, sterilisation and emergency veterinary care for street animals across the city.",
    detail:
      "Care extends past our own species. We support local feeders and veterinary partners who look after the animals that share the street with us.",
    image: "/images/work-animals.jpg",
    imageAlt:
      "A woman sitting with a rescued street dog resting against her shoulder.",
  },
  {
    slug: "emergency-livelihood",
    title: "Emergency & Livelihood",
    summary:
      "Rapid relief after a crisis, and the small capital that lets a household earn its own way again.",
    detail:
      "Immediate provisions in the first week; then tools, stock or a repaired vehicle — whatever restores a family’s own income.",
    image: "/images/work-relief.jpg",
    imageAlt:
      "Volunteers serving hot meals from large vessels to a gathered community.",
  },
];

/* ------------------------------------------------------------------
   Impact statistics — PLACEHOLDER FIGURES. Replace before publishing.
   ------------------------------------------------------------------ */

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  note: string;
};

export const impactStats: Stat[] = [
  {
    value: 1240,
    suffix: "+",
    label: "Lives supported",
    note: "Across all programmes since inception",
  },
  {
    value: 386,
    label: "Children in education",
    note: "Fees, materials and transport covered",
  },
  {
    value: 92,
    suffix: "%",
    label: "Of funds to programmes",
    note: "Remainder to operations and audit",
  },
  {
    value: 6,
    label: "Areas of work",
    note: "From education to animal welfare",
  },
];

/** Marked as sample data wherever the numbers are shown. */
export const figuresArePlaceholder = true;

/* ------------------------------------------------------------------
   Campaigns
   ------------------------------------------------------------------ */

export type Campaign = {
  slug: string;
  title: string;
  category: string;
  location: string;
  summary: string;
  body: string[];
  raised: number;
  goal: number;
  supporters: number;
  daysLeft: number;
  image: string;
  imageAlt: string;
  verified: boolean;
  featured?: boolean;
  /** Sample data — replace with live campaign records. */
  placeholder: true;
};

export const campaigns: Campaign[] = [
  {
    slug: "a-full-school-year",
    title: "A Full School Year",
    category: "Children & Education",
    location: "Mangalore, Karnataka",
    summary:
      "Admission, books, uniforms and transport for 40 children, secured for a complete academic year rather than a single term.",
    body: [
      "A year of school rarely breaks down over a single large cost. It breaks down over a sequence of small ones — an exam fee in August, a replacement uniform in November, a bus pass in January — each arriving in a month where the household budget has no room left.",
      "This campaign removes that sequence. Rather than funding a term at a time, we underwrite the full academic year for forty children: admission and examination fees, textbooks and notebooks, two uniforms, shoes, and daily transport.",
      "Payments are made directly to the school and the supplier. Families receive the materials; they never handle the disbursement. Each child’s file is reviewed at the end of the year before renewal.",
    ],
    raised: 612400,
    goal: 850000,
    supporters: 214,
    daysLeft: 38,
    image: "/images/work-education.jpg",
    imageAlt:
      "Students at their desks in a classroom, books open in front of them.",
    verified: true,
    featured: true,
    placeholder: true,
  },
  {
    slug: "medicines-that-cannot-wait",
    title: "Medicines That Cannot Wait",
    category: "Medical & Health Relief",
    location: "Dakshina Kannada",
    summary:
      "Completing prescribed courses of treatment for patients who would otherwise stop halfway for want of the next month’s medication.",
    body: [
      "An unfinished course of treatment is often more costly than no treatment at all. Yet it is the most common outcome we encounter: a diagnosis, a first month of medication, and then silence.",
      "This fund settles pharmacy accounts directly for patients referred to us by partner clinics, covering the remaining months of a prescribed course together with the follow-up consultations that confirm it worked.",
    ],
    raised: 289000,
    goal: 500000,
    supporters: 137,
    daysLeft: 54,
    image: "/images/work-health.jpg",
    imageAlt: "A health worker attending to a patient's arm at a home visit.",
    verified: true,
    placeholder: true,
  },
  {
    slug: "provisions-for-elders",
    title: "Provisions for Elders",
    category: "Elderly Care & Dignity",
    location: "Mangalore, Karnataka",
    summary:
      "A monthly ration and medicine kit for elders living alone — delivered in person, by the same volunteer, every month.",
    body: [
      "The register is deliberately small. Each elder is visited by the same volunteer each month, so that the delivery is also a conversation and any change in health is noticed early.",
      "A monthly kit covers staple provisions, cooking fuel and routine medication. Where a medical need appears, it is referred into our health relief programme the same week.",
    ],
    raised: 174500,
    goal: 300000,
    supporters: 96,
    daysLeft: 21,
    image: "/images/work-elderly.jpg",
    imageAlt: "Portrait of an elderly woman in a green and gold saree.",
    verified: true,
    placeholder: true,
  },
  {
    slug: "room-to-learn",
    title: "Room to Learn",
    category: "Ability & Inclusion",
    location: "Mangalore, Karnataka",
    summary:
      "Therapy hours, assistive equipment and adapted learning materials for differently-abled children in mainstream schools.",
    body: [
      "Inclusion fails quietly — not through refusal, but through the absence of a ramp, a set of large-print materials, or the weekly therapy hour that makes the classroom workable.",
      "This campaign funds those specifics, child by child, in coordination with the school and the family.",
    ],
    raised: 96800,
    goal: 250000,
    supporters: 61,
    daysLeft: 62,
    image: "/images/learning-support.jpg",
    imageAlt: "A teacher working one-to-one with a child at a low table.",
    verified: true,
    placeholder: true,
  },
  {
    slug: "the-street-has-residents",
    title: "The Street Has Residents",
    category: "Animal Welfare",
    location: "Mangalore, Karnataka",
    summary:
      "Sterilisation, vaccination and emergency veterinary care for street animals, run with local feeders and vets.",
    body: [
      "Sterilisation and vaccination do more for a street animal population than any amount of ad-hoc feeding. This fund pays the veterinary partners who carry out both, and covers emergency treatment when an animal is injured.",
    ],
    raised: 58200,
    goal: 150000,
    supporters: 88,
    daysLeft: 45,
    image: "/images/work-animals.jpg",
    imageAlt: "A rescued street dog resting beside the woman who cares for it.",
    verified: true,
    placeholder: true,
  },
  {
    slug: "back-to-earning",
    title: "Back to Earning",
    category: "Emergency & Livelihood",
    location: "Coastal Karnataka",
    summary:
      "Tools, stock and repairs that return a household to its own income after an emergency — not a monthly dependency.",
    body: [
      "Relief keeps a family standing for a fortnight. Livelihood keeps them standing afterwards.",
      "Once immediate needs are met, we fund the specific item that restores a household’s own earning: a repaired auto-rickshaw, a replaced sewing machine, a restocked cart.",
    ],
    raised: 341000,
    goal: 400000,
    supporters: 152,
    daysLeft: 12,
    image: "/images/work-livelihood.jpg",
    imageAlt:
      "Volunteers handing provisions to families at a neighbourhood distribution.",
    verified: true,
    placeholder: true,
  },
];

export const featuredCampaign =
  campaigns.find((c) => c.featured) ?? campaigns[0];

/* ------------------------------------------------------------------
   Stories
   ------------------------------------------------------------------ */

export type Story = {
  slug: string;
  title: string;
  kicker: string;
  excerpt: string;
  body: string[];
  image: string;
  imageAlt: string;
  date: string;
  readTime: string;
  placeholder: true;
};

export const stories: Story[] = [
  {
    slug: "the-year-that-was-not-interrupted",
    title: "The year that was not interrupted",
    kicker: "Children & Education",
    excerpt:
      "What changes when a family stops counting school costs month by month.",
    body: [
      "The difference a full-year commitment makes is not visible in a photograph. It shows up in attendance registers — in the absence of the two- and three-week gaps that used to open every time a fee fell due.",
      "For the families on this programme, the change is mostly administrative: a form at the start of the year, and then nothing further to arrange. That is the point. The intervention that works is often the one that stops demanding attention.",
      "We review every file at the end of the academic year with the school before renewal, and we publish the aggregate outcome in our annual statement.",
    ],
    image: "/images/story-school.jpg",
    imageAlt: "A schoolgirl in uniform standing in a classroom doorway.",
    date: "2026-02-18",
    readTime: "4 min",
    placeholder: true,
  },
  {
    slug: "a-visit-not-a-delivery",
    title: "A visit, not a delivery",
    kicker: "Elderly Care & Dignity",
    excerpt:
      "Why the same volunteer returns to the same door, month after month.",
    body: [
      "It would be more efficient to rotate volunteers and optimise the route. We do not, because the value of the visit is in the continuity rather than the parcel.",
      "A volunteer who has seen the same elder for a year notices the change in a walk, a cough that has lasted too long, a kitchen that has not been used. Those observations are how most of our health referrals begin.",
    ],
    image: "/images/story-elder.jpg",
    imageAlt: "A portrait of an elderly man in a white shirt and glasses.",
    date: "2026-01-09",
    readTime: "3 min",
    placeholder: true,
  },
  {
    slug: "what-verification-actually-means",
    title: "What verification actually means",
    kicker: "How we work",
    excerpt:
      "A case file, a home visit, and the documents we insist on before a rupee moves.",
    body: [
      "Every case that reaches a campaign page has been through the same four steps, in the same order, regardless of how urgent it appeared when it was referred.",
      "We publish the process rather than the paperwork, because the families involved are entitled to their privacy. What we can say is that no case is listed on the strength of a photograph and a phone call.",
    ],
    image: "/images/verify-classroom.jpg",
    imageAlt: "Students raising their hands in a busy classroom.",
    date: "2025-12-02",
    readTime: "5 min",
    placeholder: true,
  },
  {
    slug: "two-brothers-one-bus-pass",
    title: "Two brothers, one bus pass",
    kicker: "Children & Education",
    excerpt:
      "The smallest line item in a school budget, and the one that most often ends an education.",
    body: [
      "Transport is rarely the cost anyone plans for. It is also, in our case files, the single most frequent reason a child stops attending.",
      "It is now a standing line in every education campaign we run, rather than something we add when a family thinks to mention it.",
    ],
    image: "/images/story-brothers.jpg",
    imageAlt:
      "Two young brothers laughing together, photographed in black and white.",
    date: "2025-11-14",
    readTime: "3 min",
    placeholder: true,
  },
];

/* ------------------------------------------------------------------
   How verification works
   ------------------------------------------------------------------ */

export const verificationSteps = [
  {
    n: "01",
    title: "Referral",
    body: "A case reaches us through a partner school, clinic, place of worship or a neighbour. Self-referrals are accepted and treated identically.",
  },
  {
    n: "02",
    title: "Home visit",
    body: "Two volunteers visit in person. They meet the household, confirm the need described, and record what is actually required rather than what was requested.",
  },
  {
    n: "03",
    title: "Documentation",
    body: "Identity, the underlying cost — a school fee notice, a prescription, an estimate — and where relevant a second opinion are placed on file.",
  },
  {
    n: "04",
    title: "Committee review",
    body: "A standing committee approves, defers or declines. Declined cases are given a written reason and, where possible, a referral elsewhere.",
  },
  {
    n: "05",
    title: "Direct disbursement",
    body: "Funds are paid to the school, hospital, pharmacy or supplier wherever possible, rather than passed through intermediaries.",
  },
  {
    n: "06",
    title: "Follow-up",
    body: "Each closed case is revisited. The outcome is recorded, and the aggregate is published in our annual statement.",
  },
] as const;

/* ------------------------------------------------------------------
   Transparency — PLACEHOLDER FIGURES. Replace before publishing.
   ------------------------------------------------------------------ */

export const financials = [
  { label: "Direct programme costs", value: 92 },
  { label: "Operations & administration", value: 6 },
  { label: "Audit & compliance", value: 2 },
];

export const trustPoints = [
  {
    title: "Direct disbursement",
    body: "Wherever an institution can be paid directly — a school, a hospital, a pharmacy — it is. Cash transfers are the exception and are documented as such.",
  },
  {
    title: "Named committee",
    body: "Every approval carries the signature of a standing review committee rather than a single officer. Declines are recorded with reasons.",
  },
  {
    title: "Published accounts",
    body: "Annual income, expenditure and programme allocation are published in full, together with the independent auditor’s report.",
  },
  {
    title: "Case follow-up",
    body: "A case is not closed at the point of payment. It is closed after a follow-up visit confirms the intended outcome.",
  },
] as const;

/* ------------------------------------------------------------------
   Get involved
   ------------------------------------------------------------------ */

export const givingTiers = [
  {
    amount: 500,
    title: "A month of materials",
    body: "Notebooks, stationery and examination fees for one child for a month.",
  },
  {
    amount: 1500,
    title: "A month of provisions",
    body: "A full ration and medicine kit delivered to one elder living alone.",
  },
  {
    amount: 5000,
    title: "A term of school",
    body: "Fees, books and transport for one child for a complete school term.",
  },
] as const;

export const involvement = [
  {
    title: "Give monthly",
    body: "A standing monthly gift is what allows us to commit to a family for a full year rather than a single term. It is the single most useful thing a supporter can do.",
    cta: { label: "Set up monthly giving", href: "/donate" },
  },
  {
    title: "Volunteer",
    body: "Home visits, documentation, tuition, distribution and veterinary support. Volunteers are trained and matched to a standing role rather than an occasional one.",
    cta: { label: "Volunteer with us", href: "/contact" },
  },
  {
    title: "Partner",
    body: "Schools, clinics, employers and institutions who can refer cases, absorb costs, or open a route into work for the people we support.",
    cta: { label: "Start a conversation", href: "/contact" },
  },
] as const;

export const marqueeWords = [
  "Amanah",
  "Dignity",
  "Generosity",
  "Trust",
  "Light",
  "Humanity",
  "Permanence",
  "Warmth",
  "Hope",
] as const;

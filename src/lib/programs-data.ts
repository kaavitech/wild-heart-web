import natureConnect from "@/assets/projects/nature-connect.png";
import runWalkClean from "@/assets/projects/run-walk-clean.png";
import jeevandhara from "@/assets/projects/jeevandhara.png";
import ecoSteps from "@/assets/projects/eco-steps.png";
import natureLibrary from "@/assets/projects/nature-library.jpg";

export type DonationImpact = {
  amount: string;
  impact: string;
};

export type ProgramFundraising = {
  phaseTitle: string;
  target: string;
  targetNote: string;
  donationImpacts: DonationImpact[];
  foundingPartner: { amount: string; title: string };
  bankDetails: {
    accountName: string;
    bank: string;
    accountNumber: string;
    ifsc: string;
  };
  bookDonation: {
    intro: string;
    topics: string[];
    recipient: string;
    organization: string;
    address: string;
    listNote: string;
  };
};

export type ProgramExperience = {
  title: string;
  intro: string;
  highlights: string[];
};

export type ProgramWhyItMatters = {
  title: string;
  body: string;
};

export type ProgramPastWalks = {
  title: string;
  galleryCategory: string;
};

export type ProgramJoinInfo = {
  title: string;
  intro: string;
  details: Array<{ label: string; value: string }>;
};

export type ProgramScheduleEntry = {
  date: string;
  day: string;
  venue: string;
  registrationLink: string;
};

export type ProgramSchedule = {
  title: string;
  intro?: string;
  entries: ProgramScheduleEntry[];
};

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getUpcomingScheduleEntries(
  entries: ProgramScheduleEntry[],
  now = new Date(),
): ProgramScheduleEntry[] {
  const today = startOfDay(now);

  return entries.filter((entry) => {
    const walkDate = startOfDay(new Date(entry.date));
    return !Number.isNaN(walkDate.getTime()) && walkDate >= today;
  });
}

export type ProgramSessionStep = {
  name: string;
  description: string;
};

export type ProgramSessionFlow = {
  title: string;
  steps: ProgramSessionStep[];
  closingStatement?: string;
  galleryCategory?: string;
  galleryNote?: string;
};

export type ProgramTestimonials = {
  title: string;
  quotes: string[];
};

export type Program = {
  slug: string;
  name: string;
  headline?: string;
  heroTitle?: string;
  tagline?: string;
  short: string;
  description: string;
  closingStatement?: string;
  cover: string;
  tags: string[];
  status: "Active" | "Ongoing" | "Upcoming";
  objectives?: string[];
  vision?: string;
  impact?: string;
  expectedSupport: string[];
  experience?: ProgramExperience;
  whyItMatters?: ProgramWhyItMatters;
  pastWalks?: ProgramPastWalks;
  joinInfo?: ProgramJoinInfo;
  schedule?: ProgramSchedule;
  sessionFlow?: ProgramSessionFlow;
  testimonials?: ProgramTestimonials;
  fundraising?: ProgramFundraising;
};

export const PROGRAMS: Program[] = [
  {
    slug: "nature-connect",
    name: "Nature Connect",
    short: "Bringing environmental education into schools through immersive learning.",
    description:
      "Nature Connect is an upcoming Wild Agile Foundation initiative — stay tuned for details on how we will bring children closer to the wild around them.",
    cover: natureConnect,
    tags: ["Children", "Nature", "Education"],
    status: "Upcoming",
    objectives: [
      "Connect children with local ecosystems through immersive experiences",
      "Partner with schools and communities",
      "Launch program details soon",
    ],
    vision: "Every child rooted in a living relationship with nature.",
    impact: "Launching soon — join our newsletter to be the first to know.",
    expectedSupport: ["Volunteer", "School", "Wildlife Expert", "Sponsor"],
  },
  {
    slug: "eco-steps",
    name: "EcoSteps",
    tagline: "A walk into the wild, one Sunday at a time.",
    short: "A walk into the wild, one Sunday at a time.",
    description:
      "Every last Sunday of the month, we trade screens for soil and swap sidewalks for forest trails. EcoSteps is Wild Agile Foundation's flagship nature walk — a morning where children and their families step into the forest and, for a few hours, simply notice the world around them: the birds overhead, the insects underfoot, the quiet architecture of a wetland.",
    closingStatement: "No lectures. No worksheets. Just forest, family, and firsthand wonder.",
    cover: ecoSteps,
    tags: ["Children", "Nature Walks", "Community"],
    status: "Active",
    objectives: [
      "Host a monthly nature walk on the last Sunday of every month",
      "Explore trees, birds, animals, soil and wetlands through games and stories",
      "Help children discover fun ways to care for nature",
    ],
    vision: "Kids who explore nature with joy — and grow up wanting to protect it.",
    impact: "A recurring monthly walk bringing children and families into the wild.",
    expectedSupport: ["Volunteer", "Wildlife Expert", "Photographer", "School"],
    experience: {
      title: "What Happens on an EcoSteps Walk",
      intro:
        "Each walk is built around one idea: you protect what you've actually experienced. So instead of teaching kids about nature, we take them into it.",
      highlights: [
        "Guided forest trails through Nagpur's own green spaces — Seminary Hills, Gorewada Forest Range, and other nearby habitats",
        "Hands-on observation of birds, insects, forest plants, soil, and wetlands, often using binoculars and camera lenses to get up close",
        "Stories and games woven into the walk, so kids absorb ecology the way they absorb everything best — by playing",
        "Family-paced exploration — no fixed pace, no pressure, just everyone moving through the forest together",
        "Conversations that stick — about why habitats matter, how ecosystems connect, and what it means to be a responsible visitor in the wild",
      ],
    },
    whyItMatters: {
      title: "Why It Matters",
      body: "Children today spend less time outdoors than any generation before them. Wildlife is increasingly something they see on a screen, not in the world. EcoSteps exists to close that gap — because conservation doesn't start with a lesson plan. It starts with a child crouching by a stream, watching a bird land, and asking why.",
    },
    pastWalks: {
      title: "From Our Past Walks",
      galleryCategory: "Eco Steps",
    },
    joinInfo: {
      title: "Join an EcoSteps",
      intro:
        "EcoSteps is free and open to families with kids. All you need is comfortable walking shoes, a sense of curiosity, and a free Sunday morning.",
      details: [
        {
          label: "Next Walk",
          value: "Last Sunday of every month",
        },
        {
          label: "Where",
          value:
            "Seminary Hills / Gorewada Forest Range / Ambazari BioDiversity Park (location shared ahead of each walk)",
        },
        {
          label: "Who",
          value: "Children and families — no experience needed",
        },
      ],
    },
    schedule: {
      title: "Upcoming Walks",
      intro: "Register for a Sunday walk near you.",
      entries: [
        {
          date: "26 Jul 2026",
          day: "Sunday",
          venue: "Seminary Hills – Behind Bal Udyaan",
          registrationLink: "https://luma.com/51agnpev",
        },
        {
          date: "30 Aug 2026",
          day: "Sunday",
          venue: "Ambazari Biodiversity Park",
          registrationLink: "https://luma.com/h3tnktjn",
        },
        {
          date: "27 Sep 2026",
          day: "Sunday",
          venue: "Seminary Hills – Behind TTC",
          registrationLink: "https://luma.com/tlvw6rph",
        },
        {
          date: "25 Oct 2026",
          day: "Sunday",
          venue: "Gorewada Nature Trail",
          registrationLink: "https://luma.com/z2nncypz",
        },
        {
          date: "29 Nov 2026",
          day: "Sunday",
          venue: "Seminary Hills – Behind Bal Udyaan",
          registrationLink: "https://luma.com/q5ul0f5i",
        },
        {
          date: "20 Dec 2026",
          day: "Sunday",
          venue: "Gorewada Nature Trail",
          registrationLink: "https://luma.com/pyt3maz0",
        },
        {
          date: "31 Jan 2027",
          day: "Sunday",
          venue: "Gorewada Nature Trail",
          registrationLink: "https://luma.com/2sl8d9n6",
        },
        {
          date: "28 Feb 2027",
          day: "Sunday",
          venue: "Seminary Hills – Behind Bal Udyaan",
          registrationLink: "https://luma.com/jqayx7l1",
        },
      ],
    },
  },
  {
    slug: "jeevandhara",
    name: "JeevanDhara",
    tagline: "Wildlife and environment education program for schools",
    short: "Wildlife and environment education program for schools",
    description:
      "JeevanDhara takes students inside the world of forests, biodiversity, and conservation — using film, story, and conversation instead of textbooks. Launched during Wildlife Week and aligned with NEP 2020 and the UN Sustainable Development Goals, it's built on one belief: the values that protect our planet have to be planted early.",
    cover: jeevandhara,
    tags: ["Wildlife", "Education", "Schools"],
    status: "Active",
    objectives: [
      "Educate students on biodiversity and conservation",
      "Align school programs with NEP 2020 and UN SDGs",
      "Use films and interactive activities to make nature learning memorable",
    ],
    vision: "Environmental values built early in life — shaping lifelong responsible behavior.",
    impact: "Launched during Wildlife Week across partner schools with films and interactive sessions.",
    expectedSupport: ["School", "Volunteer", "Wildlife Expert", "CSR Partner"],
    sessionFlow: {
      title: "Inside a Session — 40 Minutes That Stick",
      steps: [
        {
          name: "Spark",
          description: "A short, energetic introduction to pull students in",
        },
        {
          name: "Discover",
          description:
            "A 20-minute documentary on forest types, local wildlife, and why conservation matters",
        },
        {
          name: "Commit",
          description: "An interactive closing where students take a conservation pledge",
        },
      ],
      closingStatement:
        "No lecture format, no rote memorization — just a format built to be watched, felt, and remembered.",
      galleryCategory: "JeevanDhara",
      galleryNote: "Pictures & videos from sessions — more coming soon.",
    },
    testimonials: {
      title: "What Teachers Are Saying",
      quotes: [
        "Engaging and visual sessions like this should happen more often, with diverse topics.",
        "External experts add freshness and make learning more enjoyable.",
        "This will inculcate love and respect for nature from an early age.",
      ],
    },
  },
  {
    slug: "run-walk-clean",
    name: "Run Walk Clean",
    short: "Helping communities take ownership of the places they love.",
    description:
      "Long before sunrise, the urban forest fills with familiar faces — the same walkers, the same joggers, the same quiet love for the forest. Run Walk Clean simply asks one more thing of that daily ritual: pick up what doesn't belong.",
    cover: runWalkClean,
    tags: ["Community", "Clean-up", "Forest"],
    status: "Active",
    objectives: [
      "Inspire walkers to pick up litter during forest walks",
      "Keep city forest cover cleaner for everyone",
      "Build a culture of stewardship among nature lovers",
    ],
    vision: "Every walk through the forest leaves it a little cleaner than we found it.",
    impact: "Engaging walkers and nature lovers in hands-on forest cleaning across the city.",
    expectedSupport: ["Volunteer", "CSR Partner", "Corporate", "Sponsor"],
    pastWalks: {
      title: "Gallery",
      galleryCategory: "Run Walk Clean",
    },
  },
  {
    slug: "nature-library",
    name: "Nature Library",
    headline: "Build Our First Nature Library",
    heroTitle:
      "An environmental knowledge hub that inspires people to discover, understand, and protect nature.",
    short: "Keeping curiosity alive through books, stories, and lifelong learning.",
    description:
      "The Wild Agile Nature Library is being created as a dedicated space for anyone who wishes to explore and understand the natural world. With a carefully curated collection of books on wildlife, biodiversity, forests, climate, and conservation, the library will inspire learning, encourage meaningful conversations, and deepen our connection with nature.",
    closingStatement: "Because protecting nature begins with understanding it.",
    cover: natureLibrary,
    tags: ["Education", "Reading", "Conservation", "Library"],
    status: "Ongoing",
    expectedSupport: ["Monetary Donor", "Book Donor", "Sponsor", "Patron"],
    fundraising: {
      phaseTitle: "Our Phase 1 Goal – 2026",
      target: "₹3,00,000",
      targetNote:
        "We're raising ₹3,00,000 to establish the first phase of the library.",
      donationImpacts: [
        { amount: "₹500", impact: "Sponsor a nature or wildlife book" },
        { amount: "₹1,000", impact: "Sponsor two or more books" },
        {
          amount: "₹2,500",
          impact:
            "Sponsor a themed collection (Birds, Butterflies, Forests, biodiversity, etc.)",
        },
        {
          amount: "₹5,000",
          impact: "Help create a comfortable reading and learning space",
        },
        { amount: "₹10,000", impact: "Sponsor a bookshelf" },
        { amount: "₹25,000", impact: "Become a Nature Library Patron" },
        { amount: "Guidance", impact: "Provide guidance on the collection and organization of the library" },
      ],
      foundingPartner: {
        amount: "₹50,000 & Above",
        title: "Become a Founding Partner of the Wild Agile Nature Library",
      },
      bankDetails: {
        accountName: "Wild Agile Foundation",
        bank: "IndusInd Bank Ltd",
        accountNumber: "254330300925",
        ifsc: "INDB0002173",
      },
      bookDonation: {
        intro: "We welcome new or gently used books related to:",
        topics: [
          "Environment",
          "Wildlife",
          "Forestry",
          "Biodiversity",
          "Conservation",
          "Birds and Natural History",
          "Climate Change",
          "Sustainability",
          "Ecology",
          "Nature Education",
        ],
        recipient: "Dipti Pande (Co-ordinator)",
        organization: "Wild Agile Foundation (Office)",
        address:
          "202, Durvang Enclave 1, Patil Layout, Swavalambi Nagar, Nagpur, Maharashtra 440022",
        listNote: "List of books you can donate — link to be provided.",
      },
    },
  },
];

export const getProgram = (slug: string) => PROGRAMS.find((p) => p.slug === slug);

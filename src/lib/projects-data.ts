import natureConnect from "@/assets/projects/nature-connect.png";
import runWalkClean from "@/assets/projects/run-walk-clean.png";
import jeevandhara from "@/assets/projects/jeevandhara.png";
import ecoSteps from "@/assets/projects/eco-steps.png";
import natureLibrary from "@/assets/projects/nature-library.jpg";

export type DonationImpact = {
  amount: string;
  impact: string;
};

export type ProjectFundraising = {
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

export type Project = {
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
  objectives: string[];
  vision: string;
  impact: string;
  expectedSupport: string[];
  fundraising?: ProjectFundraising;
};

export const PROJECTS: Project[] = [
  {
    slug: "jeevandhara",
    name: "JeevanDhara",
    short: "A wildlife awareness program that educates students about biodiversity, conservation, and ecological responsibility.",
    description:
      "A Wildlife Awareness Program aims to educate students about biodiversity, conservation, and ecological responsibility. Aligned with NEP 2020 and the UN Sustainable Development Goals (SDGs), it focuses on building environmental values early in life — shaping lifelong responsible behavior. Schools serve as the most effective platform to reach young minds, and Wildlife Week provided the ideal occasion to launch this initiative. Using films and interactive activities, the program makes learning about nature engaging and memorable.",
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
  },
  {
    slug: "eco-steps",
    name: "ECO-STEPS",
    short: "A fun-filled nature walk for kids — every last Sunday of the month.",
    description:
      "A fun-filled nature walk specially for kids — happening every last Sunday of the month! Where we go out in nature and chat about trees, birds, animals, soil, wetlands etc. all while exploring the nature. With games and stories, we learn cool ways to care for nature — while having a blast!",
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
  },
  {
    slug: "run-walk-clean",
    name: "RUN WALK CLEAN",
    short: "Inspiring walkers and nature lovers to pick up litter as they go.",
    description:
      "Every day, many of us enjoy peaceful walks through the forest cover surrounding our city. Through this forest cleaning activity, we aim to inspire walkers and nature lovers to take a small but meaningful step — by picking up litter as they go.",
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
  },
  {
    slug: "nature-connect",
    name: "Nature Connect",
    short: "An upcoming program connecting children with nature through immersive learning.",
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
    slug: "nature-library",
    name: "Nature Library",
    headline: "Build Our First Nature Library",
    heroTitle:
      "An environmental knowledge hub that inspires people to discover, understand, and protect nature.",
    short:
      "A curated collection of books on wildlife, biodiversity, forests, climate, and conservation — inspiring learning and deeper connection with nature.",
    description:
      "The Wild Agile Nature Library is being created as a dedicated space for anyone who wishes to explore and understand the natural world. With a carefully curated collection of books on wildlife, biodiversity, forests, climate, and conservation, the library will inspire learning, encourage meaningful conversations, and deepen our connection with nature.",
    closingStatement: "Because protecting nature begins with understanding it.",
    cover: natureLibrary,
    tags: ["Education", "Reading", "Conservation", "Library"],
    status: "Ongoing",
    objectives: [
      "A collection of 500 carefully curated books",
      "Furniture to arrange the books systematically",
      "Comfortable reading and learning spaces",
    ],
    vision:
      "A place where curiosity grows into knowledge, and knowledge grows into conservation.",
    impact:
      "Phase 1 fundraising is underway — help us establish the first Wild Agile Nature Library.",
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
        bank: "XXXXX Bank",
        accountNumber: "XXXXXXXXXXXX",
        ifsc: "XXXXXXXX",
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

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

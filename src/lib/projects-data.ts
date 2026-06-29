import natureConnect from "@/assets/projects/nature-connect.png";
import runWalkClean from "@/assets/projects/run-walk-clean.png";
import jeevandhara from "@/assets/projects/jeevandhara.png";
import ecoSteps from "@/assets/projects/eco-steps.png";
import natureLibrary from "@/assets/projects/nature-library.jpg";

export type Project = {
  slug: string;
  name: string;
  short: string;
  description: string;
  cover: string;
  tags: string[];
  status: "Active" | "Ongoing" | "Upcoming";
  objectives: string[];
  vision: string;
  impact: string;
  expectedSupport: string[];
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
    short: "An upcoming resource bringing nature books and stories to young readers.",
    description:
      "Nature Library is an upcoming Wild Agile Foundation initiative — a curated collection of nature books and stories for children. Details coming soon.",
    cover: natureLibrary,
    tags: ["Education", "Reading", "Children"],
    status: "Upcoming",
    objectives: [
      "Curate a collection of nature books for young readers",
      "Make nature literature accessible in schools and communities",
      "Launch program details soon",
    ],
    vision: "Every child with a shelf of stories that whisper the language of the wild.",
    impact: "Launching soon — join our newsletter to be the first to know.",
    expectedSupport: ["School", "Content Creator", "Volunteer", "Sponsor"],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

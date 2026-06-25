import plantation from "@/assets/project-plantation.jpg";
import natureWalk from "@/assets/project-nature-walk.jpg";
import clean from "@/assets/project-clean.jpg";
import school from "@/assets/project-school.jpg";

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
    slug: "nature-connect",
    name: "Nature Connect",
    short: "Immersive forest walks that reintroduce children to the wild around them.",
    description:
      "Nature Connect takes young learners out of classrooms and into forests, riversides, and grasslands — where curiosity becomes conservation.",
    cover: natureWalk,
    tags: ["Children", "Nature Walks", "Education"],
    status: "Ongoing",
    objectives: [
      "Introduce 1,000+ children to local ecosystems",
      "Train teachers as nature mentors",
      "Document local biodiversity with students",
    ],
    vision: "A generation that recognizes every tree, bird and stream as kin — not scenery.",
    impact: "300+ children have completed guided nature immersions in the past year.",
    expectedSupport: ["Volunteer", "Photographer", "Wildlife Expert", "School"],
  },
  {
    slug: "run-walk-clean",
    name: "RUN WALK CLEAN",
    short: "Community runs that leave trails cleaner than we found them.",
    description:
      "A simple movement: lace up, show up, and leave the forest cleaner. Every event blends fitness, fellowship and stewardship.",
    cover: clean,
    tags: ["Community", "Clean-up", "Wellness"],
    status: "Active",
    objectives: [
      "Host monthly clean-runs in 5 cities",
      "Recover and segregate 2 tonnes of waste",
      "Build local stewardship circles",
    ],
    vision: "Every weekend, somewhere, a forest gets a little quieter and a little cleaner.",
    impact: "1,200+ kg of waste collected across 18 events.",
    expectedSupport: ["Volunteer", "CSR Partner", "Corporate", "Sponsor"],
  },
  {
    slug: "jeevandhara",
    name: "JeevanDhara",
    short: "Reviving water bodies that schools and villages depend on.",
    description:
      "JeevanDhara is our long-form effort to restore ponds, springs and small reservoirs — bringing children into the work of healing water.",
    cover: plantation,
    tags: ["Water", "Restoration", "Community"],
    status: "Ongoing",
    objectives: [
      "Restore 10 community water bodies",
      "Plant 5,000 native riparian trees",
      "Set up student-led monitoring",
    ],
    vision: "Wherever children grow up, they should know the sound of clean water.",
    impact: "4 water bodies under active restoration with school partners.",
    expectedSupport: ["Tree Plantation", "Research Partner", "Environmentalist", "CSR Partner"],
  },
  {
    slug: "school-programs",
    name: "Nature in Schools",
    short: "Bringing forests into classrooms — and classrooms into forests.",
    description:
      "We co-design year-long nature curricula with schools, weaving wildlife, ecology and ethics into everyday learning.",
    cover: school,
    tags: ["Education", "Schools", "Curriculum"],
    status: "Ongoing",
    objectives: [
      "Partner with 25 schools",
      "Train 100+ teachers as nature guides",
      "Publish open-source nature curriculum",
    ],
    vision: "Nature literacy as fundamental as numeracy.",
    impact: "10 partner schools and 500+ students engaged.",
    expectedSupport: ["School", "Content Creator", "Environmentalist", "Volunteer"],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

// "In the media" coverage. Images live in public/media/press as compressed WebP:
// <name>.thumb.webp (480px, shown in grids) and <name>.webp (1400px, opened on tap).
// To add a clipping: compress it the same way, then add its name to a story below.

export type MediaStory = {
  id: string;
  title: string;
  short: string; // label under the home-page story circle
  summary: string;
  date: string; // shown as-is
  sortKey: string; // YYYY-MM-DD, newest first
  program?: { slug: string; name: string };
  outlets: string[];
  clippings: string[];
};

export type MediaVideo = {
  id: string;
  title: string;
  summary: string;
  date: string;
  src: string;
  poster: string;
};

const press = (name: string) => ({
  thumb: `/media/press/${name}.thumb.webp`,
  full: `/media/press/${name}.webp`,
});
export const clippingSrc = press;

export const MEDIA_VIDEOS: MediaVideo[] = [
  {
    id: "changemakers-conclave",
    title: "Changemakers Conclave at IIM Nagpur",
    summary: "Wild Agile Foundation shared its work with children and nature at the Changemakers Conclave, IIM Nagpur.",
    date: "2026",
    src: "/media/video/changemakers-conclave.mp4",
    poster: "/media/video/changemakers-conclave.poster.webp",
  },
];

export const MEDIA_STORIES: MediaStory[] = [
  {
    id: "save-sahyadri",
    short: "Save Sahyadri",
    title: "Joining the 'Save Sahyadri' campaign",
    summary:
      "Wild Agile Foundation stood with actor and environmentalist Sayaji Shinde at the Nagpur protest against tree felling in the Sahyadri and Bhimashankar forests.",
    date: "November 2026",
    sortKey: "2026-11-03",
    outlets: ["The Hitavada", "Lokmat Times", "Tarun Bharat", "Lokmat Samachar"],
    clippings: [
      "bhimanshankarprotest2",
      "bhimanshankarprotest4",
      "bhimanshankarprotest5",
      "bhimanshankarprotest",
      "bhimanshankarprotest3",
      "bhimanshankarprotest6",
    ],
  },
  {
    id: "nisarg-baithak-2",
    short: "Wildlife Rescue S1",
    title: "Nisarg Baithak · Wildlife Rescue, Session 1: From Rescue to Freedom",
    summary:
      "The first Nisarg Baithak session on Wildlife Rescue, at Purva Vidarbha Mahila Parishad, traced wildlife rescue from capture to release with Kundan Hate of the Transit Treatment Centre and veterinary officer Dr Priyal Chauragade.",
    date: "November 2026",
    sortKey: "2026-11-02",
    program: { slug: "nisarg-baithak", name: "Nisarg Baithak" },
    outlets: ["The Times of India", "Nagpur Post", "Lokmat", "Punyanagari"],
    clippings: [
      "s2-nisargbaithak",
      "s2-nisargbaithak4",
      "s2-nisargbaithak6",
      "s2-nisargbaithak2",
      "s2-nisargbaithak3",
      "s2-nisargbaithak5",
    ],
  },
  {
    id: "nisarg-baithak-1",
    short: "Trees & the Law S1",
    title: "Nisarg Baithak · Trees & the Law, Session 1: Trees Have Rights Too",
    summary:
      "The first Nisarg Baithak session on Trees & the Law, a public conversation on the legal rights of trees, was previewed and reported across Nagpur's Hindi, Marathi and English papers.",
    date: "August 2026",
    sortKey: "2026-08-24",
    program: { slug: "nisarg-baithak", name: "Nisarg Baithak" },
    outlets: ["Lokmat Times", "Lokmat Samachar", "Punyanagari", "Deshonnati", "Navarashtra", "Lokmat"],
    clippings: [
      "s1-nisarg-baithak-23aug2026",
      "s1-nisarg-baithak-21aug2026-2",
      "s1-nisarg-baithak-aug2026",
      "s1-nisarg-baithak-24aug2026",
      "s1-nisarg-baithak-24aug2026-3",
      "s1-nisarg-baithak-24aug2026-2",
      "s1-nisarg-baithak-24aug2025",
      "s1-nisarg-baithak-21aug2026",
      "s1-nisarg-baithak-22aug2026",
    ],
  },
  {
    id: "nature-library",
    short: "Nature Library",
    title: "A Nature Library for children",
    summary: "Dainik Bhaskar's City Bhaskar featured the Nature Library, bringing nature books within children's reach.",
    date: "July 2026",
    sortKey: "2026-07-28",
    program: { slug: "nature-library", name: "Nature Library" },
    outlets: ["City Bhaskar"],
    clippings: ["nature-library-28jully2026"],
  },
  {
    id: "run-walk-clean",
    short: "Run Walk Clean",
    title: "Run Walk Clean at Seminary Hills",
    summary:
      "Morning walkers and runners cleared plastic from the Seminary Hills forest in a forest plogging drive.",
    date: "April 2026",
    sortKey: "2026-04-21",
    program: { slug: "run-walk-clean", name: "Run Walk Clean" },
    outlets: ["Nagpur Post", "Lokmat", "City Bhaskar", "Mahasagar", "Lokmat Samachar"],
    clippings: [
      "runwalkclean-21april2026-3",
      "runwalkclean-20april2026",
      "runwalkclean-21april2026-2",
      "runwalkclean-21april2026-4",
      "runwalkclean-21april2026",
      "runwalkclean-22april2026",
    ],
  },
  {
    id: "eco-steps-ambazari",
    short: "Eco Steps Dec",
    title: "Eco Steps nature walk at Ambazari Biodiversity Park",
    summary: "School children explored Ambazari Biodiversity Park to learn about local plants, birds and insects.",
    date: "December 2025",
    sortKey: "2025-12-24",
    program: { slug: "eco-steps", name: "Eco Steps" },
    outlets: ["Nagpur Post", "Navarashtra", "Deshonnati", "Lokmat"],
    clippings: [
      "eco-steps-24dec2025-2",
      "eco-steps-24dec2025",
      "eco-steps-23dec2025-2",
      "eco-steps-23dec2025",
      "eco-steps-26dec2025",
      "eco-steps-29dec2025",
      "eco-steps-30dec2025-2",
      "eco-steps-30dec2025",
    ],
  },
  {
    id: "jeevandhara-launch",
    short: "JeevanDhara",
    title: "JeevanDhara series launches in schools",
    summary:
      "The launch of JeevanDhara, Wild Agile's school program on wildlife and forests, drew an enthusiastic response from students and teachers.",
    date: "October 2025",
    sortKey: "2025-10-13",
    program: { slug: "jeevandhara", name: "JeevanDhara" },
    outlets: ["Nagpur Post", "Mahasagar", "Navarashtra", "Sakal", "Tarun Bharat"],
    clippings: [
      "jeevandhara-13oct2025-3",
      "jeevandhara-11oct2025",
      "jeevandhara-13oct2025-2",
      "jeevandhara-13oct2025",
      "jeevandhara-15oct2025-4",
      "jeevandhara-16oct2025-2",
      "jeevandhara-16oct2025",
    ],
  },
  {
    id: "eco-steps-june",
    short: "Eco Steps Jun",
    title: "Kids enjoy a nature walk with Eco Steps",
    summary: "Children spent a morning with nature on one of the first Eco Steps walks.",
    date: "June 2025",
    sortKey: "2025-06-03",
    program: { slug: "eco-steps", name: "Eco Steps" },
    outlets: ["Nagpur Post", "Navarashtra", "Deshonnati", "Tarun Bharat"],
    clippings: [
      "eco-steps-3june2025-3",
      "eco-steps-3june2025",
      "eco-steps-3-4june2025",
      "eco-steps-3june2025-2",
    ],
  },
];

export const MEDIA_CLIPPING_COUNT = MEDIA_STORIES.reduce((n, s) => n + s.clippings.length, 0);
export const MEDIA_OUTLETS = Array.from(new Set(MEDIA_STORIES.flatMap((s) => s.outlets))).sort();

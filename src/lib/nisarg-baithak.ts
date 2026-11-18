import nisargBaithakSession1Thumb from "@/assets/landingPage/NisargBaithak.thumb.webp";
import nisargBaithakSession2Thumb from "@/assets/landingPage/NisargBaithakSession2.thumb.webp";
import nisargBaithakTreeAct2Poster from "@/assets/landingPage/NisargBaithakTreeAct2.jpg";
import nisargBaithakTreeAct2Thumb from "@/assets/landingPage/NisargBaithakTreeAct2.thumb.webp";
import nisargBaithakTreeAct2Banner from "@/assets/landingPage/NisargBaithakTreeAct2-banner.jpg";

/*
 * CURRENT CAMPAIGN
 * The on-load banner, floating circle, home-page poster tile and "Full event details"
 * popup all read NISARG_BAITHAK_EVENT / _IMAGES / _BANNER / _BOOKING_URL below.
 * For the next campaign: replace these, move the end date, and mark the new session
 * in NISARG_BAITHAK_SESSIONS with isFeaturedEvent: true.
 */

/** Campaign promos hide after this instant (local time). */
export const NISARG_BAITHAK_CAMPAIGN_END = new Date(2026, 11, 6, 23, 59, 59, 999);

export const NISARG_BAITHAK_BOOKING_URL =
  "https://urbanaut.app/spot/maharashtra-tree-act-session-nisarg-baithak";

export type NisargBaithakPriceTier = {
  label: string;
  price: string;
  when: string;
  /** This tier applies from this instant (local time). */
  from?: Date;
};

/** Tree Act, Session 2 (online). Details from the session poster. */
export const NISARG_BAITHAK_EVENT = {
  shortLabel: "Tree Act · Session 2",
  sessionLabel: "Trees & the Law · Session 2",
  badge: "Nisarg Baithak · Now Online",
  title: "Nisarg Baithak – Trees Have Rights Too",
  topic: "Trees have rights too.",
  subtitle: "Understanding the Maharashtra Tree Act",
  dateLabel: "Sunday, 6 December 2026",
  timeLabel: "10:30 AM – 12:30 PM IST (2 hours)",
  whereLabel: "Live on Zoom",
  languages: "English · Hindi · Marathi",
  speakers: [{ name: "Adv. Krishna Agrawal", role: "Environmental law expert" }],
  intro: [
    "Nisarg Baithak is now online. Adv. Krishna Agrawal returns for a second session on the Maharashtra Tree Act, so you can join from anywhere.",
    "Find out which trees the law protects, what makes a tree a heritage tree, and what you can do when a tree near you is about to be cut, with time for your questions at the end.",
  ],
  learn: [
    "Is the tree on your street protected?",
    "Heritage trees & the \"age\" rule",
    "What to do when a tree is being cut",
    "How to file an objection + live Q&A",
  ],
  pricingTitle: "Contribution to Wild Agile Foundation",
  pricing: [
    { label: "Early bird", price: "₹199", when: "till 29 Nov" },
    { label: "Regular", price: "₹299", when: "30 Nov – 5 Dec", from: new Date(2026, 10, 30, 0, 0, 0) },
    { label: "Last chance", price: "₹399", when: "from Sat 9 pm", from: new Date(2026, 11, 5, 21, 0, 0) },
  ] as NisargBaithakPriceTier[],
  freeSeatsNote: "10 free seats for students & anyone who can't afford it. DM us.",
  bookingNote: "Book Now on Urbanaut · contribution from ₹199",
  asSeenOn: "As seen on DD News · GNT · Navarashtra · Lokshahi Varta · Deshonnati",
  closing:
    "Organised by Wild Agile Foundation. Nisarg Baithak is a platform for meaningful conversations on nature, wildlife, and the environment.",
} as const;

/** The price tier that applies right now (falls back to the first tier). */
export function getCurrentNisargBaithakPriceTier(now = new Date()) {
  const tiers = NISARG_BAITHAK_EVENT.pricing;
  let current = tiers[0];
  for (const tier of tiers) {
    if (tier.from && now.getTime() >= tier.from.getTime()) current = tier;
  }
  return current;
}

/** Portrait poster: floating circle, home-page tile, popup. */
export const NISARG_BAITHAK_IMAGES = [
  {
    src: nisargBaithakTreeAct2Poster,
    alt: "Nisarg Baithak online — Trees have rights too, Maharashtra Tree Act session with Adv. Krishna Agrawal",
  },
] as const;

/** Landscape banner shown at the top of the on-load promo. */
export const NISARG_BAITHAK_BANNER = {
  src: nisargBaithakTreeAct2Banner,
  alt: "Nisarg Baithak online: Trees have rights too. Sun, 6 Dec, 10:30 am, live on Zoom",
} as const;

/*
 * PAST CAMPAIGN DATA (kept for the session list)
 */

export const NISARG_BAITHAK_DIRECTIONS_URL =
  "https://www.google.com/maps?cid=8901769001520350487";

const RESCUE_BOOKING_URL =
  "https://urbanaut.app/spot/nisarg-baithak-session-2-from-rescue-to-freedom";

/** Wildlife Rescue, Session 1 (1 Nov 2026). Was the campaign before Tree Act Session 2. */
export const NISARG_BAITHAK_RESCUE_EVENT = {
  sessionLabel: "Session 02",
  title: "Nisarg Baithak – From Rescue to Freedom",
  topic: "From Rescue to Freedom",
  subtitle: "Wildlife Rescue Stories and the Science Behind It",
  tagline: "Because every wildlife rescue deserves a wild ending!",
  dateLabel: "Sunday, 1 November 2026",
  timeLabel: "10:00 AM – 12:00 PM (Morning)",
  venueLine:
    "Purva Vidharbha Mahila Parishad Hall, beside Vibgyour School, Burdi, Nagpur, opposite Metro Pillar No. 281",
  venueShort: "Purva Vidharbha Mahila Parishad Hall, Burdi, Nagpur",
  fullAddress:
    "Purva Vidharbha Mahila Parishad Hall, Beside Vibgyour School, Burdi, Nagpur, Pillar No. 282, Jhansi Rani Metro Station, Plot No. 103, N Ambazari Rd, Ramdaspeth, Nagpur, Maharashtra 440010, India",
  closingTagline: "Rescue is just the beginning. Freedom is the goal.",
  bookingNote: "Book Now & contribute ₹100 on Urbanaut",
  intro: [
    "What happens when a wild animal is injured, trapped, or found in distress? What goes into rescuing it safely? How do rescuers decide what to do next? And what does it really take for an animal to return to the wild?",
    "Behind every wildlife rescue is a story of urgency, difficult decisions, teamwork, and care. But what happens after the rescue is often a mystery to most of us.",
    "Join us for the second session of Nisarg Baithak, an initiative by Wild Agile Foundation, for a fascinating, behind-the-scenes look at wildlife rescue and rehabilitation with the people who do this work on the ground.",
  ],
  speakers: [
    {
      name: "Kundan Hate",
      role: "Founder, TTC Nagpur",
      bio: "As the founder of TTC Nagpur, Mr. Kundan Hate is involved in wildlife rescue and conservation efforts. Through his experiences with rescue operations in and around Nagpur, he brings a ground-level perspective on what it takes to respond when wild animals find themselves in trouble. From the challenges of reaching an animal in distress to the decisions that shape its journey towards recovery, his stories offer a glimpse into a world most of us rarely get to witness.",
    },
    {
      name: "Dr. Priyal Chauragade",
      role: "Veterinary Officer, TTC Nagpur",
      bio: "Wildlife rescue doesn't end when an animal is brought to safety. Veterinary assessment, treatment, recovery, and decisions about whether an animal is ready to return to its natural habitat are all crucial parts of the journey. Through her work with wildlife at TTC Nagpur, Dr. Priyal brings the veterinary perspective to this process—helping us understand the care, science, and considerations involved in giving rescued animals a chance at life in the wild.",
    },
  ],
  speakersOutro:
    "Together, Mr. Kundan Hate and Dr. Priyal will share experiences from wildlife rescue operations and help us look beyond the rescue itself to understand the fascinating process that follows.",
  expectations:
    "Expect real-world stories, insights from the field, and a closer look at the questions we don't usually get to ask about wildlife rescue.",
  explore: [
    {
      icon: "🐾",
      title: "Beyond the Rescue Call",
      description:
        "What happens when a rescue call comes in? How do teams respond, assess the situation, and approach an animal in distress?",
    },
    {
      icon: "🩺",
      title: "The Science of Saving Wildlife",
      description:
        "Discover what happens after rescue, including assessment, veterinary care, treatment, and recovery.",
    },
    {
      icon: "🌿",
      title: "The Road Back to the Wild",
      description:
        "Understand why releasing an animal is not always straightforward, what rehabilitation involves, and why returning to the wild is the ultimate goal.",
    },
  ],
  audience:
    "Whether you're a wildlife enthusiast, a student, a nature lover, an educator, or simply someone who has ever wondered what happens when a wild animal needs help, this session is for you.",
  invitation:
    "Come with your curiosity and questions. Leave with a deeper understanding of the people, knowledge, and effort behind wildlife rescue.",
  closing:
    "Join us at the second Nisarg Baithak to discover the stories, science, and human commitment behind every journey back to the wild.",
  included: ["Lecture", "Take Away Gift"],
  communityNote: [
    "Nisarg Baithak is a community initiative, and your contribution helps make it happen! PVMP has generously provided the venue, and your nominal contribution helps us cover event arrangements which includes a thoughtful take-home gift. It also helps us to anticipate the attending participants better and plan accordingly.",
    "Organised by Wild Agile Foundation in collaboration with PVMP and Green Nagpur. Nisarg Baithak is a platform for meaningful conversations on nature, wildlife, and the environment.",
  ],
} as const;

export type NisargBaithakGuest = {
  name: string;
  role: string;
};

/**
 * A topic (theme) that Nisarg Baithak returns to. Sessions are grouped by topic
 * on the program page, so a repeat of an earlier subject goes under the same topic.
 */
export type NisargBaithakTopic = {
  id: string;
  name: string;
  /** Show this topic first, with a gold border and slightly larger (e.g. during its campaign). */
  highlighted?: boolean;
  /** One line under the topic name. */
  tagline: string;
  /** A short paragraph on what the topic covers and why it matters. */
  description: string;
};

/** Every topic, in the order the filter chips should list them. Add new topics here. */
export const NISARG_BAITHAK_TOPICS: NisargBaithakTopic[] = [
  {
    id: "tree-act",
    name: "Trees & the Law",
    highlighted: true,
    tagline: "Before the axe falls, the law speaks.",
    description:
      "Every city tree is protected by law, yet most of us don't know how. These sessions unpack the Maharashtra Tree Act and related rules with legal experts: when a tree can and can't be cut, how permissions work, and what citizens can do when they see a tree in danger.",
  },
  {
    id: "wildlife-rescue",
    name: "Wildlife Rescue",
    tagline: "Because every wildlife rescue deserves a wild ending.",
    description:
      "Injured birds, snakes in homes, animals caught in the city's spread: rescue calls come in every day. These sessions bring rescuers and wildlife vets to share what happens on the ground, from the first call to treatment, rehabilitation and the journey back to the wild.",
  },
];

/**
 * Where a session happens.
 * - offline: in person at `venue` (optionally with `directionsUrl`).
 * - online: on `platform` (e.g. "Zoom", "Google Meet", "YouTube Live"); `joinUrl` is shown
 *   to visitors while the session is upcoming.
 */
export type NisargBaithakSessionMode = "offline" | "online";

export type NisargBaithakPhoto = {
  src: string;
  alt: string;
};

export type NisargBaithakReview = {
  quote: string;
  name: string;
  /** e.g. "Student", "Nature enthusiast". */
  role?: string;
};

export type NisargBaithakSession = {
  /** Unique, URL-safe id, e.g. "tree-act-2". */
  id: string;
  /**
   * Id from NISARG_BAITHAK_TOPICS. Sessions are numbered within their topic
   * automatically by date (Session 1, Session 2, …), so there is no number to set.
   */
  topicId: string;
  /** The session's own title (shown as the card heading). */
  topic: string;
  subtitle: string;
  tagline?: string;
  /** ISO date (YYYY-MM-DD), used to sort sessions and tell upcoming from past. */
  date: string;
  dateLabel: string;
  timeLabel: string;
  mode: NisargBaithakSessionMode;
  /** In-person sessions: hall / address shown on the card. */
  venue?: string;
  directionsUrl?: string;
  /** Online sessions: platform name and join link. */
  platform?: string;
  joinUrl?: string;
  /** Speakers can change from session to session, even within a topic. */
  guests: NisargBaithakGuest[];
  summary: string;
  poster: string;
  posterAlt: string;
  entryNote?: string;
  bookingUrl?: string;
  /** Session whose full details open in NisargBaithakEventDialog. */
  isFeaturedEvent?: boolean;
  /** Photos from the session (import them like the posters). Shown in the session popup. */
  photos?: NisargBaithakPhoto[];
  /** What attendees said. Shown in the session popup. */
  reviews?: NisargBaithakReview[];
};

/**
 * Every Nisarg Baithak session, oldest first. Add the next session at the end.
 * The page sorts them, puts upcoming ones on top, and groups past ones by topic.
 */
export const NISARG_BAITHAK_SESSIONS: NisargBaithakSession[] = [
  {
    id: "tree-act-1",
    topicId: "tree-act",
    topic: "Trees Have Rights Too",
    subtitle: "Understanding the Tree Act",
    tagline: "Before the axe falls, the law speaks.",
    date: "2026-08-22",
    dateLabel: "Saturday, 22 August 2026",
    timeLabel: "5:00 PM – 7:00 PM",
    mode: "offline",
    venue: NISARG_BAITHAK_RESCUE_EVENT.venueShort,
    directionsUrl: NISARG_BAITHAK_DIRECTIONS_URL,
    guests: [{ name: "Adv. Krishna Agrawal", role: "Environmental Lawyer" }],
    summary:
      "What protects a tree before it is cut? A session on the Tree Act with environmental lawyer Adv. Krishna Agrawal — what the law says about protecting trees, and how citizens can use it to speak up for the trees around them.",
    poster: nisargBaithakSession1Thumb,
    posterAlt: "Nisarg Baithak Session 01 poster — Trees Have Rights Too",
    entryNote: "Free entry",
    photos: [],
    reviews: [],
  },
  {
    id: "wildlife-rescue-1",
    topicId: "wildlife-rescue",
    topic: NISARG_BAITHAK_RESCUE_EVENT.topic,
    subtitle: NISARG_BAITHAK_RESCUE_EVENT.subtitle,
    tagline: NISARG_BAITHAK_RESCUE_EVENT.tagline,
    date: "2026-11-01",
    dateLabel: NISARG_BAITHAK_RESCUE_EVENT.dateLabel,
    timeLabel: NISARG_BAITHAK_RESCUE_EVENT.timeLabel,
    mode: "offline",
    venue: NISARG_BAITHAK_RESCUE_EVENT.venueShort,
    directionsUrl: NISARG_BAITHAK_DIRECTIONS_URL,
    guests: NISARG_BAITHAK_RESCUE_EVENT.speakers.map(({ name, role }) => ({ name, role })),
    summary: NISARG_BAITHAK_RESCUE_EVENT.expectations,
    poster: nisargBaithakSession2Thumb,
    posterAlt: "Nisarg Baithak Session 02 poster — From Rescue to Freedom",
    entryNote: NISARG_BAITHAK_RESCUE_EVENT.bookingNote,
    bookingUrl: RESCUE_BOOKING_URL,
    photos: [],
    reviews: [],
  },
  {
    id: "tree-act-2",
    topicId: "tree-act",
    topic: "Trees Have Rights Too",
    subtitle: NISARG_BAITHAK_EVENT.subtitle,
    date: "2026-12-06",
    dateLabel: NISARG_BAITHAK_EVENT.dateLabel,
    timeLabel: NISARG_BAITHAK_EVENT.timeLabel,
    mode: "online",
    platform: "Zoom",
    guests: NISARG_BAITHAK_EVENT.speakers.map(({ name, role }) => ({ name, role })),
    summary:
      "The second session on the Maharashtra Tree Act, now online: whether the tree on your street is protected, heritage trees and the \"age\" rule, what to do when a tree is being cut, and how to file an objection, with live Q&A. In English, Hindi and Marathi.",
    poster: nisargBaithakTreeAct2Thumb,
    posterAlt: "Nisarg Baithak Tree Act Session 2 poster — Trees have rights too, live on Zoom",
    entryNote: "Contribution ₹199–₹399 · 10 free seats for students",
    bookingUrl: NISARG_BAITHAK_BOOKING_URL,
    isFeaturedEvent: true,
    photos: [],
    reviews: [],
  },
];

export function getNisargBaithakTopic(topicId: string) {
  return NISARG_BAITHAK_TOPICS.find((t) => t.id === topicId);
}

/** "Session 1", "Session 2", … counted by date within the session's topic. */
export function getNisargBaithakSessionNumber(
  session: NisargBaithakSession,
  sessions: NisargBaithakSession[] = NISARG_BAITHAK_SESSIONS,
) {
  const sameTopic = sessions
    .filter((s) => s.topicId === session.topicId)
    .sort((a, b) => a.date.localeCompare(b.date));
  return sameTopic.findIndex((s) => s.id === session.id) + 1;
}

export function isNisargBaithakSessionUpcoming(session: NisargBaithakSession, now = new Date()) {
  const [year, month, day] = session.date.split("-").map(Number);
  const endOfSessionDay = new Date(year, month - 1, day, 23, 59, 59, 999);
  return now.getTime() <= endOfSessionDay.getTime();
}

export function isNisargBaithakCampaignActive(now = new Date()) {
  return now.getTime() <= NISARG_BAITHAK_CAMPAIGN_END.getTime();
}

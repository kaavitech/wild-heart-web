import nisargBaithakSession2 from "@/assets/landingPage/NisargBaithakSession2.png";
import nisargBaithakSession1Thumb from "@/assets/landingPage/NisargBaithak.thumb.webp";
import nisargBaithakSession2Thumb from "@/assets/landingPage/NisargBaithakSession2.thumb.webp";

/** Campaign promos hide after this instant (local time). */
export const NISARG_BAITHAK_CAMPAIGN_END = new Date(2026, 10, 1, 23, 59, 59, 999);

export const NISARG_BAITHAK_BOOKING_URL =
  "https://urbanaut.app/spot/nisarg-baithak-session-2-from-rescue-to-freedom";

export const NISARG_BAITHAK_DIRECTIONS_URL =
  "https://www.google.com/maps?cid=8901769001520350487";

export const NISARG_BAITHAK_EVENT = {
  sessionLabel: "Session 02",
  title: "Nisarg Baithak – From Rescue to Freedom",
  topic: "From Rescue to Freedom",
  subtitle: "Wildlife Rescue Stories and the Science Behind It",
  tagline: "Because every wildlife rescue deserves a wild ending!",
  dateLabel: "Sunday, 1 November 2026",
  timeLabel: "10:30 AM – 12:30 PM (Morning)",
  venueLine:
    "Purva Vidharbha Mahila Parishad Hall, beside Vibgyour School, Burdi, Nagpur, opposite Metro Pillar No. 281",
  venueShort: "Purva Vidharbha Mahila Parishad Hall, Burdi, Nagpur",
  fullAddress:
    "Purva Vidharbha Mahila Parishad Hall, Beside Vibgyour School, Burdi, Nagpur, Pillar No. 282, Jhansi Rani Metro Station, Plot No. 103, N Ambazari Rd, Ramdaspeth, Nagpur, Maharashtra 440010, India",
  closingTagline: "Rescue is just the beginning. Freedom is the goal.",
  bookingNote: "Tickets from ₹100 on Urbanaut",
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
} as const;

export const NISARG_BAITHAK_IMAGES = [
  {
    src: nisargBaithakSession2,
    alt: "Nisarg Baithak — From Rescue to Freedom",
  },
] as const;

export type NisargBaithakGuest = {
  name: string;
  role: string;
};

export type NisargBaithakSession = {
  sessionLabel: string;
  topic: string;
  subtitle: string;
  tagline?: string;
  /** ISO date (YYYY-MM-DD), used to sort sessions and tell upcoming from past. */
  date: string;
  dateLabel: string;
  timeLabel: string;
  venue: string;
  guests: NisargBaithakGuest[];
  summary: string;
  poster: string;
  posterAlt: string;
  entryNote?: string;
  bookingUrl?: string;
  /** Session whose full details open in NisargBaithakEventDialog. */
  isFeaturedEvent?: boolean;
};

/** Every Nisarg Baithak session, oldest first. Add the next session at the end. */
export const NISARG_BAITHAK_SESSIONS: NisargBaithakSession[] = [
  {
    sessionLabel: "Session 01",
    topic: "Trees Have Rights Too",
    subtitle: "Understanding the Tree Act",
    tagline: "Before the axe falls, the law speaks.",
    date: "2026-08-22",
    dateLabel: "Saturday, 22 August 2026",
    timeLabel: "5:00 PM – 7:00 PM",
    venue: NISARG_BAITHAK_EVENT.venueShort,
    guests: [{ name: "Adv. Krishna Agrawal", role: "Environmental Lawyer" }],
    summary:
      "What protects a tree before it is cut? A session on the Tree Act with environmental lawyer Adv. Krishna Agrawal — what the law says about protecting trees, and how citizens can use it to speak up for the trees around them.",
    poster: nisargBaithakSession1Thumb,
    posterAlt: "Nisarg Baithak Session 01 poster — Trees Have Rights Too",
    entryNote: "Free entry",
  },
  {
    sessionLabel: NISARG_BAITHAK_EVENT.sessionLabel,
    topic: NISARG_BAITHAK_EVENT.topic,
    subtitle: NISARG_BAITHAK_EVENT.subtitle,
    tagline: NISARG_BAITHAK_EVENT.tagline,
    date: "2026-11-01",
    dateLabel: NISARG_BAITHAK_EVENT.dateLabel,
    timeLabel: NISARG_BAITHAK_EVENT.timeLabel,
    venue: NISARG_BAITHAK_EVENT.venueShort,
    guests: NISARG_BAITHAK_EVENT.speakers.map(({ name, role }) => ({ name, role })),
    summary: NISARG_BAITHAK_EVENT.expectations,
    poster: nisargBaithakSession2Thumb,
    posterAlt: "Nisarg Baithak Session 02 poster — From Rescue to Freedom",
    entryNote: NISARG_BAITHAK_EVENT.bookingNote,
    bookingUrl: NISARG_BAITHAK_BOOKING_URL,
    isFeaturedEvent: true,
  },
];

export function isNisargBaithakSessionUpcoming(session: NisargBaithakSession, now = new Date()) {
  const [year, month, day] = session.date.split("-").map(Number);
  const endOfSessionDay = new Date(year, month - 1, day, 23, 59, 59, 999);
  return now.getTime() <= endOfSessionDay.getTime();
}

export function isNisargBaithakCampaignActive(now = new Date()) {
  return now.getTime() <= NISARG_BAITHAK_CAMPAIGN_END.getTime();
}

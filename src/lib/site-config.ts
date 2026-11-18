// One place for the foundation's public details. Change a value here and it
// updates the header, footer, contact page, policies and SEO tags together.

export const SITE_URL = "https://www.wildagile.com";
export const SITE_NAME = "Wild Agile Foundation";
/** Set to true once Brevo is set up (see src/routes/api.newsletter.ts). Until then the form shows "Coming soon...". */
export const NEWSLETTER_ENABLED = false;

export const DEFAULT_SHARE_IMAGE = "/media/share/wild-agile-share.jpg";

export const CONTACT = {
  email: "wildagile.foundation@gmail.com",
  phoneDisplay: "+91 73870 10538",
  phoneHref: "tel:+917387010538",
  whatsappDisplay: "+91 99701 75544",
  whatsappUrl: "https://wa.me/919970175544",
  address: {
    line1: "202, Durvang Enclave 1, Patil Layout",
    line2: "Swavalambi Nagar, Nagpur 440025",
    region: "Maharashtra, India",
    street: "202, Durvang Enclave 1, Plot No 1, Patil Layout, Swavalambi Nagar",
    locality: "Nagpur",
    postalCode: "440025",
    state: "Maharashtra",
    country: "IN",
  },
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Durvang+Enclave+Patil+Layout+Swavalambi+Nagar+Nagpur+440025",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Patil+Layout,+Swavalambi+Nagar,+Nagpur+440025&output=embed",
} as const;

export const SOCIAL_URLS = {
  instagram: "https://www.instagram.com/wildagile_foundation/",
  facebook: "https://www.facebook.com/profile.php?id=61576808158057",
  linkedin: "https://www.linkedin.com/in/wild-agile-foundation-262599367/",
} as const;

/** Income-tax registrations, from the Form 10AC orders (Jan 2026). */
export const REGISTRATION = {
  pan: "AAATW8598F",
  section12A: {
    number: "AAATW8598FE20251",
    date: "8 January 2026",
    validity: "AY 2026-27 to AY 2028-29",
  },
  section80G: {
    number: "AAATW8598FF20261",
    date: "23 January 2026",
    validity: "AY 2026-27 to AY 2028-29",
  },
} as const;

/** Builds the meta + link tags every page should have, with one consistent title. */
export function pageHead({
  title,
  description,
  path,
  image = DEFAULT_SHARE_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: imageUrl },
      { property: "og:site_name", content: SITE_NAME },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

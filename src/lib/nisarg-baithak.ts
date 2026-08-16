import nisargBaithak from "@/assets/landingPage/NisargBaithak.png";
import nisargBaithak2 from "@/assets/landingPage/NisargBaithak2.png";

export const NISARG_BAITHAK_CAMPAIGN_END = new Date(2026, 7, 22, 23, 59, 59, 999);

export const NISARG_BAITHAK_IMAGES = [
  { src: nisargBaithak, alt: "Nisarg Baithak" },
  { src: nisargBaithak2, alt: "Nisarg Baithak 2" },
] as const;

export function isNisargBaithakCampaignActive(now = new Date()) {
  return now.getTime() <= NISARG_BAITHAK_CAMPAIGN_END.getTime();
}

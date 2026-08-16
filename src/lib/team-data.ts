import prafulImage from "@/assets/team/praful.png";
import diptiImage from "@/assets/team/dipti.png";
import pratikImage from "@/assets/team/pratik.png";
import smrutiImage from "@/assets/team/smruti.png";

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  img: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Praful Deshmukh",
    role: "Founder & Chairman",
    bio: "A die-hard nature and wildlife enthusiast dedicating his life to giving back to the world. A seasoned Product Manager who has built IT products for leading global banks, his true passion lies in wildlife photography and conservation.",
    img: prafulImage,
  },
  {
    name: "Ar. Dipti Pande",
    role: "Secretary",
    bio: "A qualified conservation architect with a deep love for teaching, history, the Indian knowledge system, ancient Vedas, and culture. Her unparalleled passion for gardening speaks of her nurturing spirit and bond with nature.",
    img: diptiImage,
  },
  {
    name: "Pratik Mundhada",
    role: "Treasurer",
    bio: "A passionate civil engineer with global expertise in metro rail construction. A firm believer in living in harmony with nature, he blends technical excellence with deep environmental consciousness and financial stewardship.",
    img: pratikImage,
  },
  {
    name: "Smruti Chobitkar",
    role: "Lead — Media & Public Relations",
    bio: "A journalist by education and a committed environmentalist, Smruti leads our communication with sharp media acumen — shaping the outreach that carries our environmental movement forward.",
    img: smrutiImage,
  },
];

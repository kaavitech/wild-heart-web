import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { motion } from "framer-motion";
import prafulImage from "@/assets/team/praful.png";
import diptiImage from "@/assets/team/dipti.png";
import pratikImage from "@/assets/team/pratik.png";
import smrutiImage from "@/assets/team/smruti.png";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — Wild Agile Foundation" },
      { name: "description", content: "The people behind Wild Agile Foundation." },
      { property: "og:title", content: "Our Team — Wild Agile Foundation" },
      { property: "og:description", content: "Meet the people connecting children with nature." },
      { property: "og:image", content: prafulImage },
    ],
  }),
  component: TeamPage,
});

type Member = {
  name: string;
  role: string;
  bio: string;
  img: string;
};

const team: Member[] = [
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

function TeamPage() {
  return (
    <>
      <section className="relative pt-40 pb-16">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--gradient-leaf)]" />
        <div className="container-x">
          <SectionTitle
            eyebrow="Our Team"
            title={<>The hands and hearts behind the work.</>}
            subtitle="A small, devoted team — supported by volunteers, photographers, teachers and friends across the country."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} dir="up" delay={(i % 4) * 0.06}>
              <motion.div whileHover={{ y: -6 }} className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
                <div className="aspect-[4/5] w-full overflow-hidden bg-muted">
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-primary">{m.name}</h3>
                  <div className="text-xs uppercase tracking-[0.18em] text-secondary">{m.role}</div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">{m.bio}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

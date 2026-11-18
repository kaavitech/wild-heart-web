import { SectionTitle } from "@/components/site/SectionTitle";
import { Reveal } from "@/components/site/Reveal";

// Short video testimonials, compressed to 720p H.264 (about 2 MB each).
// They load only when someone presses play (preload="none").
// TODO: add each speaker's name and role (with their permission) in `who`.
export const TESTIMONIAL_VIDEOS = [
  {
    id: "testimonial-1",
    src: "/media/video/testimonial-1.mp4",
    poster: "/media/video/testimonial-1.poster.webp",
    who: "",
    context: "At a Wild Agile program",
  },
  {
    id: "testimonial-2",
    src: "/media/video/testimonial-2.mp4",
    poster: "/media/video/testimonial-2.poster.webp",
    who: "",
    context: "At a Wild Agile program",
  },
  {
    id: "testimonial-3",
    src: "/media/video/testimonial-3.mp4",
    poster: "/media/video/testimonial-3.poster.webp",
    who: "",
    context: "At the Transit Treatment Centre, Nagpur",
  },
] as const;

export function TestimonialVideos() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <SectionTitle
          align="center"
          eyebrow="Voices"
          title={<>In their own words.</>}
          subtitle="People who have joined our walks and sessions share what the experience meant to them."
        />
        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-auto sm:mt-12 sm:grid sm:max-w-5xl sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0">
          {TESTIMONIAL_VIDEOS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08} className="w-[68%] shrink-0 snap-center sm:w-auto">
              <figure className="card-media">
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={t.poster}
                  className="aspect-[9/16] w-full bg-black object-cover"
                >
                  <source src={t.src} type="video/mp4" />
                </video>
                <figcaption className="p-5">
                  {t.who && <div className="heading-card-sm text-primary">{t.who}</div>}
                  <div className="copy-card">{t.context}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

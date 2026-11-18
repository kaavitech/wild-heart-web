import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Newspaper } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ClippingViewer } from "@/components/site/ClippingViewer";
import {
  MEDIA_CLIPPING_COUNT,
  MEDIA_OUTLETS,
  MEDIA_STORIES,
  MEDIA_VIDEOS,
  clippingSrc,
  type MediaStory,
} from "@/lib/media-data";
import { pageHead } from "@/lib/site-config";
import { TESTIMONIAL_VIDEOS } from "@/components/site/TestimonialVideos";

// Talks first, then the testimonial videos from the home page "Voices" section.
const ALL_VIDEOS = [
  ...MEDIA_VIDEOS,
  ...TESTIMONIAL_VIDEOS.map((t) => ({
    id: t.id,
    title: t.who || "In their own words",
    summary: t.context,
    src: t.src,
    poster: t.poster,
  })),
];

export const Route = createFileRoute("/media")({
  head: () =>
    pageHead({
      title: "In the Media",
      description:
        "Newspaper coverage and talks about Wild Agile Foundation's work with children, forests and wildlife in Nagpur.",
      path: "/media",
      image: "/media/press/s2-nisargbaithak.webp",
    }),
  component: MediaPage,
});

function MediaPage() {
  const [story, setStory] = useState<MediaStory | null>(null);
  const [index, setIndex] = useState(0);
  const open = (s: MediaStory, i = 0) => {
    setStory(s);
    setIndex(i);
  };

  return (
    <>
      <section className="relative pt-36 pb-8">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--gradient-leaf)]" />
        <div className="container-x">
          <SectionTitle
            level="page"
            eyebrow="In the Media"
            title={<>What the papers &amp; people are saying.</>}
            subtitle={`${MEDIA_CLIPPING_COUNT} newspaper reports across ${MEDIA_OUTLETS.length} publications, in English, Hindi and Marathi. Tap any clipping to read it.`}
          />
        </div>
      </section>

      {ALL_VIDEOS.length > 0 && (
        <section className="pb-12">
          <div className="container-x">
            <h2 className="heading-sub text-primary">Videos</h2>
            <div className="mt-6 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {ALL_VIDEOS.map((v) => (
                <figure key={v.id} className="card-media">
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={v.poster}
                    className="aspect-[4/5] w-full bg-black object-cover"
                  >
                    <source src={v.src} type="video/mp4" />
                  </video>
                  <figcaption className="p-3">
                    <div className="font-serif text-base font-semibold leading-snug text-primary">{v.title}</div>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{v.summary}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border/60 pt-12 pb-24">
        <div className="container-x">
          <h2 className="heading-sub text-primary">In the papers</h2>
        </div>
        <div className="container-x mt-8 space-y-12">
          {MEDIA_STORIES.map((s) => (
            <article key={s.id} id={`story-${s.id}`} aria-labelledby={`story-title-${s.id}`}>
              <Reveal>
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <div className="eyebrow">{s.date}</div>
                    <h2 id={`story-title-${s.id}`} className="mt-2 heading-sub text-primary">
                      {s.title}
                    </h2>
                    <p className="text-body mt-3">{s.summary}</p>
                    <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground/60">
                      <Newspaper className="h-3.5 w-3.5" />
                      {s.outlets.join(" · ")}
                    </p>
                  </div>
                  {s.program && (
                    <Link
                      to="/programs/$slug"
                      params={{ slug: s.program.slug }}
                      className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-secondary hover:underline"
                    >
                      About {s.program.name} <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </Reveal>
              <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                {s.clippings.map((c, i) => (
                  <button
                    key={c}
                    onClick={() => open(s, i)}
                    className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-white shadow-[var(--shadow-soft)]"
                    aria-label={`Open clipping ${i + 1} of ${s.clippings.length}: ${s.title}`}
                  >
                    <img
                      src={clippingSrc(c).thumb}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <ClippingViewer story={story} index={index} onIndex={setIndex} onClose={() => setStory(null)} />
    </>
  );
}

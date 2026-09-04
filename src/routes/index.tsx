import { createFileRoute, Link } from "@tanstack/react-router";
import { site, heroVideo, services, gallery } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const title = "Flipaholics SA | Luxury Kitchen & Bathroom Renovations";
const description =
  "Book a consultation with Flipaholics SA — kitchen, bathroom and full-home flips for luxury living in Centurion and across South Africa.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    description: site.blurb,
    telephone: site.phoneDisplay,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rooihuiskraal North",
      addressLocality: "Centurion",
      addressRegion: "Gauteng",
      postalCode: "0157",
      addressCountry: "ZA",
    },
    sameAs: [site.instagram],
  };

  const teasers = gallery.filter((g) => g.type === "image").slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-foreground/70 via-foreground/45 to-foreground/85" />
        <div className="mx-auto flex min-h-[82vh] max-w-5xl flex-col items-center justify-center px-5 py-24 text-center">
          <p className="text-[0.6rem] uppercase tracking-[0.35em] text-background/70 sm:text-[0.65rem] sm:tracking-[0.45em]">
            {site.category} · Centurion, Gauteng
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] text-background sm:text-7xl">
            We flip space for <em className="gold-text italic">luxury</em> living
          </h1>
          <p className="script mt-4 text-5xl text-accent sm:text-7xl">{site.tagline}</p>
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-background/80">
            {site.blurb}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book"
              className="bg-accent px-9 py-4 text-xs uppercase tracking-[0.3em] text-accent-foreground transition-opacity hover:opacity-85"
            >
              Book a consultation
            </Link>
            <Link
              to="/work"
              className="border border-background/50 px-9 py-4 text-xs uppercase tracking-[0.3em] text-background transition-colors hover:border-accent hover:text-accent"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>

      {/* Studio teaser */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="script gold-text text-5xl">The studio</p>
            <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
              Renovations with an <em className="italic">obsessive</em> eye for finish
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-7">
            <p className="text-base leading-relaxed text-muted-foreground">
              From gutted shells to glowing kitchens, we design and build the rooms people
              gather in — layout, joinery, lighting, stone and styling, handled end to end.
            </p>
            <div className="gold-rule" />
            <ul className="flex flex-wrap gap-3">
              {services.map((s) => (
                <li
                  key={s}
                  className="border border-border px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em]"
                >
                  {s}
                </li>
              ))}
            </ul>
            <Link
              to="/studio"
              className="link-gold inline-block text-xs uppercase tracking-[0.3em]"
            >
              More about the studio
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Work teaser */}
      <section className="bg-foreground py-20 text-background">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mb-10 text-center">
            <p className="script text-5xl text-accent">Our work</p>
            <h2 className="mt-2 text-3xl font-medium sm:text-4xl">
              Recent <em className="italic">flips</em>
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {teasers.map((t, i) => (
              <Reveal key={t.src} delay={i * 100}>
                <Link to="/work" className="group block overflow-hidden">
                  <img
                    src={t.src}
                    alt={t.caption}
                    loading="lazy"
                    className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <p className="script mt-3 text-3xl text-accent">{t.title}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/work"
              className="inline-block border border-background/50 px-9 py-4 text-xs uppercase tracking-[0.3em] transition-colors hover:border-accent hover:text-accent"
            >
              View the full gallery
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <Reveal>
          <p className="script gold-text text-5xl">Let's begin</p>
          <h2 className="mt-2 text-3xl font-medium sm:text-4xl">
            Book your <em className="italic">consultation</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Tell us about the space and we'll come back with a date, a walkthrough and an
            honest scope.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              to="/book"
              className="bg-accent px-9 py-4 text-xs uppercase tracking-[0.3em] text-accent-foreground transition-opacity hover:opacity-85"
            >
              Book a consultation
            </Link>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="border border-foreground/30 px-9 py-4 text-xs uppercase tracking-[0.3em] transition-colors hover:border-accent hover:text-accent"
            >
              WhatsApp us
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}

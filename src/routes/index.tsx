import { createFileRoute } from "@tanstack/react-router";
import { site, logoUrl, heroVideo, services } from "@/lib/site";
import { Gallery } from "@/components/Gallery";
import { BookingForm } from "@/components/BookingForm";
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

const nav = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "Studio" },
  { href: "#book", label: "Book" },
  { href: "#contact", label: "Contact" },
];

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

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#top" className="flex items-center gap-3">
            <img src={logoUrl} alt="Flipaholics SA logo" className="h-11 w-auto mix-blend-multiply" />
            <span className="sr-only">{site.name}</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="link-gold text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#book"
            className="border border-accent bg-accent px-5 py-3 text-[0.65rem] uppercase tracking-[0.24em] text-accent-foreground transition-colors hover:bg-transparent hover:text-foreground"
          >
            Book a consultation
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative isolate overflow-hidden">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/90" />
        <div className="mx-auto flex min-h-[88vh] max-w-5xl flex-col items-center justify-center px-5 py-28 text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.45em] text-background/70">
            {site.category} · Centurion, Gauteng
          </p>
          <h1 className="mt-7 text-balance text-5xl font-medium leading-[1.05] text-background sm:text-7xl">
            We flip space for <em className="gold-text italic">luxury</em> living
          </h1>
          <p className="script mt-4 text-6xl text-accent sm:text-7xl">{site.tagline}</p>
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-background/80">{site.blurb}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#book"
              className="bg-accent px-9 py-4 text-xs uppercase tracking-[0.3em] text-accent-foreground transition-opacity hover:opacity-85"
            >
              Book a consultation
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="border border-background/50 px-9 py-4 text-xs uppercase tracking-[0.3em] text-background transition-colors hover:border-accent hover:text-accent"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="script gold-text text-5xl">The studio</p>
            <h2 className="mt-3 text-4xl font-medium leading-tight">
              Renovations with an <em className="italic">obsessive</em> eye for finish
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-7">
            <p className="text-base leading-relaxed text-muted-foreground">
              From gutted shells to glowing kitchens, we design and build the rooms people
              gather in. Every flip is handled end to end — layout, joinery, lighting,
              stone and styling — so the space you walk back into feels nothing like the
              one you left.
            </p>
            <div className="gold-rule" />
            <ul className="flex flex-wrap gap-3">
              {services.map((s) => (
                <li
                  key={s}
                  className="border border-border px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em] text-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
            <dl className="grid grid-cols-3 gap-6 pt-4">
              {[
                ["7 700+", "Followers"],
                ["98", "Projects shared"],
                ["SA", "Nationwide"],
              ].map(([big, small]) => (
                <div key={small}>
                  <dt className="text-3xl font-medium gold-text">{big}</dt>
                  <dd className="mt-1 text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                    {small}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="bg-foreground py-24 text-background">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mb-12 text-center">
            <p className="script text-5xl text-accent">Our work</p>
            <h2 className="mt-2 text-4xl font-medium">
              Recent <em className="italic">flips</em>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-background/70">
              Tap any piece to view it full screen.
            </p>
          </Reveal>
          <Gallery />
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="mx-auto max-w-4xl px-5 py-24">
        <Reveal className="mb-10 text-center">
          <p className="script gold-text text-5xl">Let's begin</p>
          <h2 className="mt-2 text-4xl font-medium">
            Book your <em className="italic">consultation</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Tell us about the space and we'll come back with a date, a walkthrough and an
            honest scope.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <BookingForm />
        </Reveal>
      </section>

      {/* Contact / footer */}
      <footer id="contact" className="bg-foreground text-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-3">
          <div>
            <div className="inline-block bg-background p-4">
              <img src={logoUrl} alt="Flipaholics SA logo" className="h-14 w-auto" />
            </div>
            <p className="script mt-5 text-4xl text-accent">{site.tagline}</p>
          </div>
          <div className="space-y-3 text-sm">
            <p className="text-[0.62rem] uppercase tracking-[0.3em] text-background/50">Visit</p>
            <p className="text-background/85">{site.address}</p>
            <p className="text-[0.62rem] uppercase tracking-[0.3em] text-background/50 pt-4">
              Follow
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="link-gold inline-block text-background/85"
            >
              {site.instagramHandle}
            </a>
          </div>
          <div className="space-y-3 text-sm">
            <p className="text-[0.62rem] uppercase tracking-[0.3em] text-background/50">Talk</p>
            <a href={`tel:${site.phoneTel}`} className="link-gold block text-background/85">
              {site.phoneDisplay}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="link-gold block text-background/85"
            >
              WhatsApp
            </a>
            <a href={`mailto:${site.email}`} className="link-gold block text-background/85">
              {site.email}
            </a>
          </div>
        </div>
        <div className="border-t border-background/15 py-6 text-center text-[0.62rem] uppercase tracking-[0.28em] text-background/45">
          © {new Date().getFullYear()} {site.name}
        </div>
      </footer>
    </div>
  );
}

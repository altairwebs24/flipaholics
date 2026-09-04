import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const title = "Contact Flipaholics SA | Centurion, Gauteng";
const description =
  "Call, WhatsApp or email Flipaholics SA in Rooihuiskraal North, Centurion — kitchen, bathroom and full-home renovations across South Africa.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const cards = [
    { label: "Call", value: site.phoneDisplay, href: `tel:${site.phoneTel}` },
    { label: "WhatsApp", value: "Chat with us", href: site.whatsapp },
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Instagram", value: site.instagramHandle, href: site.instagram },
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 py-20">
      <Reveal className="text-center">
        <p className="script gold-text text-5xl">Say hello</p>
        <h1 className="mt-2 text-4xl font-medium sm:text-5xl">
          Get in <em className="italic">touch</em>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          {site.address}
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-14 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group border border-border p-7 transition-colors hover:border-accent"
          >
            <p className="text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
              {c.label}
            </p>
            <p className="mt-3 text-lg text-foreground group-hover:text-accent">{c.value}</p>
          </a>
        ))}
      </Reveal>

      <Reveal delay={200} className="mt-16 border-t border-border pt-14 text-center">
        <p className="text-sm text-muted-foreground">
          Ready to start? Send us the details of your space.
        </p>
        <Link
          to="/book"
          className="mt-6 inline-block bg-accent px-9 py-4 text-xs uppercase tracking-[0.3em] text-accent-foreground transition-opacity hover:opacity-85"
        >
          Book a consultation
        </Link>
      </Reveal>
    </div>
  );
}

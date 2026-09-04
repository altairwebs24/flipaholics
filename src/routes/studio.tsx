import { createFileRoute, Link } from "@tanstack/react-router";
import { site, services } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const title = "The Studio | Flipaholics SA Kitchen & Bath Contractor";
const description =
  "Meet Flipaholics SA — a Centurion kitchen and bath contractor handling layout, joinery, lighting, stone and styling from gutted shell to finished flip.";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="script gold-text text-5xl">The studio</p>
          <h1 className="mt-3 text-4xl font-medium leading-tight sm:text-5xl">
            Renovations with an <em className="italic">obsessive</em> eye for finish
          </h1>
        </Reveal>
        <Reveal delay={120} className="space-y-7">
          <p className="text-base leading-relaxed text-muted-foreground">
            From gutted shells to glowing kitchens, we design and build the rooms people
            gather in. Every flip is handled end to end — layout, joinery, lighting, stone
            and styling — so the space you walk back into feels nothing like the one you
            left.
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
                <dt className="gold-text text-3xl font-medium">{big}</dt>
                <dd className="mt-1 text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {small}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Reveal className="mt-20 border-t border-border pt-14">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            ["01 · Consult", "We visit, listen and measure, then agree on an honest scope."],
            ["02 · Design", "Layouts, finishes and lighting are drawn up before a tool lifts."],
            ["03 · Build", "One team on site until the last handle is aligned."],
          ].map(([step, copy]) => (
            <div key={step}>
              <p className="text-[0.62rem] uppercase tracking-[0.3em] gold-text">{step}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-16 flex flex-wrap gap-4">
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
    </div>
  );
}

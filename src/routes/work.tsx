import { createFileRoute, Link } from "@tanstack/react-router";
import { Gallery } from "@/components/Gallery";
import { Reveal } from "@/components/Reveal";

const title = "Our Work | Flipaholics SA Renovation Gallery";
const description =
  "Walkthroughs and photography from recent Flipaholics SA flips — bespoke kitchens, wine cellars, cabinetry and lounges in Centurion and beyond.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal className="mb-12 text-center">
          <p className="script text-5xl text-accent">Our work</p>
          <h1 className="mt-2 text-4xl font-medium sm:text-5xl">
            Recent <em className="italic">flips</em>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm text-background/70">
            Tap any piece to view it full screen.
          </p>
        </Reveal>
        <Gallery />
        <div className="mt-16 text-center">
          <Link
            to="/book"
            className="inline-block bg-accent px-9 py-4 text-xs uppercase tracking-[0.3em] text-accent-foreground transition-opacity hover:opacity-85"
          >
            Book a consultation
          </Link>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { BookingForm } from "@/components/BookingForm";
import { Reveal } from "@/components/Reveal";

const title = "Book a Consultation | Flipaholics SA";
const description =
  "Request a renovation consultation with Flipaholics SA. Tell us about your kitchen, bathroom or full-home flip and we'll come back with a date and an honest scope.";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-20">
      <Reveal className="mb-10 text-center">
        <p className="script gold-text text-5xl">Let's begin</p>
        <h1 className="mt-2 text-4xl font-medium sm:text-5xl">
          Book your <em className="italic">consultation</em>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Tell us about the space and we'll come back with a date, a walkthrough and an
          honest scope.
        </p>
      </Reveal>
      <Reveal delay={100}>
        <BookingForm />
      </Reveal>
    </div>
  );
}

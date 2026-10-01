import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { site, services } from "@/lib/site";

const budgets = [
  "Under R50 000",
  "R50 000 – R150 000",
  "R150 000 – R400 000",
  "R400 000 +",
  "Not sure yet",
];

const fieldClass =
  "w-full border-b border-input bg-transparent px-1 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

const labelClass =
  "block text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground";

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [waLink, setWaLink] = useState<string>(site.whatsapp);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      full_name: String(data.get("full_name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      service: data.getAll("service").map(String).join(", "),
      preferred_date: String(data.get("preferred_date") ?? "") || null,
      area: String(data.get("area") ?? "").trim() || null,
      budget: String(data.get("budget") ?? "").trim() || null,
      message: String(data.get("message") ?? "").trim() || null,
    };

    if (!payload.full_name || !payload.email || !payload.phone || !payload.service) {
      setStatus("error");
      setError("Please complete your name, email, phone and at least one service.");
      return;
    }

    // Open the tab during the click so pop-up blockers allow it.
    const waWindow = window.open("", "_blank");
    setStatus("sending");
    setError("");
    const { error: insertError } = await supabase
      .from("consultation_bookings")
      .insert(payload);

    if (insertError) {
      waWindow?.close();
      setStatus("error");
      setError("We couldn't send that. Please try again or reach us on WhatsApp.");
      return;
    }

    const lines = [
      "Hi Flipaholics SA, I'd like to book a consultation.",
      `Name: ${payload.full_name}`,
      `Phone: ${payload.phone}`,
      `Email: ${payload.email}`,
      `Services: ${payload.service}`,
      payload.preferred_date ? `Preferred date: ${payload.preferred_date}` : "",
      payload.area ? `Area: ${payload.area}` : "",
      payload.budget ? `Budget: ${payload.budget}` : "",
      payload.message ? `Details: ${payload.message}` : "",
    ].filter(Boolean);
    const waUrl = `${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    setWaLink(waUrl);
    form.reset();
    setStatus("done");
    const win = waWindow ?? window.open(waUrl, "_blank");
    if (waWindow) waWindow.location.href = waUrl;
    if (!win) window.location.href = waUrl;
  }

  if (status === "done") {
    return (
      <div className="border border-accent/40 bg-card p-10 text-center">
        <p className="script gold-text text-6xl">Thank you</p>
        <h3 className="mt-3 text-2xl font-medium">Your consultation request is in</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          One of our designers will be in touch shortly to confirm your date. In a hurry?
          Carry on with us on WhatsApp.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="bg-accent px-7 py-3 text-xs uppercase tracking-[0.25em] text-accent-foreground transition-opacity hover:opacity-85"
          >
            Continue on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="border border-input px-7 py-3 text-xs uppercase tracking-[0.25em] transition-colors hover:border-accent"
          >
            Book another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-7 border border-border bg-card p-6 sm:grid-cols-2 sm:p-10"
    >
      <div>
        <label className={labelClass} htmlFor="full_name">
          Full name *
        </label>
        <input id="full_name" name="full_name" required className={fieldClass} placeholder="Your name" />
      </div>
      <div>
        <label className={labelClass} htmlFor="email">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={fieldClass}
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="phone">
          Phone / WhatsApp *
        </label>
        <input id="phone" name="phone" required className={fieldClass} placeholder="+27 ..." />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className={labelClass}>Services * (choose all that apply)</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {services.map((s) => (
            <label
              key={s}
              className="flex cursor-pointer items-center gap-2 border border-input px-3 py-2 text-sm transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/10"
            >
              <input type="checkbox" name="service" value={s} className="accent-[var(--gold)]" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label className={labelClass} htmlFor="preferred_date">
          Preferred date
        </label>
        <input id="preferred_date" name="preferred_date" type="date" className={fieldClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="budget">
          Budget range
        </label>
        <select id="budget" name="budget" defaultValue="" className={fieldClass}>
          <option value="">Select a range</option>
          {budgets.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor="area">
          Project address / area
        </label>
        <input id="area" name="area" className={fieldClass} placeholder="Suburb, city" />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor="message">
          Tell us about the space
        </label>
        <textarea id="message" name="message" rows={4} className={fieldClass} placeholder="Rooms, style, timeline..." />
      </div>

      {status === "error" ? (
        <p className="sm:col-span-2 text-sm text-destructive">{error}</p>
      ) : null}

      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-foreground px-9 py-4 text-xs uppercase tracking-[0.3em] text-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Request consultation"}
        </button>
        <span className="text-xs text-muted-foreground">
          Or WhatsApp us on{" "}
          <a href={site.whatsapp} target="_blank" rel="noreferrer" className="link-gold text-foreground">
            {site.phoneDisplay}
          </a>
        </span>
      </div>
    </form>
  );
}

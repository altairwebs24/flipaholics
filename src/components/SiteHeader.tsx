import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { site, logoUrl } from "@/lib/site";

const nav = [
  { to: "/work", label: "Work" },
  { to: "/studio", label: "Studio" },
  { to: "/book", label: "Book" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logoUrl} alt="Flipaholics SA logo" className="h-11 w-auto sm:h-12" />
          <span className="sr-only">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-foreground" }}
              className="link-gold text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/book"
          className="hidden border border-accent bg-accent px-5 py-3 text-[0.65rem] uppercase tracking-[0.24em] text-accent-foreground transition-colors hover:bg-transparent hover:text-foreground sm:inline-block"
        >
          Book a consultation
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-border md:hidden"
        >
          <span className="block h-px w-5 bg-foreground" />
          <span className="block h-px w-5 bg-foreground" />
          <span className="block h-px w-5 bg-foreground" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/70 bg-background px-5 py-4 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block py-3 text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/book"
            onClick={() => setOpen(false)}
            className="mt-3 block bg-accent px-5 py-3 text-center text-[0.65rem] uppercase tracking-[0.24em] text-accent-foreground"
          >
            Book a consultation
          </Link>
        </nav>
      )}
    </header>
  );
}

import { Link } from "@tanstack/react-router";
import { site, logoUrl } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-3">
        <div>
          <div className="inline-block bg-background p-4">
            <img src={logoUrl} alt="Flipaholics SA logo" className="h-14 w-auto" />
          </div>
          <p className="script mt-5 text-4xl text-accent">{site.tagline}</p>
          <nav className="mt-6 flex flex-wrap gap-4 text-[0.62rem] uppercase tracking-[0.28em] text-background/60">
            <Link to="/work" className="link-gold">
              Work
            </Link>
            <Link to="/studio" className="link-gold">
              Studio
            </Link>
            <Link to="/book" className="link-gold">
              Book
            </Link>
            <Link to="/contact" className="link-gold">
              Contact
            </Link>
          </nav>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-[0.62rem] uppercase tracking-[0.3em] text-background/50">Visit</p>
          <p className="text-background/85">{site.address}</p>
          <p className="pt-4 text-[0.62rem] uppercase tracking-[0.3em] text-background/50">
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
  );
}

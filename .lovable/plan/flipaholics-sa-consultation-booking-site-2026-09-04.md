# Flipaholics SA — Consultation Booking Site

A one-page luxury site for Flipaholics SA where visitors can browse real project work and book a renovation consultation.

## Brand and content (from the uploads)

- Logo: the gold roofline "FLIP AHOLICS SA — Addicted to flipping homes" mark, used in the header, hero and footer.
- Business: Kitchen & Bath Contractor. "Flipaholics SA specialises in flipping space for luxury living throughout South Africa."
- Location: Rooihuiskraal North, Centurion, Gauteng 0157
- WhatsApp / Call: +27 65 860 6236
- Email: flipaholicssa@gmail.com
- Instagram: @flipaholicssa
- The Instagram screenshots are reference only — never shown on the site.

## Media

The 4 uploaded photos and 3 uploaded videos are the only imagery. They are uploaded to the Lovable CDN so they load publicly on the deployed site (no login, no bundling of raw binaries).

- Hero: one video playing muted, looping, autoplay, with a black-to-transparent gold-tinted overlay.
- Gallery: a mixed grid of the remaining videos and the 4 photos (display cabinet, wine cabinet, blue-lit dining room, black-and-white lounge) with hover zoom and a click-to-enlarge lightbox.
- No AI-generated images anywhere.

## Design

- Palette: off-white paper, deep near-black, and gold (the exact gold of the logo) as the accent for rules, buttons, and dividers.
- Type: a high-contrast display serif for headings with italic accents on key words, a cursive script for short flourishes ("Addicted to flipping homes", section kickers), and a clean sans for body text — mixed for a fancy, editorial feel.
- Details: thin gold hairlines, generous spacing, subtle fade/rise on scroll, gold underline animations on links.

## Sections

1. Sticky header — logo, nav, gold "Book a consultation" button.
2. Hero — video background, script + serif headline, two CTAs (Book, WhatsApp).
3. About — short brand statement, service pills (Kitchens, Bathrooms, Walk-in closets, Full renovations).
4. Work — the video/photo gallery with lightbox.
5. Booking — the consultation form.
6. Contact / footer — address, phone, WhatsApp, email, Instagram, logo.

## Booking form

Fields: name, email, phone, service type, preferred date, project address/area, budget range, message. Submissions are saved to a Lovable Cloud database table so nothing is lost, with a success confirmation and a "continue on WhatsApp" shortcut. Validation on every field; the table is locked down so only the business can read submissions.

## Technical notes

- Media served via Lovable Assets CDN pointers (`.asset.json`), so files stay out of the repo but public at deploy time.
- Lovable Cloud enabled for the bookings table (insert-only for the public, RLS enforced).
- Fonts loaded via `<link>` in the root route head; colors and fonts registered as tokens in `src/styles.css` — no hardcoded color classes.
- Global CSS rule hiding `#lovable-badge` (`display: none !important`).
- Home page rebuilt at `/` with proper title, description, og/twitter tags and JSON-LD LocalBusiness markup.

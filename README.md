# Azira Jewels — Luxury Digital Visiting Card

A production Next.js site built to do exactly two things well: get a visitor
to **save the business contact** and **open a WhatsApp chat**, in one tap,
from a phone that just scanned a QR code.

Live data extracted from the physical visiting card is centralized in
**`src/data/business.ts`** — read that file's comments first. Every
assumption made where the card was silent (business hours, primary contact
number, placeholder domain) is flagged there and nowhere else, so correcting
one is a single edit.

---

## Assumptions made (please confirm)

The brief's own instructions were to infer reasonably where the card was
unclear and flag it — here's the complete list, all editable in
`src/data/business.ts`:

| Item | Assumption | Why |
|---|---|---|
| Brand name spelling | **Azira Jewels** (not "Jewells") | The card's own large logotype reads "Jewels"; the brief and the card's email address both use different spellings ("Jewells" / "jewellers"). Picked the one on the actual logo. |
| Tagline | "Fine Diamond & Gold Jewellery" | No tagline was printed on the card — this is a suggested line, not a real one. |
| Primary WhatsApp/Call number | Nitin Sahni's — `+91 99998 20060` | He's listed first/top on the card. Anuj Sahni's number is fully reachable throughout the site regardless — this only decides which number the *single* hero WhatsApp/Call buttons dial. |
| Business hours | Mon–Sat 11:00 AM–8:00 PM, Sun by appointment | Not printed on the card at all — a typical pattern for this kind of retailer. Please correct. |
| Website domain | `https://azirajewels.in` | No domain existed. Every metadata/OG/schema URL in the project derives from this one constant — update it once you have a real domain and everything else follows. |
| About paragraph | Restates only what's on the card (family-run, Karol Bagh, the four categories) | No "About us" copy existed anywhere in the source material. Deliberately avoids inventing a founding year, certifications, or history that can't be verified. Treat it as a first draft. |
| Postal code | 110005 | Card prints "Delhi-5" (old-style shorthand). |

---

## Why it's built this way

- **Two goals, not eleven.** The brief specifies its own structure (Hero →
  About → Services → Contact → Footer) built around exactly two conversions.
  A generic SaaS-landing-page template — testimonials, pricing, FAQ,
  countdown urgency — was deliberately *not* forced in. Fabricated
  testimonials or urgency tactics would be dishonest for a real local
  shop, and would dilute the two CTAs the brief prioritizes above
  everything else.
- **The hallmark.** Every piece of fine jewellery sold in India carries a
  hallmark stamp authenticating it. The "AJ" monogram is drawn the same way
  — engraved rings, compass punch-marks, a one-time light sweep — so the
  one recurring brand mark is specific to this business, not a generic gold
  badge. Section dividers use a small faceted-diamond glyph instead of a
  plain line or 01/02/03 numbering, since the four services aren't a
  sequence.
- **No idle pulsing on the CTAs.** A breathing/pulsing "Save Contact" button
  is a common pattern, and deliberately not used here — looping
  attention-seeking motion on a button ages badly and is a known
  accessibility anti-pattern. The buttons get an entrance animation, a
  press-scale, and a hover sheen instead.
- **Self-hosted fonts.** Bodoni Moda (display) and Jost (body) are bundled
  locally rather than loaded from Google's font CDN — one less third-party
  request, fully reproducible builds. Both are Google Fonts under the SIL
  Open Font License; the license text is in `/OFL`.
- **Maps and vCard need zero API keys.** The embedded map and directions
  link use the key-less `google.com/maps` query endpoint. The Save Contact
  button generates a real `.vcf` client-side (with Apple's contact-label
  extension so iPhone shows "Nitin Sahni" / "Anuj Sahni" / "Office" against
  each number) — no backend required for either core feature.

---

## Tech stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4
· Framer Motion · lucide-react · shadcn/ui-pattern components (hand-written,
not CLI-installed — themed from zero, nothing generic left in them)

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build     # production build — this project builds clean with
npm start         # zero type errors and zero lint warnings
```

## Project structure

```
src/
  app/
    layout.tsx          Metadata, fonts, JSON-LD (JewelryStore schema)
    page.tsx             Composes the five sections
    globals.css          Design tokens (@theme), base styles, reduced-motion
    manifest.ts          PWA manifest
    robots.ts / sitemap.ts
    icon.svg              Favicon (font-independent, renders everywhere)
    apple-icon.png         Generated from scripts/generate_logo.py
    opengraph-image.tsx    Dynamic OG/social preview image
    not-found.tsx
  components/
    sections/            Hero, About, Services, Contact, SiteFooter
    cta/                 SaveContactButton, WhatsAppButton, CallButton,
                         StickyCtaBar
    decorative/          Hallmark (signature mark), AmbientGlow, Reveal
                         (scroll-in wrapper), FacetDivider
    ui/                  Button (cva-based, shadcn pattern)
    providers.tsx        App-wide MotionConfig (reduced-motion handling)
  data/
    business.ts          ← single source of truth, read this first
  lib/
    vcard.ts             vCard 3.0 generator (Apple label extension, logo)
    whatsapp.ts           wa.me / tel: / mailto: link builders
    maps.ts               Key-less Google Maps embed + directions links
    fonts.ts               next/font/local setup
    utils.ts                cn() class merger
  fonts/                  Self-hosted Bodoni Moda + Jost (variable, .ttf)
public/
  logo.png, logo-512.png  Generated monogram, used for the vCard photo
                          and PWA icons
scripts/
  generate_logo.py        Regenerate the above two PNGs if the mark changes
OFL/                       Font license text (SIL OFL, as required)
```

## Deploying

The fastest path is Vercel, zero-config:

1. Push this folder to a GitHub repo.
2. Import it at [vercel.com/new](https://vercel.com/new) — it auto-detects
   Next.js, no settings needed.
3. Before going live, open `src/data/business.ts` and set `website` to your
   real domain (Vercel gives you one automatically, or attach a custom one
   under Project → Domains).
4. Re-deploy after that edit so the metadata/OG/JSON-LD URLs pick it up.

Any other Node host works too (`npm run build && npm start`), since nothing
here depends on Vercel-specific features.

## Before you consider this fully launched

- [ ] Confirm the assumptions table above, especially **business hours**
      and the **primary phone number**.
- [ ] Set the real **domain** in `src/data/business.ts`.
- [ ] Run the deployed URL through
      [PageSpeed Insights](https://pagespeed.web.dev/) — this project is
      built to the Core Web Vitals best practices (self-hosted fonts,
      static generation, minimal JS, no layout-shifting ads/embeds) but an
      actual Lighthouse score can only be measured against a live URL, not
      in a sandboxed build environment.
- [ ] If you have a real vector logo file from a designer, swap it into
      `Hallmark.tsx` / `icon.svg` / `generate_logo.py` — the current mark
      is a coded reconstruction of the card's monogram, not the original
      artwork.
- [ ] Generate a `favicon.ico` fallback if you need to support very old
      browsers/crawlers that ignore `icon.svg` (rare in 2026, but free
      insurance) — any online favicon generator can build one from
      `src/app/icon.svg`.

## Known platform limits (not bugs)

- **Android vCard saves download, then need one manual "open."** iOS
  Safari opens straight to "Add Contact." This is a platform difference in
  how each OS handles `.vcf` MIME types, not something a web page can
  change.
- **vCard PHOTO field support varies by contacts app.** Most modern
  clients (iOS Contacts, Google Contacts import) show it; a few strip it
  silently. The vCard is fully valid with or without it.

## Optimization notes already applied

Static generation for every route · self-hosted variable fonts with
`display: swap` and preloading · no client JS for anything that can be a
Server Component · a single small SVG/CSS icon set instead of raster image
assets for all decorative graphics · `prefers-reduced-motion` respected
globally (Framer Motion's `MotionConfig` plus a CSS-level fallback) ·
key-less Maps embed lazy-loaded so it doesn't block first paint.

## Future improvements (not built — out of scope for a v1 business card)

- Real product photography once available (a small gallery section would
  slot in above Contact without disturbing the two-CTA flow).
- A CMS or simple admin form if a non-developer needs to edit
  `business.ts`-equivalent content without touching code.
- WhatsApp Business API for automated first replies outside shop hours.
- Basic privacy-respecting analytics (e.g. Vercel Analytics or Plausible)
  to see how many visitors actually reach the Save Contact / WhatsApp taps
  — the whole point of the two-goal design.
- Hindi-language toggle, if walk-in customers would benefit from it.

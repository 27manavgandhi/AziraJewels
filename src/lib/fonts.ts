import localFont from "next/font/local";

/**
 * Both families are self-hosted (downloaded from the Google Fonts source
 * repository under the SIL Open Font License — see /OFL in the project
 * root) rather than loaded via next/font/google. Two reasons:
 *  1. Zero runtime request to Google's font CDN — one less origin, better
 *     for privacy and for the "no third-party render-blocking request"
 *     side of the Core Web Vitals budget.
 *  2. It keeps the build fully offline-reproducible.
 *
 * Bodoni Moda — a high-contrast Didone with real fashion-editorial
 * pedigree (the kind of type family that shows up on the mastheads of
 * fashion and jewellery print, not a generic "elegant serif" default).
 * Used with restraint, for the wordmark and section headings only.
 *
 * Jost — a geometric sans in the Futura/Kabel lineage. Clean at small
 * sizes on mobile, and its geometry pairs deliberately with Bodoni's
 * engraved, high-contrast strokes rather than competing with them.
 */

export const bodoniModa = localFont({
  src: [
    { path: "../fonts/BodoniModa-Variable.ttf", style: "normal" },
    { path: "../fonts/BodoniModa-Italic-Variable.ttf", style: "italic" },
  ],
  variable: "--font-bodoni",
  display: "swap",
  preload: true,
});

export const jost = localFont({
  src: [
    { path: "../fonts/Jost-Variable.ttf", style: "normal" },
    { path: "../fonts/Jost-Italic-Variable.ttf", style: "italic" },
  ],
  variable: "--font-jost",
  display: "swap",
  preload: true,
});

import { business } from "@/data/business";

/**
 * These use the key-less `maps.google.com` query and directions endpoints
 * rather than the Maps Embed/JavaScript APIs, so the site works with zero
 * Google Cloud configuration. See README for how to upgrade to the full
 * JS API (interactive pins, custom styling) if that's ever wanted.
 */

function getMapsQuery(): string {
  return encodeURIComponent(`${business.name}, ${business.fullAddress}`);
}

/** Iframe src for an embedded, no-API-key map centered on the address. */
export function getMapsEmbedSrc(): string {
  return `https://www.google.com/maps?q=${getMapsQuery()}&output=embed`;
}

/** Link that opens Google Maps (app or web) with turn-by-turn directions. */
export function getDirectionsLink(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${getMapsQuery()}`;
}

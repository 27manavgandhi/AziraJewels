/**
 * Single source of truth for every piece of business content on the site.
 *
 * Everything here was read directly off the physical visiting card except
 * where a comment says ASSUMPTION — those are reasonable placeholders per
 * the brief's own instruction to "intelligently infer... and clearly
 * mention assumptions." Change a value here and it updates everywhere:
 * the hero, the vCard file, the WhatsApp deep link, the JSON-LD schema,
 * and the metadata.
 */

export interface Owner {
  /** Full name as printed on the card. */
  name: string;
  /** E.164 format — required for tel:/WhatsApp/vCard links. */
  phone: string;
  /** Human-formatted for on-screen display. */
  displayPhone: string;
}

export interface BusinessHours {
  label: string;
  hours: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
}

export const business = {
  /** Exactly as it appears on the card's main logotype. */
  name: "Azira Jewels",

  // ASSUMPTION: the source master-prompt brief spells this "Azira Jewells"
  // and the card's own email address uses "azirajewellers" — but the large
  // gold logotype on the card itself reads "Azira Jewels" (single L, no
  // "-ers"), so that's treated as the canonical brand name throughout.

  /** No tagline was printed on the card — this is a suggested line. */
  tagline: "Fine Diamond & Gold Jewellery",

  /** Used for schema.org display copy — the JSON-LD @type is set separately. */
  category: "Jewellery Store",

  /** For <meta name="description"> and social previews. */
  shortDescription:
    "Certified diamond and gold jewellery in Karol Bagh, Delhi — diamonds, gold, solitaires and loose stones from a family-run house. Save our contact or start a WhatsApp chat in one tap.",

  // ASSUMPTION: no "About" copy existed anywhere on the source material.
  // This paragraph only restates what the card itself states (family-run,
  // Karol Bagh, the four listed categories) without inventing any specific
  // history, founding date, or claim that wasn't on the card. Treat it as
  // a first draft to personalize.
  aboutParagraph:
    "Azira Jewels is a diamond and gold jewellery house in Karol Bagh, run by the Sahni family. Every piece — from a single solitaire to a full set — is chosen and finished with care, so what you take home holds up to a closer look, today and years from now.",

  owners: [
    { name: "Nitin Sahni", phone: "+919999820060", displayPhone: "99998 20060" },
    { name: "Anuj Sahni", phone: "+919711496454", displayPhone: "97114 96454" },
  ] satisfies Owner[],

  /** Landline printed on the card. */
  landline: { raw: "+911147542724", display: "011-4754 2724" },

  email: "azirajewellers@gmail.com",

  // ASSUMPTION: no website or domain was on the card. Replace with the
  // real domain before deploying — every metadata/OG/schema URL below
  // derives from this one constant.
  website: "https://azirajewels.in",

  address: {
    line1: "3170, 1st Floor, Beadon Pura",
    line2: "Gali No. 33, Karol Bagh",
    city: "New Delhi",
    state: "Delhi",
    // ASSUMPTION: card prints "Delhi-5" — old-style Delhi postal shorthand
    // for PIN 110005.
    postalCode: "110005",
    country: "India",
    countryCode: "IN" as const,
  },

  /** Full postal address as one line, for maps links and JSON-LD fallback. */
  get fullAddress() {
    return `${this.address.line1}, ${this.address.line2}, ${this.address.city} ${this.address.postalCode}, ${this.address.country}`;
  },

  // ASSUMPTION: no business hours were printed on the card. Typical hours
  // for a Karol Bagh jewellery retailer — confirm and edit freely.
  hours: [
    { label: "Monday – Saturday", hours: "11:00 AM – 8:00 PM" },
    { label: "Sunday", hours: "By appointment" },
  ] satisfies BusinessHours[],

  services: [
    {
      id: "diamond",
      name: "Diamond Jewellery",
      description: "Certified diamonds set in designs built to carry their brilliance for generations.",
    },
    {
      id: "gold",
      name: "Gold Jewellery",
      description: "22K and 18K gold, crafted into pieces you'll want to wear — not just put away.",
    },
    {
      id: "solitaires",
      name: "Solitaires",
      description: "Single-stone settings, chosen for cut and clarity over size alone.",
    },
    {
      id: "loose-diamond",
      name: "Loose Diamond",
      description: "Loose, certified stones for custom settings and bespoke commissions.",
    },
  ] satisfies Service[],

  /**
   * The number used for the primary WhatsApp CTA and the "Call" button.
   * Both owners remain individually reachable further down the page —
   * this is only the single number the hero's large buttons point to.
   * ASSUMPTION: Nitin Sahni is used as the default since his name and
   * number are positioned first on the card. Swap this in one place if
   * that's wrong.
   */
  primaryPhone: "+919999820060",

  whatsapp: {
    phone: "+919999820060",
    message:
      "Hello Azira Jewels,\n\nI visited your digital business card and would like to know more about your jewellery collection.\n\nRegards.",
  },
} as const;

export type Business = typeof business;

import type { Metadata, Viewport } from "next";
import { bodoniModa, jost } from "@/lib/fonts";
import { business } from "@/data/business";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(business.website),
  title: {
    default: `${business.name} — ${business.tagline}`,
    template: `%s — ${business.name}`,
  },
  description: business.shortDescription,
  keywords: [
    "Azira Jewels",
    "diamond jewellery Karol Bagh",
    "gold jewellery Delhi",
    "solitaires Delhi",
    "loose diamonds Karol Bagh",
    "jewellery shop Karol Bagh Delhi",
  ],
  authors: [{ name: business.name }],
  creator: business.name,
  applicationName: business.name,
  openGraph: {
    type: "website",
    url: "/",
    siteName: business.name,
    title: `${business.name} — ${business.tagline}`,
    description: business.shortDescription,
    locale: "en_IN",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: business.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} — ${business.tagline}`,
    description: business.shortDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "shopping",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0b0b0b",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: business.name,
  image: `${business.website}/opengraph-image`,
  telephone: business.primaryPhone,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${business.address.line1}, ${business.address.line2}`,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.postalCode,
    addressCountry: business.address.countryCode,
  },
  url: business.website,
  priceRange: "₹₹₹",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "11:00",
      closes: "20:00",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(bodoniModa.variable, jost.variable)} suppressHydrationWarning>
      <body className="bg-ink font-body text-ivory antialiased">
        <script
          type="application/ld+json"
          // Static, build-time-only JSON we author ourselves — not user
          // input, so there's no injection surface here.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

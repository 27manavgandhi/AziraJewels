import { business } from "@/data/business";
import { getMailtoLink, getTelLink } from "@/lib/whatsapp";
import { Hallmark } from "@/components/decorative/hallmark";
import { SaveContactButton } from "@/components/cta/save-contact-button";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";

const NAV = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gold/10 bg-charcoal px-6 py-14">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <Hallmark size={48} animated={false} />
        <p className="mt-4 font-display text-xl text-ivory">{business.name}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.28em] text-gold/70">{business.tagline}</p>

        <nav className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ivory/65" aria-label="Footer">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors duration-200 hover:text-gold">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
          <SaveContactButton className="w-full" />
          <WhatsAppButton className="w-full" />
        </div>

        <p className="mt-8 text-xs text-mist">
          {business.address.line1}, {business.address.line2}, {business.address.city}{" "}
          {business.address.postalCode}
        </p>
        <p className="mt-1 text-xs text-mist">
          <a href={getTelLink(business.primaryPhone)} className="hover:text-gold">
            {business.owners[0]?.displayPhone}
          </a>
          {" · "}
          <a href={getMailtoLink()} className="hover:text-gold">
            {business.email}
          </a>
        </p>

        <div className="mt-8 w-full border-t border-gold/10 pt-6">
          <p className="text-xs text-mist/70">
            © {year} {business.name}. All rights reserved.
          </p>
          {/* Freelance credit line — easy to remove in a single line if the
              client agreement doesn't call for it. */}
          <p className="mt-1.5 text-xs text-mist/50">Designed &amp; developed by Manav Gandhi</p>
        </div>
      </div>
    </footer>
  );
}

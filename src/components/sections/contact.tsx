import { Phone, Mail, MapPin, Clock, Navigation } from "lucide-react";
import { business } from "@/data/business";
import { getTelLink, getMailtoLink } from "@/lib/whatsapp";
import { getMapsEmbedSrc, getDirectionsLink } from "@/lib/maps";
import { Reveal } from "@/components/decorative/reveal";
import { FacetDivider } from "@/components/decorative/facet-divider";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center justify-between gap-3 rounded-xl border border-gold/14 bg-charcoal/70 px-5 py-4 backdrop-blur-md transition-colors duration-200 hover:border-gold/35"
    >
      <span className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/50 text-gold">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="text-sm text-ivory/85">{label}</span>
      </span>
      <span className="max-w-[10.5rem] truncate text-sm font-medium text-gold/90">{value}</span>
    </a>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <Reveal>
            <FacetDivider className="mb-8" />
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-gold/75">
              Visit or Reach Us
            </p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">Get in Touch</h2>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-10 space-y-3">
          {business.owners.map((owner) => (
            <ContactRow
              key={owner.phone}
              icon={Phone}
              label={owner.name}
              value={owner.displayPhone}
              href={getTelLink(owner.phone)}
            />
          ))}
          <ContactRow
            icon={Phone}
            label="Office"
            value={business.landline.display}
            href={getTelLink(business.landline.raw)}
          />
          <ContactRow icon={Mail} label="Email" value={business.email} href={getMailtoLink()} />
        </Reveal>

        <Reveal delay={0.16} className="mt-4">
          <WhatsAppButton size="lg" className="w-full" />
        </Reveal>

        <Reveal delay={0.2} className="mt-8 rounded-2xl border border-gold/14 bg-charcoal/70 p-5 backdrop-blur-md sm:p-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/50 text-gold">
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm text-ivory/85">{business.address.line1}</p>
              <p className="text-sm text-ivory/85">{business.address.line2}</p>
              <p className="text-sm text-ivory/85">
                {business.address.city} {business.address.postalCode}
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-gold/10">
            <iframe
              src={getMapsEmbedSrc()}
              title={`${business.name} location map`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-52 w-full border-0 sm:h-64"
            />
          </div>

          <Button href={getDirectionsLink()} external variant="outline" size="sm" className="mt-4 w-full">
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Get Directions
          </Button>

          <div className="mt-6 flex items-start gap-3 border-t border-gold/10 pt-5">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/50 text-gold">
              <Clock className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="space-y-1">
              {business.hours.map((h) => (
                <p key={h.label} className="text-sm text-ivory/80">
                  <span className="text-ivory/55">{h.label}:</span> {h.hours}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { Phone, ChevronDown } from "lucide-react";
import { business } from "@/data/business";
import { getTelLink } from "@/lib/whatsapp";
import { Hallmark } from "@/components/decorative/hallmark";
import { AmbientGlow } from "@/components/decorative/ambient-glow";
import { Reveal } from "@/components/decorative/reveal";
import { SaveContactButton } from "@/components/cta/save-contact-button";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";
import { CallButton } from "@/components/cta/call-button";

export function Hero() {
  const firstOwnerFirstName = business.owners[0]?.name.split(" ")[0] ?? "Us";

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-10 pt-[max(2rem,env(safe-area-inset-top))] text-center"
    >
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center sm:max-w-md">
        <Reveal>
          <div className="relative mb-5 sm:mb-6">
            <AmbientGlow />
            <Hallmark size={64} className="relative z-10" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="flex flex-col items-center">
            <span className="font-display text-[2.5rem] leading-[1.05] text-ivory sm:text-5xl">
              {business.name}
            </span>
            <span className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.32em] text-gold/85 sm:text-xs">
              {business.tagline}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-4 text-sm text-mist">
            {business.owners.map((o) => o.name).join(" · ")}
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            {business.owners.map((owner) => (
              <a
                key={owner.phone}
                href={getTelLink(owner.phone)}
                className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-charcoal px-3.5 py-2 text-xs text-ivory/85 transition-colors duration-200 hover:border-gold/50 hover:text-gold"
              >
                <Phone className="h-3.5 w-3.5 text-gold/70" aria-hidden="true" />
                <span className="whitespace-nowrap">{owner.displayPhone}</span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mt-7 flex w-full flex-col gap-3 sm:mt-8">
          <SaveContactButton size="lg" className="w-full" />
          <WhatsAppButton size="lg" className="w-full" />
          <CallButton
            phone={business.primaryPhone}
            size="default"
            variant="outline"
            className="w-full"
            label={`Call ${firstOwnerFirstName}`}
          />
        </Reveal>
      </div>

      <Reveal delay={0.55} className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          aria-label="Scroll to learn more about Azira Jewels"
          className="flex flex-col items-center gap-1.5 text-mist/70 transition-colors duration-200 hover:text-gold"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.25em]">Discover</span>
          <ChevronDown className="h-4 w-4 animate-scroll-hint" aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  );
}

import { Gem, Sparkles, Star, Diamond, type LucideIcon } from "lucide-react";
import { business } from "@/data/business";
import { Reveal } from "@/components/decorative/reveal";
import { FacetDivider } from "@/components/decorative/facet-divider";

const ICONS: Record<string, LucideIcon> = {
  diamond: Gem,
  gold: Sparkles,
  solitaires: Star,
  "loose-diamond": Diamond,
};

export function Services() {
  return (
    <section id="services" className="relative px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Reveal>
            <FacetDivider className="mb-8" />
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-gold/75">
              Deals In
            </p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Crafted in Diamond &amp; Gold
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3.5 sm:mt-12 sm:gap-5">
          {business.services.map((service, i) => {
            const Icon = ICONS[service.id] ?? Gem;
            return (
              <Reveal key={service.id} delay={i * 0.06}>
                <div className="group relative h-full rounded-2xl border border-gold/12 bg-charcoal/50 p-5 transition-colors duration-300 hover:border-gold/35 sm:p-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-ink/40 text-gold transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-base text-ivory sm:text-lg">
                    {service.name}
                  </h3>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-mist sm:text-sm">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

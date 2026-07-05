import { business } from "@/data/business";
import { Reveal } from "@/components/decorative/reveal";
import { FacetDivider } from "@/components/decorative/facet-divider";

export function About() {
  return (
    <section id="about" className="relative px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <FacetDivider className="mb-8" />
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-gold/75">
            Karol Bagh, New Delhi
          </p>
          <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">The House of Azira</h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-8 rounded-2xl border border-gold/10 bg-charcoal/60 p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8"
        >
          <p className="text-[0.95rem] leading-relaxed text-ivory/80 sm:text-base">
            {business.aboutParagraph}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

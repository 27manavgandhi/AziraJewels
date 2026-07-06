import { cn } from "@/lib/utils";

/**
 * Hero-specific accent, layered on top of the global PageBackground.
 * Meant to be rendered as a child of a `relative` wrapper around just
 * the hallmark (see hero.tsx) — it centers on its immediate parent via
 * left/top 50% + translate, so it stays pixel-locked to the mark
 * regardless of viewport height.
 */
export function AmbientGlow({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 flex items-center justify-center", className)}
      aria-hidden="true"
    >
      {/* Bright, tight spotlight directly behind the hallmark */}
      <div className="absolute h-[240px] w-[240px] rounded-full bg-gold/25 blur-[55px] sm:h-[300px] sm:w-[300px]" />

      {/* Light rays, centered on the same point */}
      <div
        className="animate-ray-spin absolute h-[820px] w-[820px] max-h-[130vw] max-w-[130vw]"
        style={{
          backgroundImage:
            "repeating-conic-gradient(from 0deg, rgba(212,175,55,0.16) 0deg 2.2deg, transparent 2.2deg 18deg)",
          WebkitMaskImage: "radial-gradient(circle, black 6%, transparent 38%)",
          maskImage: "radial-gradient(circle, black 6%, transparent 38%)",
        }}
      />
    </div>
  );
}
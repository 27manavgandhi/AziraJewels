import { cn } from "@/lib/utils";

/**
 * Used between sections instead of a plain rule or 01/02/03 numbering —
 * the content here isn't a sequence, so numbering it would encode
 * information that isn't true. A small faceted outline (echoing a
 * diamond's table and crown facets) is specific to what this business
 * sells, and reads as a mark rather than decoration.
 */
export function FacetDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-4", className)}
      role="presentation"
      aria-hidden="true"
    >
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/40 sm:w-16" />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
        <path d="M8 1L15 8L8 15L1 8Z" stroke="var(--color-gold)" strokeOpacity="0.7" strokeWidth="1" />
        <path
          d="M8 1V15M1 8H15"
          stroke="var(--color-gold)"
          strokeOpacity="0.35"
          strokeWidth="0.75"
        />
      </svg>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/40 sm:w-16" />
    </div>
  );
}

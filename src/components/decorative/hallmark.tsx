"use client";

import { cn } from "@/lib/utils";

interface HallmarkProps {
  size?: number;
  className?: string;
  /** Plays a one-time light-sweep across the seal, as if catching light. */
  animated?: boolean;
}

/**
 * The site's one signature element. Every fine jewellery piece sold in
 * India carries a hallmark stamp — the small engraved mark that
 * authenticates purity and origin. Rendering the "AJ" monogram the same
 * way (engraved rings, punch-mark ticks at the compass points, a light
 * sweep that reads as catching a facet) ties the mark to what the
 * business actually does, rather than being a generic gold badge.
 *
 * Reused everywhere the brand mark appears — hero, footer, favicon-style
 * contexts — so it stays a single recognizable signature rather than a
 * one-off flourish.
 */
export function Hallmark({ size = 72, className, animated = true }: HallmarkProps) {
  return (
    <div
      className={cn("relative inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        role="img"
        aria-label="Azira Jewels hallmark"
      >
        <defs>
          <clipPath id="hallmark-clip">
            <circle cx="50" cy="50" r="46" />
          </clipPath>
          <linearGradient id="hallmark-sweep" x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.55" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle cx="50" cy="50" r="46" fill="var(--color-charcoal)" />
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="var(--color-gold)"
          strokeOpacity="0.75"
          strokeWidth="1.25"
        />
        <circle
          cx="50"
          cy="50"
          r="38.5"
          fill="none"
          stroke="var(--color-gold)"
          strokeOpacity="0.35"
          strokeWidth="0.75"
        />

        {/* Punch-mark ticks at the compass points, like an assay stamp. */}
        {[0, 90, 180, 270].map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="6.5"
            x2="50"
            y2="10.5"
            stroke="var(--color-gold)"
            strokeOpacity="0.6"
            strokeWidth="1"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}

        <text
          x="50"
          y="52"
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--color-gold)"
          fontSize="32"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
        >
          AJ
        </text>

        {animated && (
          <g clipPath="url(#hallmark-clip)" aria-hidden="true">
            <rect
              x="-30"
              y="-20"
              width="34"
              height="140"
              fill="url(#hallmark-sweep)"
              className="animate-sheen-sweep"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Starting vertical offset in pixels. */
  y?: number;
  as?: "div" | "li";
}

/**
 * Standard enter recipe: opacity + translateY + blur, spring with
 * bounce: 0 — a "materializing" feel rather than a flat fade, but calm
 * enough for production (Jakub-weighted). Triggers once per element via
 * whileInView so re-scrolling past a section doesn't replay it.
 */
export function Reveal({ children, className, delay = 0, y = 18, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ type: "spring", duration: 0.7, bounce: 0, delay }}
    >
      {children}
    </Component>
  );
}

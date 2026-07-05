"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` makes every Framer Motion animation in the app
 * automatically honor the OS-level prefers-reduced-motion setting —
 * one place to satisfy the "ships in the same code, no exceptions" rule
 * for every motion.* component, rather than checking it per component.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

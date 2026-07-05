"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Check, Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { downloadVCard } from "@/lib/vcard";

interface SaveContactButtonProps {
  label?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

const swapTransition = { duration: 0.18 };
const swapVariants = {
  initial: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
};

/**
 * The #1 CTA on the page. Icon swaps between idle / saving / saved states
 * — a functional confirmation that the tap registered, not decoration —
 * since a silent download is easy to miss on a phone.
 */
export function SaveContactButton({ label = "Save Contact", variant, size, className }: SaveContactButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  async function handleClick() {
    if (state !== "idle") return;
    setState("loading");
    try {
      await downloadVCard();
      setState("done");
    } catch {
      setState("idle");
      return;
    }
    setTimeout(() => setState("idle"), 2200);
  }

  return (
    <Button onClick={handleClick} variant={variant} size={size} className={className} aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        {state === "idle" && (
          <motion.span
            key="idle"
            className="inline-flex items-center gap-2.5"
            {...swapVariants}
            transition={swapTransition}
          >
            <Download className="h-[1.05em] w-[1.05em]" aria-hidden="true" />
            {label}
          </motion.span>
        )}
        {state === "loading" && (
          <motion.span
            key="loading"
            className="inline-flex items-center gap-2.5"
            {...swapVariants}
            transition={swapTransition}
          >
            <Loader2 className="h-[1.05em] w-[1.05em] animate-spin" aria-hidden="true" />
            Saving…
          </motion.span>
        )}
        {state === "done" && (
          <motion.span
            key="done"
            className="inline-flex items-center gap-2.5"
            {...swapVariants}
            transition={swapTransition}
          >
            <Check className="h-[1.05em] w-[1.05em]" aria-hidden="true" />
            Saved
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}

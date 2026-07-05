"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SaveContactButton } from "./save-contact-button";
import { WhatsAppButton } from "./whatsapp-button";

/**
 * Persistent bottom bar carrying the two primary actions once the hero's
 * own buttons have scrolled out of reach. Restricted to small viewports
 * (`sm:hidden`) — on desktop the hero CTAs stay comfortably in view and
 * a fixed bottom bar reads as a mobile pattern out of place on a wide
 * screen; this site's real audience is a phone that just scanned a QR
 * code, and desktop is explicitly the secondary case.
 *
 * Uses a small show/hide hysteresis gap so scroll position hovering near
 * one threshold doesn't flicker the bar in and out.
 */
export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    function evaluate() {
      const vh = window.innerHeight;
      const y = window.scrollY;
      setVisible((current) => {
        if (current) return y > vh * 0.45;
        return y > vh * 0.8;
      });
      ticking.current = false;
    }

    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(evaluate);
    }

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ type: "spring", duration: 0.45, bounce: 0 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/15 bg-ink/95 px-4 pt-3 backdrop-blur-md sm:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          role="region"
          aria-label="Quick actions"
        >
          <div className="flex gap-3">
            <SaveContactButton size="default" className="flex-1" />
            <WhatsAppButton size="default" className="flex-1" label="WhatsApp" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { cn } from "@/lib/utils";

/**
 * Slow, low-amplitude drifting glow — pure CSS, no JS, disabled entirely
 * under prefers-reduced-motion via the global rule in globals.css. This
 * is what keeps sections from reading as flat black; kept subtle enough
 * that it should never be the thing a visitor consciously notices.
 */
export function AmbientGlow({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="animate-drift-a absolute -top-1/3 left-[-15%] h-[70vw] max-h-[560px] w-[70vw] max-w-[560px] rounded-full bg-gold/[0.06] blur-3xl" />
      <div className="animate-drift-b absolute bottom-[-20%] right-[-15%] h-[60vw] max-h-[480px] w-[60vw] max-w-[480px] rounded-full bg-gold-deep/[0.12] blur-3xl" />
    </div>
  );
}

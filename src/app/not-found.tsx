import Link from "next/link";
import { business } from "@/data/business";
import { Hallmark } from "@/components/decorative/hallmark";
import { AmbientGlow } from "@/components/decorative/ambient-glow";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <AmbientGlow />
      <div className="relative z-10 flex flex-col items-center">
        <Hallmark size={56} animated={false} />
        <p className="mt-6 font-display text-6xl text-gold/90">404</p>
        <h1 className="mt-2 font-display text-2xl text-ivory">Page not found</h1>
        <p className="mt-2 max-w-xs text-sm text-mist">
          This page doesn&apos;t exist, but {business.name} is right where you left it.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-b from-gold-soft to-gold px-7 text-sm font-medium text-ink shadow-gold-glow transition-transform hover:brightness-105"
        >
          Back to the card
        </Link>
      </div>
    </main>
  );
}

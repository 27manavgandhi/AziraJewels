/**
 * One persistent, fixed layer behind the entire page — rendered once in
 * the root layout, not per-section — so depth continues as you scroll
 * instead of resetting at every section boundary. `position: fixed`
 * also means it's painted once and composited, not repainted on scroll.
 *
 * Layered back-to-front:
 *   1. base ink
 *   2. vignette (radial depth — the thing a flat bg-ink is missing)
 *   3. three slow-drifting gold glow fields (bigger/brighter than a
 *      "safe" first pass — this is the layer that was too subtle before)
 *   4. film-grain texture (mix-blend-mode: overlay) — the single
 *      highest-impact trick for making dark backgrounds read as premium
 *      material rather than flat digital black
 *   5. a scatter of tiny twinkling points — diamonds catching light,
 *      thematically literal for this business, not generic sparkle
 *
 * Everything here is decorative/non-interactive (aria-hidden) and fully
 * removed under prefers-reduced-motion via the global rule in
 * globals.css, so it never gates comprehension of anything.
 */

const SPARKLES = [
  { top: "9%", left: "14%", size: 3, delay: "0s", duration: "4.6s" },
  { top: "18%", left: "84%", size: 2, delay: "1.3s", duration: "5.3s" },
  { top: "34%", left: "6%", size: 2, delay: "2.6s", duration: "4.9s" },
  { top: "29%", left: "46%", size: 2, delay: "3.4s", duration: "5.8s" },
  { top: "52%", left: "92%", size: 3, delay: "0.7s", duration: "5.6s" },
  { top: "61%", left: "22%", size: 2, delay: "3.2s", duration: "4.3s" },
  { top: "74%", left: "68%", size: 2, delay: "1.9s", duration: "5.1s" },
  { top: "83%", left: "38%", size: 3, delay: "0.4s", duration: "5.5s" },
  { top: "92%", left: "80%", size: 2, delay: "2.2s", duration: "4.7s" },
];

export function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink" aria-hidden="true">
      {/* Vignette — top gold wash, lower-left amber wash, dark pull at the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 100% 60% at 50% -5%, rgba(212,175,55,0.16), transparent 60%)",
            "radial-gradient(ellipse 80% 55% at 12% 105%, rgba(143,112,31,0.20), transparent 65%)",
            "radial-gradient(ellipse 70% 50% at 100% 40%, rgba(212,175,55,0.08), transparent 60%)",
            "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 35%, rgba(0,0,0,0.6) 100%)",
          ].join(", "),
        }}
      />

      {/* Drifting glow fields */}
      <div className="animate-drift-a absolute -top-[12%] left-[-12%] h-[70vw] max-h-[640px] w-[70vw] max-w-[640px] rounded-full bg-gold/[0.16] blur-[90px]" />
      <div className="animate-drift-b absolute top-[38%] right-[-18%] h-[58vw] max-h-[560px] w-[58vw] max-w-[560px] rounded-full bg-gold-deep/[0.20] blur-[110px]" />
      <div className="animate-drift-c absolute bottom-[-18%] left-[8%] h-[54vw] max-h-[500px] w-[54vw] max-w-[500px] rounded-full bg-gold-soft/[0.12] blur-[110px]" />

      {/* Film grain — a self-contained inline SVG turbulence filter, not
          a raster asset, so there's no separate image file to ship */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Diamonds catching light */}
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-gold-soft"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
            boxShadow: "0 0 6px 1.5px rgba(233,208,142,0.85)",
          }}
        />
      ))}
    </div>
  );
}
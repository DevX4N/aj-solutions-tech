import { marqueeItems } from '../lib/site'

export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems]

  // Decorative, aria-hidden band — always scrolls (a gentle transform loop), so
  // it keeps moving even with iOS "Reduce Motion" on, per design intent.
  return (
    <section aria-hidden="true" className="relative border-y border-line bg-ink-900 py-6 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-900 to-transparent"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-900 to-transparent"
      />
      <div className="flex w-max items-center gap-10 animate-marquee">
        {row.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="font-display text-[15px] font-semibold uppercase tracking-[0.18em] text-chalk-dim">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-electric/70" />
          </div>
        ))}
      </div>
    </section>
  )
}

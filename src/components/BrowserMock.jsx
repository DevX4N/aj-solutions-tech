import { motion } from 'framer-motion'
import { Activity, TrendingUp } from 'lucide-react'

// Floating instrument-panel browser mockup — an authored preview of a site
// being built inside the studio, with a live performance gauge.
export default function BrowserMock({ reduce }) {
  const float = reduce
    ? {}
    : { animate: { y: [0, -12, 0] }, transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }

  return (
    <div className="relative mx-auto max-w-[520px]">
      {/* Corner ticks — technical drawing registration marks */}
      <CornerTicks />

      <motion.div {...float} className="relative">
        <div className="overflow-hidden rounded-2xl border border-line bg-ink-800 shadow-lift">
          {/* Chrome bar */}
          <div className="flex items-center gap-2 border-b border-line bg-ink-700/80 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <div className="ml-3 flex-1">
              <div className="flex items-center gap-2 rounded-md border border-line bg-ink px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                <span className="font-mono text-[10.5px] text-chalk-faint">suamarca.com.br</span>
              </div>
            </div>
          </div>

          {/* Rendered mini-landing */}
          <div className="relative bg-gradient-to-b from-ink-800 to-ink p-6">
            <div className="bp-grid-fine pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-16 rounded-full bg-white/20" />
                <div className="flex gap-2">
                  <div className="h-2 w-8 rounded-full bg-white/10" />
                  <div className="h-2 w-8 rounded-full bg-white/10" />
                  <div className="h-2 w-8 rounded-full bg-electric/70" />
                </div>
              </div>

              <div className="mt-7 space-y-2.5">
                <div className="h-4 w-4/5 rounded-md bg-chalk/85" />
                <div className="h-4 w-3/5 rounded-md bg-electric/80" />
              </div>
              <div className="mt-4 space-y-1.5">
                <div className="h-2 w-full rounded-full bg-white/10" />
                <div className="h-2 w-11/12 rounded-full bg-white/10" />
                <div className="h-2 w-2/3 rounded-full bg-white/10" />
              </div>

              <div className="mt-5 flex gap-2.5">
                <div className="h-8 w-28 rounded-full bg-electric shadow-[0_10px_24px_-10px_rgba(91,140,255,0.7)]" />
                <div className="h-8 w-20 rounded-full border border-line bg-white/[0.03]" />
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-lg border border-line bg-white/[0.02] p-2.5">
                    <div className="h-5 w-5 rounded-md bg-electric/25" />
                    <div className="mt-2 h-1.5 w-full rounded-full bg-white/12" />
                    <div className="mt-1 h-1.5 w-2/3 rounded-full bg-white/8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating performance gauge instrument */}
      <motion.div
        initial={reduce ? {} : { opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="absolute -left-6 bottom-8 hidden rounded-xl border border-line bg-ink-700/95 p-3.5 shadow-lift backdrop-blur-md sm:block"
      >
        <div className="flex items-center gap-3">
          <div className="relative grid h-11 w-11 place-items-center">
            <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90">
              <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
              <motion.circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="#5B8CFF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={113}
                initial={reduce ? { strokeDashoffset: 4 } : { strokeDashoffset: 113 }}
                whileInView={{ strokeDashoffset: 4 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <span className="font-mono text-[12px] font-semibold text-chalk">98</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-chalk">
              <Activity className="h-3.5 w-3.5 text-electric-bright" strokeWidth={2} />
              Performance
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-chalk-faint">
              Lighthouse
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating conversion tag */}
      <motion.div
        initial={reduce ? {} : { opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="absolute -right-4 top-10 hidden items-center gap-2 rounded-xl border border-line bg-ink-700/95 px-3.5 py-2.5 shadow-lift backdrop-blur-md sm:flex"
      >
        <TrendingUp className="h-4 w-4 text-electric-bright" strokeWidth={2} />
        <div>
          <div className="text-[12px] font-semibold text-chalk">Feito para converter</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-chalk-faint">
            UX estratégico
          </div>
        </div>
      </motion.div>

      {/* Overlapping mobile mockup — same site, responsive version */}
      <MobilePhone reduce={reduce} />
    </div>
  )
}

// Phone mockup overlapping the desktop browser's bottom-right corner: the same
// site rendered mobile-first, with unmistakable device signals (speaker + front
// camera, tall body, home indicator). Enters from the right, then floats.
function MobilePhone({ reduce }) {
  return (
    <motion.div
      initial={reduce ? {} : { opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-1 right-1 z-20 w-[116px] sm:-bottom-9 sm:-right-2 sm:w-[140px] lg:-bottom-[72px] lg:-right-4 lg:w-[166px]"
    >
      {/* Discreet blue glow + soft dark backdrop to lift the phone off the grid */}
      <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[44px] bg-electric/10 blur-xl" />
      <div className="pointer-events-none absolute inset-2 -z-10 rounded-[40px] bg-ink/50 blur-lg" />

      <motion.div
        style={{ rotate: 1.5 }}
        animate={reduce ? {} : { y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.7 }}
        className="relative rounded-[30px] border border-white/[0.14] bg-ink p-[5px] shadow-[0_30px_72px_-20px_rgba(0,0,0,0.9)]"
      >
        {/* Screen — tall smartphone aspect */}
        <div className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[24px] border border-white/[0.06] bg-gradient-to-b from-ink-800 to-ink">
          {/* Speaker + front camera */}
          <div className="absolute left-1/2 top-1.5 z-10 flex -translate-x-1/2 items-center gap-1.5">
            <span className="h-1 w-8 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25 ring-1 ring-white/10" />
          </div>

          <div className="flex flex-1 flex-col gap-2 p-2.5 pt-5">
            {/* header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-[4px] bg-electric" />
                <span className="h-1.5 w-6 rounded bg-white/25" />
              </div>
              <span className="h-1.5 w-3 rounded bg-white/12" />
            </div>
            {/* headline */}
            <div className="space-y-1 pt-0.5">
              <div className="h-1.5 w-full rounded bg-chalk/80" />
              <div className="h-1.5 w-5/6 rounded bg-chalk/80" />
              <div className="h-1.5 w-3/5 rounded bg-electric" />
            </div>
            {/* text */}
            <div className="space-y-1">
              <div className="h-1 w-full rounded bg-white/12" />
              <div className="h-1 w-4/5 rounded bg-white/12" />
            </div>
            {/* CTA */}
            <div className="h-4 w-16 rounded-full bg-electric shadow-[0_6px_16px_-6px_rgba(91,140,255,0.7)]" />
            {/* card */}
            <div className="h-9 rounded-lg border border-white/10 bg-white/[0.03]" />
            {/* stacked blocks */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-7 rounded-md border border-white/10 bg-white/[0.02]" />
              <div className="h-7 rounded-md border border-white/10 bg-white/[0.02]" />
            </div>
            {/* Home indicator */}
            <div className="mx-auto mt-auto h-1 w-10 rounded-full bg-white/25" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function CornerTicks() {
  const base = 'absolute h-4 w-4 border-electric/40'
  return (
    <>
      <span className={`${base} -left-2 -top-2 border-l border-t`} />
      <span className={`${base} -right-2 -top-2 border-r border-t`} />
      <span className={`${base} -left-2 -bottom-2 border-b border-l`} />
      <span className={`${base} -right-2 -bottom-2 border-b border-r`} />
    </>
  )
}

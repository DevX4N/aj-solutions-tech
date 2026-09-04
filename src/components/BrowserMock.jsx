import { m } from 'framer-motion'
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

      <m.div {...float} className="relative">
        <div className="overflow-hidden rounded-2xl border border-line bg-ink-800 shadow-lift">
          {/* Chrome bar */}
          <div className="flex items-center gap-2 border-b border-line bg-ink-700 px-4 py-3">
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
      </m.div>

      {/* Floating performance gauge instrument — drifts on its own 7s cadence
          for depth parallax against the phone (8s) and tag (9s). */}
      <m.div
        initial={reduce ? {} : { opacity: 0, scale: 0.9 }}
        animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 0.7, delay: 1 },
          scale: { duration: 0.7, delay: 1 },
          y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.8 },
        }}
        className="absolute -left-6 bottom-8 hidden rounded-xl border border-line bg-ink-700 p-3.5 shadow-lift sm:block"
      >
        <div className="flex items-center gap-3">
          <div className="relative grid h-11 w-11 place-items-center">
            <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90">
              <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
              <m.circle
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
      </m.div>

      {/* Floating conversion tag — slower 9s cadence, opposite phase to the
          gauge, so the composition breathes with real depth. */}
      <m.div
        initial={reduce ? {} : { opacity: 0, scale: 0.9 }}
        animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, 7, 0] }}
        transition={{
          opacity: { duration: 0.7, delay: 1.2 },
          scale: { duration: 0.7, delay: 1.2 },
          y: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 },
        }}
        className="absolute -right-4 top-10 hidden items-center gap-2 rounded-xl border border-line bg-ink-700 px-3.5 py-2.5 shadow-lift sm:flex"
      >
        <TrendingUp className="h-4 w-4 text-electric-bright" strokeWidth={2} />
        <div>
          <div className="text-[12px] font-semibold text-chalk">Feito para converter</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-chalk-faint">
            UX estratégico
          </div>
        </div>
      </m.div>

      {/* Overlapping mobile mockup — same site, responsive version (static) */}
      <MobilePhone />
    </div>
  )
}

// Phone mockup overlapping the desktop browser's bottom-right corner: the same
// site rendered mobile-first. FULLY STATIC — a fixed screenshot of the mobile
// site, no motion of any kind (no entrance, float, parallax, sheen or scroll).
// Content is intentionally large and high-contrast so it reads at a glance.
function MobilePhone() {
  return (
    <div className="absolute bottom-1 right-1 z-20 w-[116px] sm:-bottom-9 sm:-right-2 sm:w-[140px] lg:-bottom-[72px] lg:-right-4 lg:w-[166px]">
      {/* Discreet, controlled blue glow to seat the phone on the grid — tight
          radius and low opacity so it reads as depth, not a diffuse halo.
          Sits BEHIND the device (-z-10) and never touches the screen edge. */}
      <div className="pointer-events-none absolute -inset-1 -z-10 rounded-[36px] bg-electric/[0.07] blur-lg" />

      {/* Device — static, no animation. Axis-aligned for pixel-perfect edges;
          crisp frame, contained shadow. */}
      <div className="relative rounded-[30px] border border-white/[0.18] bg-ink p-[5px] shadow-[0_20px_44px_-24px_rgba(0,0,0,0.85)]">
        {/* Screen — tall smartphone aspect. Sharp, no blur, no overlay. */}
        <div className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[24px] border border-white/[0.10] bg-gradient-to-b from-ink-800 to-ink">
          {/* Speaker + front camera */}
          <div className="absolute left-1/2 top-2 z-20 flex -translate-x-1/2 items-center gap-1.5">
            <span className="h-1 w-9 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25 ring-1 ring-white/10" />
          </div>

          {/* Faint blueprint texture — mirrors the desktop render (static, subtle) */}
          <div className="bp-grid-fine pointer-events-none absolute inset-0 opacity-25" />

          <div className="relative flex flex-1 flex-col px-3 pt-[22px]">
            {/* Compact mobile header — brand mark + wordmark + menu */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="grid h-4 w-4 place-items-center overflow-hidden rounded-[4px] border border-white/10 bg-ink-700">
                  <img
                    src="/brand/aj-marca-A-branco-512-transparente.png"
                    alt=""
                    aria-hidden="true"
                    className="h-3 w-3 object-contain"
                  />
                </span>
                <span className="text-[8.5px] font-semibold leading-none tracking-tight text-white">
                  AJ Solutions<span className="text-chalk-faint"> Tech</span>
                </span>
              </div>
              <div className="space-y-[3px]">
                <span className="block h-[1.5px] w-3.5 rounded-full bg-white/70" />
                <span className="block h-[1.5px] w-3.5 rounded-full bg-white/70" />
              </div>
            </div>

            {/* Hero — the primary piece: big title, short description, buttons.
                Natural height (no stretch) so the page ends above the safe area. */}
            <div className="flex flex-col pt-2.5">
              <h3 className="text-[12.5px] font-extrabold leading-[1.08] tracking-tight text-white">
                Sites que transformam ideias em{' '}
                <span className="text-electric-bright">experiências digitais.</span>
              </h3>

              <p className="mt-2 text-[8.5px] font-medium leading-[1.45] text-chalk-dim">
                Sites modernos, rápidos e feitos para converter.
              </p>

              <div className="mt-2.5 flex flex-col gap-1.5">
                <span className="rounded-full bg-electric py-[6px] text-center text-[8.5px] font-semibold leading-none text-white shadow-[0_8px_18px_-8px_rgba(91,140,255,0.9)]">
                  Solicitar orçamento
                </span>
                {/* On the real mobile viewport the phone mockup is shortest —
                    hide this secondary button there so the content clears the
                    device's gesture bar. Shown from sm+ where there's room. */}
                <span className="hidden rounded-full border border-white/20 py-[6px] text-center text-[8.5px] font-medium leading-none text-white sm:block">
                  Ver projetos
                </span>
              </div>

              {/* Two priority services — larger, high-contrast cards. Hidden on
                  the real mobile viewport (below sm), where the mini-phone is
                  shortest: dropping them lets the content end above the device's
                  gesture bar instead of overflowing and clipping it. */}
              <div className="mt-2.5 hidden flex-col gap-1.5 sm:flex">
                {[
                  { t: 'Landing Pages', m: 'Conversão' },
                  { t: 'Sites Institucionais', m: 'Presença' },
                ].map(({ t, m }) => (
                  <div
                    key={t}
                    className="flex items-center gap-2 rounded-lg border border-white/[0.14] bg-white/[0.04] px-2.5 py-[7px]"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-electric shadow-[0_0_8px_0_rgba(91,140,255,0.8)]" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[9px] font-semibold leading-none text-white">{t}</div>
                      <div className="mt-[3px] text-[6.5px] font-medium uppercase tracking-[0.16em] text-electric-bright">
                        {m}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom safe area (iOS-style) — reserved breathing room that keeps
                the page content clear of the device edge, with a discreet,
                low-contrast gesture bar centered inside it. */}
            <div className="mt-auto flex h-[10%] shrink-0 items-end justify-center pb-1.5">
              <div className="h-[3px] w-11 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
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

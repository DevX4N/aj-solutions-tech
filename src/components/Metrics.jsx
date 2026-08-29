import { metrics } from '../lib/site'
import { Counter, Reveal } from './primitives'

// The four brief-defined delivery standards, framed as an instrument-panel
// readout (measured baseline, spec labels) rather than a big-number stat grid.
export default function Metrics() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-800/70 px-6 py-9 sm:px-10 sm:py-11">
            <div className="bp-grid-fine pointer-events-none absolute inset-0 opacity-25" />

            <div className="relative flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
              <div className="max-w-sm">
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.15rem)] font-bold leading-[1.08] tracking-tighter text-chalk text-balance">
                  Padrões que todo projeto entrega.
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-chalk-dim">
                  Não são promessas de marketing — são o mínimo que cada site sai da nossa mesa
                  cumprindo.
                </p>
              </div>

              {/* Instrument readout */}
              <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 lg:max-w-2xl">
                {metrics.map((m) => (
                  <div key={m.label} className="relative">
                    {/* measured baseline + tick */}
                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-2 w-px bg-electric/60" />
                      <span className="h-px flex-1 bg-line" />
                    </div>
                    <div
                      className={`font-display font-bold leading-[1.05] tracking-tight ${
                        m.value.length > 9
                          ? 'text-[clamp(1rem,1.4vw,1.3rem)]'
                          : 'text-[clamp(1.6rem,2.6vw,2.15rem)]'
                      } ${m.value.startsWith('+') || m.kind === 'percent' ? 'text-electric-bright' : 'text-chalk'}`}
                    >
                      {m.kind === 'percent' ? <Counter to={m.target} suffix="%" /> : m.value}
                    </div>
                    <p className="mt-2 text-[12.5px] leading-snug text-chalk-faint">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

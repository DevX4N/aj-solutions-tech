import { pillars } from '../lib/site'
import { Reveal, SectionMark } from './primitives'

export default function Pillars() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          {/* Left — statement */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionMark id="/ 01">Por que importa</SectionMark>
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.1rem)] font-bold leading-[1.02] tracking-tighter text-chalk text-balance">
              Seu site precisa fazer mais do que existir.
            </h2>
            <p className="mt-6 max-w-md text-pretty text-[16.5px] leading-relaxed text-chalk-dim">
              Um bom site precisa transmitir confiança, apresentar seu valor, facilitar a decisão
              do cliente e transformar interesse em oportunidade.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-4 py-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-chalk-faint">
                Sem templates genéricos
              </span>
              <span className="h-4 w-px bg-line" />
              <span className="text-[13px] text-chalk-dim">Cada projeto é pensado para a sua marca</span>
            </div>
          </div>

          {/* Right — pillars as editorial rows */}
          <div className="divide-y divide-line border-t border-line">
            {pillars.map((p, i) => (
              <Reveal key={p.index} delay={i * 0.06}>
                <div className="group flex items-start gap-6 py-7 transition-colors duration-300">
                  <span className="font-mono text-[13px] font-medium text-chalk-faint pt-1 transition-colors duration-300 group-hover:text-electric-bright">
                    {p.index}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-[21px] font-semibold tracking-tight text-chalk sm:text-[23px]">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-[15.5px] leading-relaxed text-chalk-dim">
                      {p.body}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-1 h-8 w-8 shrink-0 rounded-lg border border-line transition-all duration-300 group-hover:border-electric/50 group-hover:bg-electric/10"
                    style={{ transitionProperty: 'border-color, background-color' }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

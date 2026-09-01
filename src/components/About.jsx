import { Reveal, SectionMark } from './primitives'

export default function About() {
  return (
    <section id="sobre" className="relative py-24 sm:py-28">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <SectionMark id="/ 06">Sobre</SectionMark>
            <h2 className="max-w-2xl font-display text-[clamp(2rem,4.4vw,3.2rem)] font-bold leading-[1.04] tracking-tighter text-chalk text-balance">
              Tecnologia com propósito.{' '}
              <span className="text-chalk-faint">Design com estratégia.</span>
            </h2>

            <div className="mt-9 max-w-xl space-y-5 text-[17px] leading-relaxed text-chalk-dim">
              <p>
                A AJ Solutions Tech nasceu com o objetivo de ajudar empresas e profissionais a
                construírem uma presença digital mais forte.
              </p>
              <p>
                Unimos <Mark>design</Mark>, <Mark>tecnologia</Mark> e <Mark>estratégia</Mark> para
                criar sites que não apenas chamam atenção, mas comunicam valor e ajudam negócios a
                crescer.
              </p>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-1 gap-3 min-[480px]:grid-cols-3 sm:gap-4">
              {[
                ['Design', 'interfaces com identidade'],
                ['Tecnologia', 'código moderno e leve'],
                ['Estratégia', 'foco em resultado'],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl border border-line bg-white/[0.02] p-4">
                  <div className="font-display text-[15px] font-semibold text-chalk">{t}</div>
                  <div className="mt-1 text-[12.5px] leading-snug text-chalk-faint">{d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Abstract technical composition */}
          <Reveal delay={0.1}>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-ink-800">
              <div className="bp-grid pointer-events-none absolute inset-0 opacity-60" />
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64"
                style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(91,140,255,0.16), transparent 70%)' }}
              />
              <div
                className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64"
                style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(139,108,255,0.16), transparent 70%)' }}
              />

              {/* orbiting rings */}
              <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <circle cx="200" cy="200" r="60" fill="none" stroke="rgba(255,255,255,0.08)" />
                <circle cx="200" cy="200" r="110" fill="none" stroke="rgba(255,255,255,0.06)" />
                <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(255,255,255,0.04)" />
                <circle cx="200" cy="140" r="4" fill="#5B8CFF" />
                <circle cx="310" cy="200" r="3" fill="#8B6CFF" />
                <circle cx="200" cy="360" r="3" fill="#43E6FF" />
              </svg>

              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="font-display text-[clamp(3rem,7vw,4.5rem)] font-extrabold leading-none tracking-tightest text-chalk">
                    AJ
                  </div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.28em] text-electric-bright">
                    Solutions Tech
                  </div>
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-chalk-faint">
                <span>design</span>
                <span>·</span>
                <span>código</span>
                <span>·</span>
                <span>estratégia</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Mark({ children }) {
  return <span className="font-semibold text-chalk">{children}</span>
}

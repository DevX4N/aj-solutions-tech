import { Check } from 'lucide-react'
import { differentials } from '../lib/site'
import { Reveal, SectionMark, Stagger, StaggerItem } from './primitives'

export default function Differentials() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-900 py-24 sm:py-28">
      <div className="bp-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/[0.06] blur-[130px]" />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionMark id="/ 05">Diferenciais</SectionMark>
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.2rem)] font-bold leading-[1.02] tracking-tighter text-chalk text-balance">
              Por que escolher a AJ Solutions&nbsp;Tech?
            </h2>
            <p className="mt-6 max-w-md text-pretty text-[16.5px] leading-relaxed text-chalk-dim">
              Não entregamos apenas um site bonito. Entregamos uma peça pensada para representar sua
              marca e trabalhar pela sua empresa todos os dias.
            </p>
            <Reveal delay={0.1}>
              <div className="mt-10 flex items-end gap-4">
                <span className="font-display text-[clamp(4rem,9vw,7rem)] font-extrabold leading-none tracking-tightest text-outline">
                  08
                </span>
                <span className="mb-3 max-w-[10rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-chalk-faint">
                  motivos para começar seu projeto com a gente
                </span>
              </div>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 gap-x-8 border-t border-line sm:grid-cols-2">
            {differentials.map((d) => (
              <StaggerItem
                key={d}
                className="group flex items-center gap-4 border-b border-line py-5"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-electric-bright transition-all duration-300 group-hover:border-electric/50 group-hover:bg-electric group-hover:text-ink">
                  <Check className="h-4 w-4" strokeWidth={2.4} />
                </span>
                <span className="font-display text-[17px] font-medium tracking-tight text-chalk sm:text-[18px]">
                  {d}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}

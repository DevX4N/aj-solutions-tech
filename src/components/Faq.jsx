import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { faqs, whatsappHref } from '../lib/site'
import { SectionMark } from './primitives'

export default function Faq() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(0)

  return (
    <section className="relative py-24 sm:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionMark id="/ 08">FAQ</SectionMark>
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.1rem)] font-bold leading-[1.03] tracking-tighter text-chalk text-balance">
              Dúvidas frequentes
            </h2>
            <p className="mt-6 max-w-sm text-pretty text-[16px] leading-relaxed text-chalk-dim">
              Não encontrou o que procurava? Fale com a gente — respondemos rápido e sem
              compromisso.
            </p>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-7">
              Falar no WhatsApp
            </a>
          </div>

          <div className="divide-y divide-line border-t border-line">
            {faqs.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-[18px] font-semibold tracking-tight text-chalk transition-colors group-hover:text-electric-bright sm:text-[20px]">
                      {item.q}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-chalk-dim transition-all duration-300 ${
                        isOpen ? 'rotate-45 border-electric/50 bg-electric text-ink' : ''
                      }`}
                    >
                      <Plus className="h-4.5 w-4.5" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        initial={reduce ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduce ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-7 text-[15.5px] leading-relaxed text-chalk-dim">
                          {item.a}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

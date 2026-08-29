import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { testimonials } from '../lib/site'
import { SectionMark } from './primitives'

export default function Testimonials() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const n = testimonials.length

  const go = (d) => {
    setDir(d)
    setI((prev) => (prev + d + n) % n)
  }

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => {
      setDir(1)
      setI((prev) => (prev + 1) % n)
    }, 6000)
    return () => clearInterval(t)
  }, [reduce, n])

  const t = testimonials[i]

  return (
    <section className="relative py-24 sm:py-28">
      <div className="shell">
        <div className="mb-14 max-w-2xl">
          <SectionMark id="/ 07">Depoimentos</SectionMark>
          <h2 className="font-display text-[clamp(2rem,4.6vw,3.3rem)] font-bold leading-[1.02] tracking-tighter text-chalk text-balance">
            O resultado começa com uma boa experiência.
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-800/60 p-8 sm:p-14">
          <div className="bp-grid-fine pointer-events-none absolute inset-0 opacity-25" />
          <Quote className="absolute right-8 top-8 h-16 w-16 text-electric/15 sm:h-24 sm:w-24" strokeWidth={1} />

          <div className="relative min-h-[220px] sm:min-h-[200px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={i}
                custom={dir}
                initial={reduce ? {} : { opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? {} : { opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="max-w-3xl font-display text-[clamp(1.35rem,3vw,2rem)] font-medium leading-[1.28] tracking-tight text-chalk text-balance">
                  “{t.quote}”
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-line bg-ink-700 font-display text-[15px] font-bold text-electric-bright">
                    {t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-chalk">{t.name}</div>
                    <div className="text-[13.5px] text-chalk-faint">{t.company}</div>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="relative mt-10 flex items-center justify-between border-t border-line pt-6">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Depoimento ${idx + 1}`}
                  onClick={() => {
                    setDir(idx > i ? 1 : -1)
                    setI(idx)
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === i ? 'w-8 bg-electric' : 'w-2.5 bg-white/15 hover:bg-white/30'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Depoimento anterior"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-chalk-dim transition-colors hover:border-white/25 hover:text-chalk"
              >
                <ArrowLeft className="h-4.5 w-4.5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Próximo depoimento"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-chalk-dim transition-colors hover:border-white/25 hover:text-chalk"
              >
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>

        {/* honest placeholder note */}
        <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-chalk-faint">
          Depoimentos ilustrativos — substituir por relatos reais de clientes
        </p>
      </div>
    </section>
  )
}

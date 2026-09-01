import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { processSteps } from '../lib/site'
import { SectionMark } from './primitives'

export default function Process() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 55%'],
  })
  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="processo" className="relative py-24 sm:py-28">
      <div className="shell">
        <div className="mb-16 max-w-2xl">
          <SectionMark id="/ 04">Processo</SectionMark>
          <h2 className="font-display text-[clamp(2rem,4.6vw,3.3rem)] font-bold leading-[1.02] tracking-tighter text-chalk text-balance">
            Do primeiro contato ao site no ar.
          </h2>
        </div>

        <div ref={ref} className="relative">
          {/* rail */}
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-line md:left-1/2 md:-translate-x-1/2" />
          {!reduce && (
            <m.div
              className="absolute left-[27px] top-2 w-px bg-gradient-to-b from-electric via-electric to-electric/30 md:left-1/2 md:-translate-x-1/2"
              style={{ height: fillHeight }}
            />
          )}

          <ol className="space-y-10 md:space-y-16">
            {processSteps.map((step, i) => (
              <Step key={step.n} step={step} index={i} reduce={reduce} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Step({ step, index, reduce }) {
  const left = index % 2 === 0
  return (
    <li className="relative">
      <div
        className={`grid grid-cols-[56px_1fr] items-start gap-5 md:grid-cols-2 md:gap-0 ${
          left ? '' : 'md:[&>*:first-child]:order-2'
        }`}
      >
        {/* node marker on the rail */}
        <div className="relative md:hidden">
          <Node n={step.n} reduce={reduce} />
        </div>

        {/* content */}
        <m.div
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`md:row-start-1 ${
            left ? 'md:pr-16 md:text-right md:col-start-1' : 'md:pl-16 md:col-start-2'
          }`}
        >
          <span className="hidden font-mono text-[12px] uppercase tracking-[0.2em] text-electric-bright md:inline-block">
            Etapa {step.n}
          </span>
          <h3 className="mt-1 font-display text-[22px] font-semibold tracking-tight text-chalk sm:text-[25px]">
            {step.title}
          </h3>
          <p
            className={`mt-2.5 text-[15.5px] leading-relaxed text-chalk-dim ${
              left ? 'md:ml-auto' : ''
            } max-w-sm`}
          >
            {step.body}
          </p>
        </m.div>

        {/* center node for desktop */}
        <div className="pointer-events-none absolute left-1/2 top-0 hidden -translate-x-1/2 md:block">
          <Node n={step.n} reduce={reduce} />
        </div>
      </div>
    </li>
  )
}

function Node({ n, reduce }) {
  return (
    <m.div
      initial={reduce ? {} : { scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid h-14 w-14 place-items-center rounded-full border border-line bg-ink-800"
    >
      <span className="absolute inset-0 rounded-full bg-electric/10 blur-md" />
      <span className="relative font-mono text-[15px] font-semibold text-chalk">{n}</span>
    </m.div>
  )
}

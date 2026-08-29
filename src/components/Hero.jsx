import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Gauge, MousePointerClick, Smartphone, Sparkles } from 'lucide-react'
import { whatsappHref } from '../lib/site'
import BrowserMock from './BrowserMock'
import CursorGrid from './CursorGrid'

const proof = [
  { icon: Sparkles, label: 'Design personalizado' },
  { icon: Smartphone, label: 'Responsivo' },
  { icon: Gauge, label: 'Alta performance' },
  { icon: MousePointerClick, label: 'Foco em conversão' },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [light, setLight] = useState({ x: 50, y: 30 })

  // Radial light field follows the cursor across the hero.
  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      setLight({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      })
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [reduce])

  return (
    <section id="inicio" ref={ref} className="relative overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-44 lg:pb-28">
      {/* Blueprint ground + moving grid */}
      <div className="pointer-events-none absolute inset-0 bp-grid opacity-70" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          maskImage: 'radial-gradient(120% 80% at 50% 0%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(120% 80% at 50% 0%, black 20%, transparent 75%)',
        }}
      >
        <div className="absolute inset-0 bp-grid-fine animate-grid-pan" />
      </div>

      {/* Cursor-reactive light field */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(560px circle at ${light.x}% ${light.y}%, rgba(91,140,255,0.16), transparent 60%)`,
        }}
      />
      {/* Static ambient glows — controlled, not soup */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-electric/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-[-10%] h-[420px] w-[520px] rounded-full bg-violet/10 blur-[130px]" />

      {/* Cursor-reactive grid — cells light up around the pointer */}
      <CursorGrid />

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Left — headline column */}
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <h1 className="font-display text-[clamp(2.4rem,7vw,4.9rem)] font-extrabold leading-[1.02] tracking-tightest text-chalk text-balance">
              <RevealLine reduce={reduce} delay={0.05}>
                Sites que transformam
              </RevealLine>
              <RevealLine reduce={reduce} delay={0.14}>
                ideias em <span className="text-electric-bright">experiências</span>
              </RevealLine>
              <RevealLine reduce={reduce} delay={0.23}>
                <span className="relative text-electric-bright">
                  digitais.
                  <svg
                    className="absolute -bottom-2.5 left-0 h-3 w-[115%] text-electric/60"
                    viewBox="0 0 400 12"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M2 8 C 120 2, 280 2, 398 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              </RevealLine>
            </h1>

            <motion.p
              initial={reduce ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mx-auto mt-8 max-w-xl text-pretty text-[17px] leading-relaxed text-chalk-dim sm:text-[18px] lg:mx-0"
            >
              Criamos sites modernos, rápidos e estratégicos para transformar visitantes em
              clientes e marcas em referências digitais.
            </motion.p>

            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.44 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <a href="#contato" className="btn-primary group">
                Solicitar orçamento
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#projetos" className="btn-ghost">
                Ver projetos
              </a>
            </motion.div>

            {/* Proof row */}
            <motion.ul
              initial={reduce ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-line pt-6 lg:justify-start"
            >
              {proof.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-[13.5px] text-chalk-faint">
                  <Icon className="h-4 w-4 text-electric-bright" strokeWidth={1.75} />
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right — floating instrument mockup */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 30, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ perspective: 1200 }}
          >
            <BrowserMock reduce={reduce} />
          </motion.div>
        </div>
      </div>

      {/* WhatsApp quick link floats at hero base on mobile-visible flow via CTA below; keep hero clean here */}
      <span className="sr-only">
        <a href={whatsappHref}>Falar no WhatsApp</a>
      </span>
    </section>
  )
}

function RevealLine({ children, reduce, delay }) {
  if (reduce) return <span className="block">{children}</span>
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

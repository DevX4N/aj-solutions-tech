import { m, useReducedMotion } from 'framer-motion'
import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { ArrowRight, Gauge, MousePointerClick, Smartphone, Sparkles } from 'lucide-react'
import { whatsappHref } from '../lib/site'
import useFinePointer from '../lib/useFinePointer'
import BrowserMock from './BrowserMock'
import Marquee from './Marquee'

// Cursor-reactive canvas grid — desktop-only, lazy so touch never fetches it.
const CursorGrid = lazy(() => import('./CursorGrid'))

const proof = [
  { icon: Sparkles, label: 'Design personalizado' },
  { icon: Smartphone, label: 'Responsivo' },
  { icon: Gauge, label: 'Alta performance' },
  { icon: MousePointerClick, label: 'Foco em conversão' },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const finePointer = useFinePointer()
  const ref = useRef(null)
  const [light, setLight] = useState({ x: 50, y: 30 })

  // Radial light field follows the cursor across the hero. Desktop fine
  // pointers only — on touch it would re-render + repaint a full-hero gradient
  // on every scroll drag for no visible benefit.
  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      if (e.pointerType === 'touch') return
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
    <section
      id="inicio"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 pb-8 sm:pt-28 lg:pt-24 lg:pb-9"
    >
      {/* Blueprint ground + moving grid */}
      <div className="pointer-events-none absolute inset-0 bp-grid opacity-70" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          maskImage: 'radial-gradient(120% 80% at 50% 0%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(120% 80% at 50% 0%, black 20%, transparent 75%)',
        }}
      >
        <div className="absolute inset-0 bp-grid-fine grid-pan-fine" />
      </div>

      {/* Cursor-reactive light field */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(560px circle at ${light.x}% ${light.y}%, rgba(91,140,255,0.16), transparent 60%)`,
        }}
      />
      {/* Static ambient glows — controlled, not soup. Rendered as radial
          gradients (not blurred fills) so iOS/Safari never pays the cost of a
          large gaussian-blur layer on first paint (LCP) or during scroll. */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[820px] -translate-x-1/2"
        style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(91,140,255,0.11), transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-[-10%] h-[420px] w-[520px]"
        style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(139,108,255,0.11), transparent 70%)' }}
      />

      {/* Cursor-reactive grid — cells light up around the pointer (desktop only) */}
      {finePointer && !reduce && (
        <Suspense fallback={null}>
          <CursorGrid />
        </Suspense>
      )}

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

            <m.p
              initial={reduce ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mx-auto mt-8 max-w-xl text-pretty text-[17px] leading-relaxed text-chalk-dim sm:text-[18px] lg:mx-0"
            >
              Criamos sites modernos, rápidos e estratégicos para transformar visitantes em
              clientes e marcas em referências digitais.
            </m.p>

            <m.div
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
            </m.div>

            {/* Proof row */}
            <m.ul
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
            </m.ul>
          </div>

          {/* Right — floating instrument mockup */}
          <m.div
            initial={reduce ? {} : { opacity: 0, y: 30, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ perspective: 1200 }}
          >
            <BrowserMock reduce={reduce} />
          </m.div>
        </div>
      </div>

      {/* Service marquee — closing band pinned near the hero's bottom edge.
          In-flow (not absolute) so overflow-hidden never clips it; mt-auto pins
          it to the bottom, the top padding clears the phone mockup overhang, and
          the section's small bottom padding leaves ~40px before the next section. */}
      <div className="relative z-10 mt-auto pt-6 lg:pt-6">
        <Marquee />
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
      <m.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </m.span>
    </span>
  )
}

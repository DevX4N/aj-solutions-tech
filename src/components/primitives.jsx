import { m, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Scroll reveal — one authored entrance moment, exponential ease-out from an
// already-usable default. Under prefers-reduced-motion it renders statically.
export function Reveal({ children, delay = 0, y = 22, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const MotionTag = m[as] || m.div
  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

// Stagger container + child
export function Stagger({ children, className = '', gap = 0.08 }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </m.div>
  )
}

export function StaggerItem({ children, className = '', y = 20 }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </m.div>
  )
}

// Blueprint coordinate tick — a wayfinding mark in the instrument world, not an
// announcing eyebrow. Renders only the document coordinate + a measured rule;
// the heading below carries its own weight (the `children` word is intentionally
// not rendered as a label).
export function SectionMark({ id }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="font-mono text-[12px] tracking-[0.1em] text-electric-bright/90">{id}</span>
      <span className="h-px w-14 bg-gradient-to-r from-line to-transparent" />
    </div>
  )
}

// Animated number counter that runs once on entering the viewport.
export function Counter({ to, suffix = '', duration = 1600 }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [val, setVal] = useState(reduce ? to : 0)

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    let raf
    let started = false
    const run = (start) => {
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(eased * to))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true
            run(performance.now())
          }
        })
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, duration, reduce])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

// Textual wordmark for AJ Solutions Tech — a drawn monogram + set text.
export function Wordmark({ className = '' }) {
  return (
    <a
      href="#inicio"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="AJ Solutions Tech — início"
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-[10px] border border-line bg-ink-700/70 overflow-hidden">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M9 22 L15 10 L21 22"
            stroke="#5B8CFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M11.5 18 H18.5" stroke="#5B8CFF" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M22 10 V22" stroke="#F3F5FB" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-display text-[17px] font-semibold tracking-tighter text-chalk">
        AJ Solutions<span className="text-chalk-faint"> Tech</span>
      </span>
    </a>
  )
}

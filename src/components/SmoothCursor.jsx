import { motion, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

// Unified custom cursor for the engineering-studio world: a spring-following
// reticle that grows over interactive elements and morphs into a "Ver projeto"
// disc over portfolio items. Desktop + fine-pointer only; disabled under
// prefers-reduced-motion (native cursor stays).
const FINE_POINTER = '(hover: hover) and (pointer: fine)'

export default function SmoothCursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [variant, setVariant] = useState('default') // default | link | project

  const x = useSpring(0, { stiffness: 520, damping: 40, mass: 0.6, restDelta: 0.001 })
  const y = useSpring(0, { stiffness: 520, damping: 40, mass: 0.6, restDelta: 0.001 })

  // Enable only on true desktop pointers.
  useEffect(() => {
    if (reduce) return
    const mq = window.matchMedia(FINE_POINTER)
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [reduce])

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('cursor-hidden')

    const onMove = (e) => {
      if (e.pointerType === 'touch') return
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      const t = e.target
      if (t?.closest?.('[data-cursor="project"]')) setVariant('project')
      else if (t?.closest?.('a, button, [role="button"], input, textarea, select, label'))
        setVariant('link')
      else setVariant('default')
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)

    return () => {
      document.documentElement.classList.remove('cursor-hidden')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const isProject = variant === 'project'
  const isLink = variant === 'link'

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
      style={{ x, y, opacity: visible ? 1 : 0 }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        {/* "Ver projeto" disc */}
        <motion.div
          className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-electric text-[11px] font-semibold uppercase tracking-[0.06em] text-ink"
          initial={false}
          animate={{
            width: isProject ? 84 : 0,
            height: isProject ? 84 : 0,
            opacity: isProject ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        >
          <span style={{ opacity: isProject ? 1 : 0 }}>Ver projeto</span>
        </motion.div>

        {/* Reticle ring */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric-bright"
          initial={false}
          animate={{
            width: isLink ? 40 : 26,
            height: isLink ? 40 : 26,
            opacity: isProject ? 0 : 1,
            borderColor: isLink ? 'rgba(122,162,255,0.9)' : 'rgba(122,162,255,0.55)',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 34 }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-bright"
          initial={false}
          animate={{
            width: isProject || isLink ? 0 : 5,
            height: isProject || isLink ? 0 : 5,
            opacity: isProject || isLink ? 0 : 1,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 34 }}
        />
      </div>
    </motion.div>
  )
}

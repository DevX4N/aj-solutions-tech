import { motion, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Physics-based smooth cursor (magicui) adapted to this project:
// framer-motion instead of motion/react, plain JS, and guarded so it only runs
// on desktop fine pointers and never under prefers-reduced-motion (native cursor
// stays). The arrow rotates toward the movement direction and eases on stop.
const FINE_POINTER = '(hover: hover) and (pointer: fine)'

function ArrowCursor() {
  return (
    <svg
      width={44}
      height={47}
      viewBox="0 0 50 54"
      fill="none"
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 4px 10px rgba(91,140,255,0.45))' }}
    >
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        fill="#08090D"
      />
      <path
        d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
        stroke="#F3F5FB"
        strokeWidth={2.25825}
      />
    </svg>
  )
}

const springConfig = { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 }

export default function SmoothCursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)
  const rotation = useSpring(0, { ...springConfig, damping: 60, stiffness: 300 })
  const scale = useSpring(1, { ...springConfig, stiffness: 500, damping: 35 })

  const last = useRef({ x: 0, y: 0 })
  const vel = useRef({ x: 0, y: 0 })
  const lastTime = useRef(Date.now())
  const prevAngle = useRef(0)
  const accRotation = useRef(0)

  // Enable only on desktop fine pointers.
  useEffect(() => {
    if (reduce) return
    const mq = window.matchMedia(FINE_POINTER)
    const update = () => {
      setEnabled(mq.matches)
      if (!mq.matches) setVisible(false)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [reduce])

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('cursor-hidden')

    let timeout = null
    let rafId = 0

    const process = (e) => {
      setVisible(true)
      const pos = { x: e.clientX, y: e.clientY }
      const now = Date.now()
      const dt = now - lastTime.current
      if (dt > 0) {
        vel.current = { x: (pos.x - last.current.x) / dt, y: (pos.y - last.current.y) / dt }
      }
      lastTime.current = now
      last.current = pos

      x.set(pos.x)
      y.set(pos.y)

      const speed = Math.hypot(vel.current.x, vel.current.y)
      if (speed > 0.1) {
        const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI) + 90
        let diff = angle - prevAngle.current
        if (diff > 180) diff -= 360
        if (diff < -180) diff += 360
        accRotation.current += diff
        rotation.set(accRotation.current)
        prevAngle.current = angle

        scale.set(0.92)
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => scale.set(1), 150)
      }
    }

    const onMove = (e) => {
      if (e.pointerType === 'touch') return
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        process(e)
        rafId = 0
      })
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
      if (rafId) cancelAnimationFrame(rafId)
      if (timeout) clearTimeout(timeout)
    }
  }, [enabled, x, y, rotation, scale])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
      style={{
        x,
        y,
        rotate: rotation,
        scale,
        translateX: '-50%',
        translateY: '-50%',
        willChange: 'transform',
        opacity: visible ? 1 : 0,
      }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <ArrowCursor />
    </motion.div>
  )
}

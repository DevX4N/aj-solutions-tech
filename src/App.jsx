import { m, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Suspense, lazy, useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Pillars from './components/Pillars'
import Services from './components/Services'
import Projects from './components/Projects'
import Process from './components/Process'
import Differentials from './components/Differentials'
import Metrics from './components/Metrics'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import useFinePointer from './lib/useFinePointer'
import { whatsappHref } from './lib/site'

// Desktop-only custom cursor — lazy so touch devices never download its chunk.
const SmoothCursor = lazy(() => import('./components/SmoothCursor'))

export default function App() {
  const reduce = useReducedMotion()
  const finePointer = useFinePointer()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const [showWhats, setShowWhats] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowWhats(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-ink">
      {finePointer && !reduce && (
        <Suspense fallback={null}>
          <SmoothCursor />
        </Suspense>
      )}

      {/* Scroll progress */}
      {!reduce && (
        <m.div
          className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-electric"
          style={{ scaleX }}
        />
      )}

      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-electric focus:px-4 focus:py-2 focus:text-ink"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main>
        <Hero />
        <Pillars />
        <Services />
        <Projects />
        <Process />
        <Differentials />
        <Metrics />
        <About />
        <Testimonials />
        <Faq />
        <Contact />
      </main>

      <Footer />

      {/* Floating WhatsApp — appears after scroll */}
      <m.div
        className="fixed bottom-5 right-5 z-[65]"
        initial={false}
        animate={{
          opacity: showWhats ? 1 : 0,
          y: showWhats ? 0 : 20,
          pointerEvents: showWhats ? 'auto' : 'none',
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55),0_0_0_1px_rgba(255,255,255,0.06)] transition-transform duration-300 hover:scale-[1.06] hover:shadow-[0_16px_40px_-6px_rgba(37,211,102,0.7),0_0_0_1px_rgba(255,255,255,0.08)]"
        >
          {/* Pulsing halo */}
          {!reduce && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-whats-ping"
            />
          )}

          {/* WhatsApp glyph oficial */}
          <svg
            viewBox="0 0 32 32"
            className="relative h-7 w-7"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.245-.688.245-1.06 0-.058 0-.144-.03-.215-.1-.172-2.434-1.348-2.678-1.348zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.13-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.196 10.845 25.196 15.8s-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.575a10.807 10.807 0 0 0 16.03-9.404c0-5.958-4.842-10.8-10.802-10.8" />
          </svg>

          {/* Tooltip label */}
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-line bg-ink-800/95 px-3.5 py-2 text-[13px] font-medium text-chalk opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
            Fale com a gente
          </span>
        </a>
      </m.div>
    </div>
  )
}

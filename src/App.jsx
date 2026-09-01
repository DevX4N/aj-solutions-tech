import { m, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Suspense, lazy, useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
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
      <m.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-[65] flex items-center gap-2.5 rounded-full border border-electric/40 bg-electric px-4 py-3.5 text-[14px] font-semibold text-ink shadow-[0_14px_40px_-10px_rgba(91,140,255,0.7)]"
        initial={false}
        animate={{
          opacity: showWhats ? 1 : 0,
          y: showWhats ? 0 : 20,
          pointerEvents: showWhats ? 'auto' : 'none',
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        whileHover={reduce ? {} : { scale: 1.04 }}
      >
        <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
        <span className="hidden sm:inline">WhatsApp</span>
      </m.a>
    </div>
  )
}

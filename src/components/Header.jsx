import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { nav } from '../lib/site'
import { Wordmark } from './primitives'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ease-out ${
          scrolled
            ? 'border-b border-line bg-ink/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex items-center justify-between" style={{ height: scrolled ? 64 : 84 }}>
          <div className="transition-[height] duration-500">
            <Wordmark />
          </div>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-[14px] font-medium text-chalk-dim transition-colors duration-200 hover:text-chalk"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a href="#contato" className="btn-primary group text-[14px]">
              Solicitar orçamento
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink-700/60 text-chalk lg:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden"
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? {} : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="mx-4 mt-2 overflow-hidden rounded-2xl border border-line bg-ink-800/95 p-3 backdrop-blur-xl shadow-lift"
              initial={reduce ? {} : { y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? {} : { y: -12, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <nav className="flex flex-col" aria-label="Navegação mobile">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[16px] font-medium text-chalk-dim transition-colors hover:bg-white/5 hover:text-chalk"
                    initial={reduce ? {} : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduce ? 0 : 0.04 * i + 0.05 }}
                  >
                    {item.label}
                    <span className="mono-label">{String(i + 1).padStart(2, '0')}</span>
                  </motion.a>
                ))}
                <a
                  href="#contato"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-2 w-full"
                >
                  Solicitar orçamento
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

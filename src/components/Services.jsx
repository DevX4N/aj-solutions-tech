import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Building2,
  Contact,
  LayoutPanelTop,
  MousePointerClick,
  Wand2,
  Wrench,
} from 'lucide-react'
import { services } from '../lib/site'
import useFinePointer from '../lib/useFinePointer'
import { Reveal, SectionMark } from './primitives'

const icons = {
  landing: MousePointerClick,
  institucional: Building2,
  servicos: Contact,
  redesign: Wand2,
  uiux: LayoutPanelTop,
  manutencao: Wrench,
}

// bento spans → varied rhythm, not a uniform card grid
const spans = {
  landing: 'lg:col-span-3',
  institucional: 'lg:col-span-3',
  servicos: 'lg:col-span-2',
  redesign: 'lg:col-span-2',
  uiux: 'lg:col-span-2',
  manutencao: 'lg:col-span-6',
}

export default function Services() {
  return (
    <section id="servicos" className="relative py-24 sm:py-28">
      <div className="shell">
        <div className="mb-14 max-w-2xl">
          <SectionMark id="/ 02">Serviços</SectionMark>
          <h2 className="font-display text-[clamp(2rem,4.6vw,3.3rem)] font-bold leading-[1.02] tracking-tighter text-chalk text-balance">
            Experiências digitais criadas para empresas que querem crescer.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-chalk-dim sm:text-base">
            Criamos sites estratégicos, rápidos e personalizados para fortalecer sua presença online, aumentar sua autoridade e gerar novas oportunidades.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.06} className={spans[s.id]}>
              <ServiceCard service={s} Icon={icons[s.id]} wide={s.id === 'manutencao'} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, Icon, wide }) {
  const finePointer = useFinePointer()
  const ref = useRef(null)
  const rect = useRef(null)
  const [pos, setPos] = useState({ x: -200, y: -200 })

  // Cache the rect on enter so pointermove never forces a layout (reflow).
  const onEnter = () => {
    rect.current = ref.current?.getBoundingClientRect() ?? null
  }
  const onMove = (e) => {
    const r = rect.current
    if (!r) return
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  // The spotlight follows the cursor — meaningless on touch, and updating it on
  // every touch-drag would re-render + repaint a radial gradient during scroll.
  // Attach the tracking handlers only for desktop fine pointers.
  const trackingProps = finePointer
    ? {
        onPointerEnter: onEnter,
        onPointerMove: onMove,
        onPointerLeave: () => setPos({ x: -200, y: -200 }),
      }
    : {}

  return (
    <article
      ref={ref}
      {...trackingProps}
      className={`group relative h-full overflow-hidden rounded-2xl border border-line bg-ink-800/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-electric/30 hover:shadow-[0_18px_60px_-30px_rgba(91,140,255,0.55)] sm:p-7 ${
        wide ? 'flex flex-col justify-between gap-6 lg:flex-row lg:items-center' : ''
      }`}
    >
      {/* cursor spotlight — desktop only */}
      {finePointer && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(340px circle at ${pos.x}px ${pos.y}px, rgba(91,140,255,0.12), transparent 65%)`,
          }}
        />
      )}
      <div className="bp-grid-fine pointer-events-none absolute inset-0 opacity-30" />

      <div className={`relative ${wide ? 'lg:max-w-xl' : ''}`}>
        <div className="flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink-700/70 text-electric-bright transition-all duration-300 group-hover:border-electric/40 group-hover:bg-electric/10 group-hover:text-electric-bright">
            <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-chalk-faint">
            {service.meta}
          </span>
        </div>
        <h3 className="mt-6 font-display text-[20px] font-semibold tracking-tight text-chalk sm:text-[22px]">
          {service.name}
        </h3>
        <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-chalk-dim">{service.body}</p>
      </div>

      <div
        className={`relative ${wide ? 'lg:pl-8' : 'mt-6'}`}
      >
        <Link
          to="/#contato"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-700/50 px-3.5 py-1.5 text-[12.5px] font-medium tracking-wide text-chalk-dim transition-all duration-300 hover:border-electric/50 hover:bg-electric/10 hover:text-electric-bright group-hover:border-electric/40 group-hover:text-electric-bright"
        >
          Falar sobre projeto
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  )
}

import { useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../lib/site'
import { Reveal, SectionMark } from './primitives'

export default function Projects() {
  const reduce = useReducedMotion()

  return (
    <section id="projetos" className="relative py-24 sm:py-28">
      <div className="shell">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionMark id="/ 03">Projetos</SectionMark>
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.3rem)] font-bold leading-[1.02] tracking-tighter text-chalk text-balance">
              Projetos criados para gerar impacto.
            </h2>
          </div>
          <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-chalk-faint">
            {/* Projetos de demonstração — substituir por trabalhos reais */}
            Seleção de demonstração
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:gap-8">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={0.04}>
              <ProjectRow project={p} flip={i % 2 === 1} reduce={reduce} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ project, flip, reduce }) {
  return (
    <a
      href="#contato"
      data-cursor="project"
      aria-label={`${project.name} — ${project.kind}`}
      className="group grid overflow-hidden rounded-3xl border border-line bg-ink-800/50 transition-colors duration-300 hover:border-white/15 lg:grid-cols-2"
    >
      {/* Visual */}
      <div className={`relative aspect-[16/11] overflow-hidden lg:aspect-auto ${flip ? 'lg:order-2' : ''}`}>
        <div
          className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
        >
          <ProjectVisual project={project} reduce={reduce} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
      </div>

      {/* Meta */}
      <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[12px] text-chalk-faint">{project.year}</span>
          <span
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-chalk-dim transition-all duration-300 group-hover:border-electric/50 group-hover:bg-electric group-hover:text-ink"
          >
            <ArrowUpRight className="h-4.5 w-4.5" />
          </span>
        </div>
        <div>
          <h3 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold tracking-tighter text-chalk">
            {project.name}
          </h3>
          <p className="mt-2 text-[15.5px] leading-relaxed text-chalk-dim">{project.kind}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-white/[0.02] px-3 py-1 text-[12.5px] text-chalk-dim"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  )
}

// Authored placeholder composition per project, tinted with its accent.
function ProjectVisual({ project, reduce }) {
  const a = project.accent
  return (
    <div className="relative h-full w-full bg-ink-900">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 80% 10%, ${hexA(a, 0.22)}, transparent 55%)`,
        }}
      />
      <div className="bp-grid-fine pointer-events-none absolute inset-0 opacity-40" />

      {/* mini rendered site, unique per project */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="w-full max-w-[360px] overflow-hidden rounded-xl border border-line bg-ink-800 shadow-lift">
          <div className="flex items-center gap-1.5 border-b border-line bg-ink-700/70 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="ml-2 font-mono text-[9px] text-chalk-faint">{project.id}.com.br</span>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <span className="font-display text-[13px] font-bold tracking-tight" style={{ color: a }}>
                {project.name}
              </span>
              <div className="flex gap-1.5">
                <span className="h-1.5 w-6 rounded-full bg-white/10" />
                <span className="h-1.5 w-6 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <div className="h-3 w-4/5 rounded bg-chalk/80" />
              <div className="h-3 w-3/5 rounded" style={{ background: hexA(a, 0.85) }} />
            </div>
            <div className="mt-4 space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-white/10" />
              <div className="h-1.5 w-5/6 rounded-full bg-white/10" />
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-6 w-24 rounded-full" style={{ background: a }} />
              <div className="h-6 w-16 rounded-full border border-line" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-9 rounded-md border border-line bg-white/[0.02]" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* placeholder stamp */}
      <span className="absolute bottom-3 left-3 rounded-md border border-line bg-ink/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-chalk-faint backdrop-blur-sm">
        Demonstração
      </span>
    </div>
  )
}

function hexA(hex, alpha) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

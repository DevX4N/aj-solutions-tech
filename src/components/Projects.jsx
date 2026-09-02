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
            Seleção de projetos
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
  const a = project.accent
  const external = Boolean(project.url)
  return (
    <a
      href={project.url || '#contato'}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-cursor="project"
      aria-label={`${project.name} — acessar projeto`}
      className="group grid overflow-hidden rounded-3xl border border-line bg-ink-800/50 transition-colors duration-300 hover:border-white/15 lg:grid-cols-2"
    >
      {/* Preview — moldura de navegador futurista */}
      <div className={`relative aspect-[16/11] overflow-hidden lg:aspect-auto ${flip ? 'lg:order-2' : ''}`}>
        <BrowserPreview project={project} reduce={reduce} />
      </div>

      {/* Registro do case */}
      <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-chalk-faint">
            AJ / {project.caseId}
          </span>
          <span className="font-mono text-[12px] text-chalk-faint">{project.year}</span>
        </div>

        <div>
          <h3 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold tracking-tighter text-chalk">
            {project.name}
          </h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-chalk-dim">{project.kind}</p>

          {/* Ficha técnica — stack + status */}
          <dl className="mt-7 grid grid-cols-1 gap-5 border-t border-line pt-6 sm:grid-cols-[1fr_auto]">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-white/[0.02] px-3 py-1 text-[12.5px] text-chalk-dim"
                  >
                    {t}
                  </span>
                ))}
              </dd>
            </div>
            <div className="sm:text-right">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">Status</dt>
              <dd className="mt-2 inline-flex items-center gap-2 font-mono text-[12.5px] text-chalk-dim sm:justify-end">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: a, boxShadow: `0 0 8px ${hexA(a, 0.7)}` }}
                />
                {project.status}
              </dd>
            </div>
          </dl>
        </div>

        {/* Botão de acesso */}
        <div className="flex items-center justify-between border-t border-line pt-6">
          <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-chalk-dim transition-colors duration-300 group-hover:text-chalk">
            Acessar projeto
          </span>
          <span className="grid h-11 w-11 place-items-center rounded-full border border-line text-chalk-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-electric/50 group-hover:bg-electric group-hover:text-ink">
            <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </a>
  )
}

// Preview do projeto numa moldura de navegador futurista: fundo escuro, bordas
// arredondadas, leve brilho azul, profundidade e leve movimento no hover.
function BrowserPreview({ project, reduce }) {
  const a = project.accent
  return (
    <div className="relative h-full w-full bg-ink-900">
      {/* Halo direcional do acento + grid técnico recebendo o preview */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(120% 90% at 78% 8%, ${hexA(a, 0.2)}, transparent 58%)` }}
      />
      <div className="bp-grid-fine pointer-events-none absolute inset-0 opacity-40" />

      <div className="absolute inset-0 flex items-center justify-center p-7 sm:p-9">
        <div
          className="relative w-full max-w-[420px] overflow-hidden rounded-xl border border-line bg-ink-800 shadow-lift transition-transform duration-[900ms] ease-out group-hover:-translate-y-1.5"
          style={{
            transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
            boxShadow: `0 24px 60px -22px rgba(0,0,0,0.8), 0 0 0 1px ${hexA(a, 0.12)}, 0 18px 50px -26px ${hexA(a, 0.55)}`,
          }}
        >
          {/* Barra do navegador */}
          <div className="flex items-center gap-1.5 border-b border-line bg-ink-700/70 px-3 py-2.5">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="ml-2 flex-1 truncate rounded bg-ink-900/70 px-2 py-0.5 font-mono text-[9px] text-chalk-faint">
              {project.domain || `${project.id}.com.br`}
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: a, boxShadow: `0 0 6px ${hexA(a, 0.8)}` }}
            />
          </div>

          {/* Conteúdo: print real quando disponível, senão preview renderizado */}
          {project.image ? (
            <img
              src={project.image}
              alt={`Preview do projeto ${project.name}`}
              loading="lazy"
              className="block h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <RenderedSite project={project} reduce={reduce} />
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
    </div>
  )
}

// Composição de interface renderizada — usada quando não há print real.
function RenderedSite({ project }) {
  const a = project.accent
  return (
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
  )
}

function hexA(hex, alpha) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

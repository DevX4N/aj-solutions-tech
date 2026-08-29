import { ArrowUpRight, Instagram, Linkedin, MessageCircle } from 'lucide-react'
import { contact, nav, whatsappHref } from '../lib/site'
import { Wordmark } from './primitives'

const socials = [
  { label: 'Instagram', href: contact.instagram, Icon: Instagram },
  { label: 'LinkedIn', href: contact.linkedin, Icon: Linkedin },
  { label: 'WhatsApp', href: whatsappHref, Icon: MessageCircle },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-900 pt-20">
      <div className="shell relative">
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <Wordmark />
            <p className="mt-6 max-w-sm text-pretty text-[17px] leading-relaxed text-chalk-dim">
              Sites modernos para marcas que querem crescer no digital.
            </p>
            <a href="#contato" className="btn-primary group mt-8">
              Solicitar orçamento
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="mono-label mb-5">Navegação</h3>
              <ul className="space-y-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-[15px] text-chalk-dim transition-colors hover:text-chalk"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mono-label mb-5">Redes</h3>
              <ul className="space-y-3">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 text-[15px] text-chalk-dim transition-colors hover:text-chalk"
                    >
                      <Icon className="h-4 w-4 text-chalk-faint transition-colors group-hover:text-electric-bright" strokeWidth={1.75} />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line py-8 sm:flex-row sm:items-center">
          <p className="text-[13.5px] text-chalk-faint">
            © {new Date().getFullYear()} AJ Solutions Tech. Todos os direitos reservados.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-chalk-faint">
            Design · Tecnologia · Estratégia
          </p>
        </div>
      </div>

      {/* Giant background wordmark */}
      <div aria-hidden="true" className="relative select-none overflow-hidden">
        <div className="pointer-events-none whitespace-nowrap text-center font-display text-[clamp(4rem,18vw,15rem)] font-extrabold leading-[0.8] tracking-tightest text-outline opacity-[0.6] translate-y-[18%]">
          AJ Solutions
        </div>
      </div>
    </footer>
  )
}

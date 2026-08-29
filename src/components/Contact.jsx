import { useState } from 'react'
import { ArrowRight, Check, Loader2, MessageCircle } from 'lucide-react'
import { budgetRanges, projectTypes, whatsappHref } from '../lib/site'
import { SectionMark } from './primitives'

const EMPTY = {
  nome: '',
  empresa: '',
  email: '',
  whatsapp: '',
  tipo: '',
  orcamento: '',
  mensagem: '',
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.nome.trim()) e.nome = 'Informe seu nome.'
    if (!form.email.trim()) e.email = 'Informe seu e-mail.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'E-mail inválido.'
    if (!form.whatsapp.trim()) e.whatsapp = 'Informe um WhatsApp para contato.'
    if (!form.tipo) e.tipo = 'Selecione o tipo de projeto.'
    if (!form.mensagem.trim()) e.mensagem = 'Conte um pouco sobre o projeto.'
    return e
  }

  const submit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      // >>> INTEGRAÇÃO PENDENTE <<<
      // Sem backend definido. Troque este trecho pelo envio real
      // (e-mail, API, webhook do WhatsApp Business, etc.).
      await new Promise((res) => setTimeout(res, 1400))
      setStatus('success')
      setForm(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contato" className="relative overflow-hidden py-24 sm:py-28">
      {/* Special background — grid, spotlight, controlled glow */}
      <div className="bp-grid pointer-events-none absolute inset-0 opacity-50" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage: 'radial-gradient(90% 70% at 30% 20%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(90% 70% at 30% 20%, black, transparent 75%)',
          background: 'radial-gradient(700px circle at 30% 20%, rgba(91,140,255,0.14), transparent 60%)',
        }}
      />
      <div className="pointer-events-none absolute -bottom-32 right-[-10%] h-[440px] w-[560px] rounded-full bg-violet/12 blur-[140px]" />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* CTA column */}
          <div className="lg:pt-4">
            <SectionMark id="/ 09">Contato</SectionMark>
            <h2 className="font-display text-[clamp(2.2rem,4.8vw,3.5rem)] font-extrabold leading-[1.0] tracking-tightest text-chalk text-balance">
              Vamos transformar sua ideia em um site que chama atenção?
            </h2>
            <p className="mt-6 max-w-md text-pretty text-[17px] leading-relaxed text-chalk-dim">
              Conte um pouco sobre o seu projeto e descubra como podemos criar uma experiência
              digital que represente sua marca.
            </p>

            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-8 group">
              <MessageCircle className="h-4.5 w-4.5 text-electric-bright" strokeWidth={2} />
              Falar no WhatsApp
            </a>

            <div className="mt-12 space-y-4 border-t border-line pt-8">
              <p className="font-display text-[18px] font-medium text-chalk">
                Tem uma ideia? Vamos conversar.
              </p>
              <p className="max-w-sm text-[14.5px] leading-relaxed text-chalk-faint">
                Sem templates genéricos. Cada projeto é pensado para a sua marca. Design bonito é
                importante — resultado também.
              </p>
            </div>
          </div>

          {/* Form column */}
          <div className="relative rounded-3xl border border-line bg-ink-800/70 p-6 shadow-lift backdrop-blur-sm sm:p-9">
            {status === 'success' ? (
              <SuccessState onReset={() => setStatus('idle')} />
            ) : (
              <form onSubmit={submit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Nome" id="nome" value={form.nome} onChange={set('nome')} error={errors.nome} placeholder="Seu nome" required />
                  <Field label="Empresa" id="empresa" value={form.empresa} onChange={set('empresa')} placeholder="Opcional" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="E-mail" id="email" type="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="voce@empresa.com.br" required />
                  <Field label="WhatsApp" id="whatsapp" value={form.whatsapp} onChange={set('whatsapp')} error={errors.whatsapp} placeholder="(00) 00000-0000" required />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField label="Tipo de projeto" id="tipo" value={form.tipo} onChange={set('tipo')} error={errors.tipo} options={projectTypes} required />
                  <SelectField label="Faixa de orçamento" id="orcamento" value={form.orcamento} onChange={set('orcamento')} options={budgetRanges} placeholder="Selecione (opcional)" />
                </div>

                <div>
                  <FieldLabel htmlFor="mensagem" required>Mensagem</FieldLabel>
                  <textarea
                    id="mensagem"
                    rows={4}
                    value={form.mensagem}
                    onChange={set('mensagem')}
                    placeholder="Descreva rapidamente sua ideia, objetivo e prazo."
                    className={`w-full resize-none rounded-xl border bg-ink px-4 py-3 text-[15px] text-chalk placeholder:text-chalk-faint transition-colors duration-200 hover:border-white/20 focus:border-electric focus:outline-none focus:ring-0 ${
                      errors.mensagem ? 'border-red-400/70' : 'border-line'
                    }`}
                  />
                  <FieldError error={errors.mensagem} />
                </div>

                {status === 'error' && (
                  <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-[13.5px] text-red-200" role="alert">
                    Revise os campos destacados e tente novamente.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary group w-full py-4 text-[15.5px] disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      Enviando…
                    </>
                  ) : (
                    <>
                      Quero tirar meu projeto do papel
                      <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                <p className="text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-chalk-faint">
                  Resposta em até 1 dia útil
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function FieldLabel({ children, htmlFor, required }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-chalk-dim">
      {children}
      {required && <span className="text-electric-bright"> *</span>}
    </label>
  )
}

function Field({ label, id, value, onChange, error, placeholder, type = 'text', required }) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>{label}</FieldLabel>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-ink px-4 py-3 text-[15px] text-chalk placeholder:text-chalk-faint transition-colors duration-200 hover:border-white/20 focus:border-electric focus:outline-none focus:ring-0 ${
          error ? 'border-red-400/70' : 'border-line'
        }`}
      />
      <FieldError error={error} />
    </div>
  )
}

function SelectField({ label, id, value, onChange, error, options, placeholder, required }) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>{label}</FieldLabel>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full appearance-none rounded-xl border bg-ink px-4 py-3 text-[15px] text-chalk transition-colors duration-200 hover:border-white/20 focus:border-electric focus:outline-none focus:ring-0 ${
            error ? 'border-red-400/70' : 'border-line'
          } ${value ? 'text-chalk' : 'text-chalk-faint'}`}
        >
          <option value="" disabled>
            {placeholder || 'Selecione'}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-ink-700 text-chalk">
              {o}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-chalk-faint">▾</span>
      </div>
      <FieldError error={error} />
    </div>
  )
}

function FieldError({ error }) {
  if (!error) return null
  return <p className="mt-1.5 text-[12.5px] text-red-300">{error}</p>
}

function SuccessState({ onReset }) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full border border-electric/40 bg-electric/15 text-electric-bright">
        <Check className="h-8 w-8" strokeWidth={2.4} />
      </div>
      <h3 className="mt-6 font-display text-[24px] font-bold tracking-tight text-chalk">
        Recebemos sua mensagem!
      </h3>
      <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-chalk-dim">
        Obrigado pelo contato. Vamos analisar seu projeto e retornar em breve com os próximos
        passos.
      </p>
      <button type="button" onClick={onReset} className="btn-ghost mt-8">
        Enviar outra mensagem
      </button>
    </div>
  )
}

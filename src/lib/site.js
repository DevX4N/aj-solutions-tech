// =============================================================================
// AJ Solutions Tech — conteúdo do site.
//
// >>> SUBSTITUIR ANTES DE PUBLICAR <<<
// Todos os campos marcados com PLACEHOLDER precisam dos dados reais da agência.
// Projetos de portfólio e depoimentos são fictícios (demonstração) e devem ser
// trocados por trabalhos e clientes reais.
// =============================================================================

// --- CONTATOS (PLACEHOLDER — trocar pelos dados reais) -----------------------
export const contact = {
  // WhatsApp em formato internacional, só dígitos. Ex.: 5511999998888
  whatsappNumber: '5599999999999', // PLACEHOLDER
  whatsappMessage: 'Olá! Vim pelo site e gostaria de solicitar um orçamento.',
  email: 'contato@ajsolutionstech.com.br', // PLACEHOLDER
  instagram: 'https://instagram.com/', // PLACEHOLDER
  linkedin: 'https://linkedin.com/', // PLACEHOLDER
}

export const whatsappHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  contact.whatsappMessage,
)}`

export const nav = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
]

export const marqueeItems = [
  'Web Design',
  'Landing Pages',
  'React',
  'Interfaces',
  'Performance',
  'UX / UI',
  'Conversão',
  'Responsivo',
  'Sites Institucionais',
  'Redesign',
]

export const pillars = [
  {
    index: '01',
    title: 'Design que transmite autoridade',
    body: 'Interfaces modernas e profissionais que valorizam sua marca e passam credibilidade no primeiro segundo.',
  },
  {
    index: '02',
    title: 'Experiência pensada para conversão',
    body: 'Estrutura clara e estratégica para conduzir o visitante até a ação, sem ruído e sem fricção.',
  },
  {
    index: '03',
    title: 'Performance de verdade',
    body: 'Sites rápidos, responsivos e preparados para diferentes dispositivos — do desktop ao celular.',
  },
  {
    index: '04',
    title: 'Tecnologia moderna',
    body: 'Desenvolvimento com tecnologias atuais, escaláveis e eficientes, prontas para evoluir com você.',
  },
]

export const services = [
  {
    id: 'landing',
    name: 'Landing Pages',
    body: 'Páginas pensadas para campanhas, lançamentos, anúncios e captação de leads.',
    meta: 'CONVERSÃO',
  },
  {
    id: 'institucional',
    name: 'Sites Institucionais',
    body: 'Sites completos para apresentar sua empresa, serviços e diferenciais com clareza.',
    meta: 'PRESENÇA',
  },
  {
    id: 'servicos',
    name: 'Sites para Prestadores de Serviço',
    body: 'Estruturas focadas em credibilidade, geração de contatos e apresentação profissional.',
    meta: 'CREDIBILIDADE',
  },
  {
    id: 'redesign',
    name: 'Redesign',
    body: 'Modernização de sites antigos, melhorando visual, experiência e performance.',
    meta: 'EVOLUÇÃO',
  },
  {
    id: 'uiux',
    name: 'UI / UX',
    body: 'Interfaces planejadas para oferecer clareza, usabilidade e uma experiência memorável.',
    meta: 'EXPERIÊNCIA',
  },
  {
    id: 'manutencao',
    name: 'Manutenção e Evolução',
    body: 'Melhorias contínuas, novas seções, ajustes e evolução do projeto após o lançamento.',
    meta: 'CONTINUIDADE',
  },
]

// Projetos FICTÍCIOS de demonstração — SUBSTITUIR por trabalhos reais.
export const projects = [
  {
    id: 'atlas',
    name: 'Atlas Finance',
    kind: 'Site institucional para empresa financeira.',
    year: '2025',
    tags: ['Web Design', 'React', 'UI/UX'],
    accent: '#5B8CFF',
    placeholder: true,
  },
  {
    id: 'aurea',
    name: 'Aurea Studio',
    kind: 'Landing page para marca de arquitetura.',
    year: '2025',
    tags: ['Landing Page', 'Branding', 'Motion'],
    accent: '#8B6CFF',
    placeholder: true,
  },
  {
    id: 'nexa',
    name: 'Nexa Consultoria',
    kind: 'Site corporativo para empresa de consultoria.',
    year: '2024',
    tags: ['Web', 'Estratégia', 'Conversão'],
    accent: '#43E6FF',
    placeholder: true,
  },
  {
    id: 'koda',
    name: 'KODA Coffee',
    kind: 'Landing page editorial para marca premium de café.',
    year: '2024',
    tags: ['E-commerce', 'Art Direction', 'Motion'],
    accent: '#F0A85B',
    placeholder: true,
  },
]

export const processSteps = [
  {
    n: '01',
    title: 'Descoberta',
    body: 'Entendemos sua empresa, público, objetivos e referências antes de qualquer traço.',
  },
  {
    n: '02',
    title: 'Estratégia',
    body: 'Definimos estrutura, conteúdo, direção visual e a experiência que o site precisa entregar.',
  },
  {
    n: '03',
    title: 'Design',
    body: 'Transformamos a estratégia em uma interface moderna, funcional e alinhada à sua marca.',
  },
  {
    n: '04',
    title: 'Desenvolvimento',
    body: 'Construímos o projeto com tecnologia moderna e foco em performance real.',
  },
  {
    n: '05',
    title: 'Revisão',
    body: 'Realizamos os ajustes necessários com você antes da publicação.',
  },
  {
    n: '06',
    title: 'Lançamento',
    body: 'Seu novo site entra no ar pronto para apresentar sua empresa ao mercado.',
  },
]

export const differentials = [
  'Projetos personalizados',
  'Design moderno',
  'Foco em resultado',
  'Responsividade completa',
  'Alta performance',
  'Comunicação direta',
  'Tecnologias atuais',
  'Atenção aos detalhes',
]

export const metrics = [
  { value: '100%', label: 'Projetos responsivos', kind: 'percent', target: 100 },
  { value: 'Performance', label: 'como prioridade em cada entrega', kind: 'text' },
  { value: '24/7', label: 'Seu site trabalhando pela sua empresa', kind: 'text' },
  { value: '+Impacto', label: 'na sua presença digital', kind: 'text' },
]

// Depoimentos FICTÍCIOS (placeholder) — SUBSTITUIR por depoimentos reais.
export const testimonials = [
  {
    quote:
      'A AJ Solutions Tech conseguiu transformar nossa ideia em um site muito mais profissional do que imaginávamos.',
    name: 'Cliente Exemplo',
    company: 'Empresa Exemplo',
    placeholder: true,
  },
  {
    quote:
      'O processo foi claro do começo ao fim. Recebemos um site rápido, bonito e que realmente traz contatos.',
    name: 'Cliente Exemplo',
    company: 'Empresa Exemplo',
    placeholder: true,
  },
  {
    quote:
      'Nosso site antigo não representava a empresa. O redesign mudou completamente a percepção da marca.',
    name: 'Cliente Exemplo',
    company: 'Empresa Exemplo',
    placeholder: true,
  },
]

export const faqs = [
  {
    q: 'Quanto tempo leva para criar um site?',
    a: 'O prazo depende da complexidade e da quantidade de páginas. Após entender o projeto, apresentamos uma estimativa clara antes de iniciar.',
  },
  {
    q: 'O site funciona no celular?',
    a: 'Sim. Todos os projetos são desenvolvidos com foco em responsividade e boa experiência em diferentes tamanhos de tela.',
  },
  {
    q: 'Posso solicitar alterações?',
    a: 'Sim. O processo inclui etapas de revisão para garantir que o resultado esteja alinhado ao projeto.',
  },
  {
    q: 'Vocês fazem landing pages?',
    a: 'Sim. Criamos landing pages para campanhas, anúncios, lançamentos, serviços e captação de leads.',
  },
  {
    q: 'Vocês também fazem manutenção?',
    a: 'Sim. Podemos realizar melhorias, atualizações e evolução do site após o lançamento.',
  },
]

export const projectTypes = ['Landing Page', 'Site Institucional', 'Redesign', 'Outro']
export const budgetRanges = [
  'Até R$ 2.000',
  'R$ 2.000 – R$ 5.000',
  'R$ 5.000 – R$ 10.000',
  'Acima de R$ 10.000',
  'Ainda não sei',
]

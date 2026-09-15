import { useEffect } from 'react'
import Projects from '../components/Projects'

export default function ProjectsPage() {
  useEffect(() => {
    // Ao abrir a página, começa no topo.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="pt-24 sm:pt-28">
      <Projects />
    </div>
  )
}

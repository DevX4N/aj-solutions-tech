import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Rola até a âncora indicada em location.hash sempre que a rota muda.
// Permite que links tipo `/#contato` funcionem vindo de qualquer página.
export default function useHashScroll() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }
    const id = hash.replace('#', '')
    // Duas tentativas em momentos diferentes: uma quase imediata (para hashes
    // já presentes no HTML inicial) e outra após ~350ms para casos em que a
    // seção-alvo ainda estava sendo montada por lazy components (BrowserMock,
    // CursorGrid, etc.). Rolagem final é sempre suave.
    const jump = () => {
      const el = document.getElementById(id)
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, left: 0, behavior: 'smooth' })
    }
    const t1 = setTimeout(jump, 60)
    const t2 = setTimeout(jump, 400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname, hash, key])
}

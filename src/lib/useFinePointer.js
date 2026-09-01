import { useEffect, useState } from 'react'

// True only on devices with a fine, hovering pointer (desktop mouse/trackpad).
// Used to gate desktop-only interactive effects — on touch devices the guarded
// component never mounts, so its lazy chunk is never downloaded.
const QUERY = '(hover: hover) and (pointer: fine)'

export default function useFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return fine
}

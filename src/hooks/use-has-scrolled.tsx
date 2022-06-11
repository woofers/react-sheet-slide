import { useEffect, useState } from 'react'
import { hasWindow } from '../utils'

const useHasScrolled = (ref: React.RefObject<Element>, reset: boolean) => {
  const [value, setValue] = useState(false)
  useEffect(() => {
    const elem = ref.current
    if (!elem || !hasWindow()) return
    let ticking = false
    let hasScrolled = false
    const update = () => {
      ticking = false
      setValue(hasScrolled)
    }
    const onScroll = () => {
      hasScrolled = elem.scrollTop > 0
      if (!ticking) requestAnimationFrame(update)
      ticking = true
    }
    elem.addEventListener('scroll', onScroll, false)
    elem.addEventListener('touchmove', onScroll, false)
    return () => {
      elem.removeEventListener('scroll', onScroll, false)
      elem.removeEventListener('touchmove', onScroll, false)
    }
  }, [ref])
  useEffect(() => {
    const elem = ref.current
    if (!elem || !hasWindow()) return
    const hasScrolled = elem.scrollTop > 0
    setValue(hasScrolled)
  }, [reset, ref])
  return value
}

export default useHasScrolled

import { useEffect, useState } from 'react'

const useHasScrolled = (ref: React.RefObject<Element>) => {
  const [value, setValue] = useState(false)
  useEffect(() => {
    const elem = ref.current
    if (!elem) return
    let ticking = false
    let hasScrolled = false
    const update = () => {
      ticking = false
      setValue(hasScrolled)
    }
    const onScroll = () => {
      if (typeof window === 'undefined') return
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
  return value
}

export default useHasScrolled

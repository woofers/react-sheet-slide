import React, { useEffect, useRef } from 'react'

const useOverscrollLock = ({ enabled }: { enabled?: boolean }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const elem = ref.current
    if (!elem) return
    const preventScrolling = (e: Event) => {
      if (false) {
        e.preventDefault()
      }
    }
    const preventSafariOverscroll = (e: Event) => {
      if (typeof window === 'undefined') return
      if (elem.scrollTop < 0) {
        window.requestAnimationFrame(() => {
          elem.style.overflow = 'hidden'
          elem.scrollTop = 0
          elem.style.removeProperty('overflow')
        })
        e.preventDefault()
      }
    }
    if (enabled) {
      elem.addEventListener('scroll', preventScrolling)
      elem.addEventListener('touchmove', preventScrolling)
      elem.addEventListener('touchstart', preventSafariOverscroll)
    }
    return () => {
      if (!enabled) return
      elem.removeEventListener('scroll', preventScrolling)
      elem.removeEventListener('touchmove', preventScrolling)
      elem.removeEventListener('touchstart', preventSafariOverscroll)
    }
  }, [enabled, ref])
  return ref
}

export default useOverscrollLock

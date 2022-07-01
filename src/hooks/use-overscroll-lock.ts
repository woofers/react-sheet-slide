import React, { useEffect, useRef } from 'react'
import { hasWindow } from '../utils'

const useOverscrollLock = ({
  enabled,
  preventScrollingRef
}: {
  enabled?: boolean
  preventScrollingRef?: React.RefObject<boolean>
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    console.log('scroll effect')
    const elem = ref.current
    if (!elem) return
    const preventScrolling = (e: Event) => {
      if (preventScrollingRef?.current) {
        e.preventDefault()
      }
    }
    const preventSafariOverscroll = (e: Event) => {
      if (!hasWindow()) return
      if (elem.scrollTop < 0) {
        requestAnimationFrame(() => {
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
  }, [enabled, ref, preventScrollingRef])
  return ref
}

export default useOverscrollLock

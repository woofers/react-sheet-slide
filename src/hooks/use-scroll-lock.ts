import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import React, { useEffect, useRef } from 'react'
import { noop } from '../utils'

type ScrollLockProps = {
  targetRef: React.RefObject<Element>
  enabled: boolean
}

type ScrollLockRefs = {
  a: () => void
  d: () => void
}

const noops = { a: noop, d: noop }

const useScrollLock = ({ targetRef, enabled }: ScrollLockProps) => {
  const ref = useRef<ScrollLockRefs>(noops)
  const lastScrollRef = useRef(0)
  useEffect(() => {
    const target = targetRef.current
    if (!target) return
    if (!enabled) {
      ref.current.d()
      ref.current = noops
      return
    }
    let active = false
    ref.current = {
      a: () => {
        if (active || !target) return
        active = true
        lastScrollRef.current = window.scrollY
        disableBodyScroll(target, {
          allowTouchMove: el => !!el.closest('[data-scroll-lock-ignore]'),
          reserveScrollBarGap: true
        })
        document.body.style.setProperty('top', `${window.scrollY * -1}px`)
      },
      d: () => {
        if (!active || !target) return
        active = false
        enableBodyScroll(target)
        document.body.style.setProperty('top', '')
        document.body.scrollTo(0, lastScrollRef.current)
      }
    }
    ref.current.a()
    return () => {
      ref.current.d()
    }
  }, [enabled, targetRef])
}

export default useScrollLock

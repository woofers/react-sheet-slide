import React, { useEffect, useRef } from 'react'
import { disableBodyScroll, enableBodyScroll } from '../body-scroll-lock'
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
        disableBodyScroll(target, {
          allowTouchMove: el => !!el.closest('[data-scroll-lock-ignore]'),
          reserveScrollBarGap: true
        })
      },
      d: () => {
        if (!active || !target) return
        active = false
        enableBodyScroll(target)
      }
    }
    ref.current.a()
    return () => {
      ref.current.d()
    }
  }, [enabled, targetRef])
}

export default useScrollLock

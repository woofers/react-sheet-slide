import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useEffect, useRef } from 'react'

type ScrollLockProps = {
  targetRef: React.RefObject<Element>
  enabled: boolean
}

type ScrollLockRefs = {
  activate: () => void
  deactivate: () => void
}

const noops = { activate: () => {}, deactivate: () => {} }

const useScrollLock = ({ targetRef, enabled }: ScrollLockProps) => {
  const ref = useRef<ScrollLockRefs>(noops)
  useEffect(() => {
    const target = targetRef.current
    if (!target) return
    if (!enabled) {
      ref.current.deactivate()
      ref.current = noops
      return
    }
    let active = false
    ref.current = {
      activate: () => {
        if (active || !target) return
        active = true
        disableBodyScroll(target, {
          allowTouchMove: el => !!el.closest('[data-body-scroll-lock-ignore]'),
          reserveScrollBarGap: true
        })
      },
      deactivate: () => {
        if (!active || !target) return
        active = false
        enableBodyScroll(target)
      }
    }
    ref.current.activate()
    return () => {
      ref.current.deactivate()
    }
  }, [enabled, targetRef])
}

export default useScrollLock

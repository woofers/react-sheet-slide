/*
 * body-scroll-lock
 * Modified for TypeScript
 * ------------------------------
 * From: https://github.com/willmcpo/body-scroll-lock/blob/master/src/bodyScrollLock.js
 * MIT License at https://github.com/willmcpo/body-scroll-lock/blob/master/LICENSE
 */

import { setRef, getOwnerDocument, isIosDevice } from './utils'

type BodyScrollOptions = {
  reserveScrollBarGap?: boolean
  allowTouchMove?: ((el: HTMLElement | Element) => boolean) | undefined
}

type Lock = {
  targetElement: any
  options: BodyScrollOptions
}

// Older browsers don't support event options, feature detect it.
let hasPassiveEvents = false
if (typeof window !== 'undefined') {
  const passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true
      return undefined
    },
  }
  window.addEventListener('testPassive' as any, null as any, passiveTestOptions as any)
  window.removeEventListener('testPassive' as any, null as any, passiveTestOptions as any)
}

type HandleScrollEvent = TouchEvent

let locks: Array<Lock> = []
let documentListenerAdded: boolean = false
let initialClientY: number = -1
let previousBodyOverflowSetting: any
let previousBodyPosition: any
let previousBodyPaddingRight: any

// returns true if `el` should be allowed to receive touchmove events.
const allowTouchMove = (el: any): boolean =>
  locks.some(lock => lock.options.allowTouchMove && lock.options.allowTouchMove(el))

const preventDefault = (rawEvent: HandleScrollEvent): boolean => {
  const e = rawEvent || window.event

  // For the case whereby consumers adds a touchmove event listener to document.
  // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
  // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
  // the touchmove event on document will break.
  if (allowTouchMove(e.target!)) return true

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1) return true

  if (e.preventDefault) e.preventDefault()

  return false
}

const setOverflowHidden = (options?: BodyScrollOptions) => {
  // If previousBodyPaddingRight is already set, don't set it again.
  if (previousBodyPaddingRight === undefined) {
    const reserveScrollBarGap = !!options && options.reserveScrollBarGap === true
    const scrollBarGap = window.innerWidth - document.documentElement.clientWidth

    if (reserveScrollBarGap && scrollBarGap > 0) {
      const computedBodyPaddingRight = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'), 10)
      previousBodyPaddingRight = document.body.style.paddingRight
      document.body.style.paddingRight = `${computedBodyPaddingRight + scrollBarGap}px`
    }
  }

  // If previousBodyOverflowSetting is already set, don't set it again.
  if (previousBodyOverflowSetting === undefined) {
    previousBodyOverflowSetting = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
}

const restoreOverflowSetting = () => {
  if (previousBodyPaddingRight !== undefined) {
    document.body.style.paddingRight = previousBodyPaddingRight as any

    // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
    // can be set again.
    previousBodyPaddingRight = undefined
  }

  if (previousBodyOverflowSetting !== undefined) {
    document.body.style.overflow = previousBodyOverflowSetting

    // Restore previousBodyOverflowSetting to undefined
    // so setOverflowHidden knows it can be set again.
    previousBodyOverflowSetting = undefined
  }
}

const setPositionFixed = () => window.requestAnimationFrame(() => {
  // If previousBodyPosition is already set, don't set it again.
  if (previousBodyPosition === undefined) {
    previousBodyPosition = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left
    }

    // Update the dom inside an animation frame
    const { scrollY, scrollX, innerHeight } = window
    document.body.style.position = 'fixed'
    document.body.style.top = `${-scrollY}px`
    document.body.style.left = `${-scrollX}px`

    setTimeout(() => window.requestAnimationFrame(() => {
      // Attempt to check if the bottom bar appeared due to the position change
      const bottomBarHeight = innerHeight - window.innerHeight
      if (bottomBarHeight && scrollY >= innerHeight) {
        // Move the content further up so that the bottom bar doesn't hide it
        document.body.style.top = `-${(scrollY + bottomBarHeight)}px`
      }
    }), 300)
  }
})

const restorePositionSetting = () => {
  if (previousBodyPosition !== undefined) {
    // Convert the position from "px" to Int
    const y = -parseInt(document.body.style.top, 10)
    const x = -parseInt(document.body.style.left, 10)

    // Restore styles
    document.body.style.position = previousBodyPosition.position
    document.body.style.top = previousBodyPosition.top
    document.body.style.left = previousBodyPosition.left

    // Restore scroll
    window.scrollTo(x, y)

    previousBodyPosition = undefined
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
const isTargetElementTotallyScrolled = (targetElement: HTMLElement | Element): boolean =>
  targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false

const handleScroll = (event: HandleScrollEvent, targetElement: HTMLElement | Element): boolean => {
  const clientY = event.targetTouches[0].clientY - initialClientY
  if (allowTouchMove(event.target!)) return false
  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    // element is at the top of its scroll.
    return preventDefault(event)
  }
  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    // element is at the bottom of its scroll.
    return preventDefault(event)
  }
  event.stopPropagation()
  return true
}

export const disableBodyScroll = (targetElement: HTMLElement | Element, options?: BodyScrollOptions): void => {
  // targetElement must be provided
  if (!targetElement) return

  // disableBodyScroll must not have been called on this targetElement before
  if (locks.some(lock => lock.targetElement === targetElement)) return

  const lock = {
    targetElement,
    options: options || {},
  }

  locks = [...locks, lock]

  if (isIosDevice()) {
    setPositionFixed()
  } else {
    setOverflowHidden(options)
  }

  if (isIosDevice()) {
    (targetElement as HTMLElement).ontouchstart = (event: HandleScrollEvent) => {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        initialClientY = event.targetTouches[0].clientY
      }
    }
    (targetElement as HTMLElement).ontouchmove = (event: HandleScrollEvent) => {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        handleScroll(event, targetElement)
      }
    }

    if (!documentListenerAdded) {
      document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined)
      documentListenerAdded = true
    }
  }
}

export const enableBodyScroll = (targetElement: HTMLElement | Element): void => {
  if (!targetElement) return
  locks = locks.filter(lock => lock.targetElement !== targetElement)

  if (isIosDevice()) {
    const el: any = targetElement
    el.ontouchstart = null
    el.ontouchmove = null

    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener('touchmove', preventDefault, (hasPassiveEvents ? { passive: false } : undefined) as any)
      documentListenerAdded = false
    }
  }

  if (isIosDevice()) {
    restorePositionSetting()
  } else {
    restoreOverflowSetting()
  }
}

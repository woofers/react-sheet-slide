import React, { useCallback, useState, useEffect, useRef } from 'react'
import { animated } from '@react-spring/web'
import { rubberbandIfOutOfBounds, useDrag } from 'react-use-gesture'
import {
  useLayoutEffect,
  useReady,
  useSnapPoints,
  useSpring,
  useSpringInterpolations,
  useOverscrollLock,
  useScrollLock
} from './hooks'
import { config } from './utils'
import TrapFocus from './trap-focus'
import classes from './classnames'
import styles from './sheet.module.css'
import {
  SnapPointProps,
  DefaultSnapProps,
  SnapPoints,
  ResizeSource
} from './types'

const cx = classes.bind(styles)

function _defaultSnap({ snapPoints, lastSnap }: DefaultSnapProps) {
  return lastSnap ?? Math.min(...snapPoints)
}
function _snapPoints({ minHeight }: SnapPointProps) {
  return minHeight
}

type Callbacks = {
  onClose: () => void
}

type BaseProps = {
  onDismiss?: () => void
  open?: boolean
  children?: React.ReactNode
  expandOnContentDrag?: boolean
  snapPoints?: SnapPoints
  defaultSnap?: number | ((props: DefaultSnapProps) => number)
  useModal?: boolean
}

type SheetProps = Partial<Callbacks> & BaseProps

type InteralSheetProps = Callbacks & BaseProps & { close: () => void }

const { tension, friction } = config.default

const Sheet: React.FC<InteralSheetProps> = ({
  open,
  children,
  expandOnContentDrag,
  onDismiss,
  onClose,
  close,
  defaultSnap: getDefaultSnap = _defaultSnap,
  snapPoints: getSnapPoints = _snapPoints,
  useModal = true
}) => {
  const enabled = !useModal
  const { ready, registerReady } = useReady()
  const scroll = useOverscrollLock({ enabled: expandOnContentDrag && enabled })
  useScrollLock({ enabled, targetRef: scroll })
  const contentRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const footerRef = useRef<HTMLDivElement | null>(null)
  const [spring, set] = useSpring()
  const interpolations = useSpringInterpolations({ spring })
  const resizeSourceRef = useRef<ResizeSource>()
  const lastSnapRef = useRef<any>(null)
  const heightRef = useRef<number>()
  const { minSnap, maxSnap, maxHeight, findSnap } = useSnapPoints({
    contentRef,
    controlledMaxHeight: undefined,
    footerRef,
    getSnapPoints,
    headerRef,
    heightRef,
    lastSnapRef,
    ready,
    registerReady,
    resizeSourceRef
  })
  const minSnapRef = useRef<number>()
  const maxSnapRef = useRef<number>()
  const maxHeightRef = useRef<number>()
  const findSnapRef = useRef<any>(findSnap)
  const defaultSnapRef = useRef<number>(0)
  useLayoutEffect(() => {
    maxHeightRef.current = maxHeight
    maxSnapRef.current = maxSnap
    minSnapRef.current = minSnap
    findSnapRef.current = findSnap
    defaultSnapRef.current = findSnap(getDefaultSnap)
  }, [findSnap, getDefaultSnap, maxHeight, maxSnap, minSnap])
  const asyncSet = useCallback<typeof set>(
    // @ts-expect-error
    ({ onRest, config: { velocity = 1, ...config } = {}, ...opts }) =>
      // @ts-expect-error
      new Promise(resolve =>
        set({
          ...opts,
          config: {
            velocity,
            ...config,
            // @see https://springs.pomb.us
            mass: 1,
            // "stiffness"
            tension,
            // "damping"
            friction: Math.max(
              friction,
              friction + (friction - friction * velocity)
            )
          },
          onRest: (...args) => {
            resolve(args)
          }
        })
      ),
    [set]
  )
  useEffect(() => {
    if (!ready) return
    let subscribed = true
    if (open) {
      const anim = async () => {
        if (!subscribed || !enabled) return
        await asyncSet({
          y: 0,
          ready: 1,
          maxHeight: maxHeightRef.current,
          maxSnap: maxSnapRef.current,
          // Using defaultSnapRef instead of minSnapRef to avoid animating `height` on open
          minSnap: defaultSnapRef.current,
          immediate: true
        })
        if (!subscribed) return
        heightRef.current = defaultSnapRef.current
        if (!subscribed) return
        await asyncSet({
          y: defaultSnapRef.current,
          ready: 1,
          maxHeight: maxHeightRef.current,
          maxSnap: maxSnapRef.current,
          // Using defaultSnapRef instead of minSnapRef to avoid animating `height` on open
          minSnap: defaultSnapRef.current,
          immediate: false
        })
      }
      anim()
    } else {
      const animate = async () => {
        if (!enabled) {
          close()
          return
        }
        if (!subscribed) return
        asyncSet({
          minSnap: heightRef.current,
          immediate: true
        })

        if (!subscribed) return
        heightRef.current = 0
        if (!subscribed) return

        await asyncSet({
          y: 0,
          maxHeight: maxHeightRef.current,
          maxSnap: maxSnapRef.current,
          immediate: false
        })
        if (!subscribed) return
        await asyncSet({ ready: 0, immediate: true })
        if (!subscribed) return
        close()
      }
      animate()
    }
    return () => {
      subscribed = false
    }
  }, [set, open, ready])
  useEffect(() => {
    return () => {
      onClose()
    }
  }, [])
  const handleDrag = ({
    args: [{ closeOnTap = false, isContentDragging = false } = {}] = [],
    cancel,
    direction: [, direction],
    down,
    first,
    last,
    memo = spring.y.get() as number,
    movement: [, _my],
    tap,
    velocity
  }: any) => {
    if (!enabled) return memo
    if (onDismiss && closeOnTap && tap) {
      cancel()
      setTimeout(() => onDismiss(), 0)
      return memo
    }
    if (tap) return memo
    const my = _my * -1
    const rawY = memo + my
    const predictedDistance = my * velocity
    const predictedY = Math.max(
      minSnapRef.current!,
      Math.min(maxSnapRef.current!, rawY + predictedDistance * 2)
    )
    if (
      !down &&
      onDismiss &&
      direction > 0 &&
      rawY + predictedDistance < (minSnapRef.current!) / 2
    ) {
      cancel()
      onDismiss()
      return memo
    }
    let newY = down
      ? minSnapRef.current === maxSnapRef.current
        ? rawY < minSnapRef.current!
          ? rubberbandIfOutOfBounds(
              rawY,
              minSnapRef.current!,
              maxSnapRef.current! * 2,
              0.55
            )
          : rubberbandIfOutOfBounds(
              rawY,
              (minSnapRef.current!) / 2,
              maxSnapRef.current!,
              0.55
            )
        : rubberbandIfOutOfBounds(
            rawY,
            minSnapRef.current!,
            maxSnapRef.current!,
            0.55
          )
      : predictedY

    if (expandOnContentDrag && isContentDragging) {
      if (newY >= maxSnapRef.current!) {
        newY = maxSnapRef.current!
      }
      if (memo === maxSnapRef.current! && scroll.current!.scrollTop > 0) {
        newY = maxSnapRef.current!
      }
    }
    if (first) {
    }

    if (last) {
      const snap = findSnapRef.current(newY)
      heightRef.current = snap
      lastSnapRef.current = snap
      set({
        ready: 1,
        maxHeight: maxHeightRef.current,
        maxSnap: maxSnapRef.current,
        minSnap: minSnapRef.current,
        immediate: false,
        y: snap,
        config: { velocity: velocity > 0.05 ? velocity : 1 }
      })
      return memo
    }
    set({
      y: newY,
      ready: 1,
      maxHeight: maxHeightRef.current,
      maxSnap: maxSnapRef.current,
      minSnap: minSnapRef.current,
      immediate: true,
      config: { velocity }
    })
    return memo
  }
  const bind = useDrag(handleDrag, {
    filterTaps: true
  })
  const prefix = enabled ? 'sheet' : 'modal'
  return (
    <animated.div
      className={cx(`${prefix}-root`)}
      style={{
        ...interpolations
      }}
    >
      <div
        className={cx(`${prefix}-backdrop`, `${prefix}-stack`)}
        {...bind({ closeOnTap: true })}
      ></div>
      <TrapFocus open>
        <div
          className={cx(`${prefix}-modal`, `${prefix}-stack`)}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          onKeyDown={event => {
            if (event.key === 'Escape') {
              event.stopPropagation()
              if (onDismiss) onDismiss()
            }
          }}
        >
          <div className={cx(`${prefix}-header`)} {...bind()} ref={headerRef}></div>
          <div
            className={cx(`${prefix}-scroll`)}
            {...(expandOnContentDrag ? bind({ isContentDragging: true }) : {})}
            ref={scroll}
          >
            <div className={cx(`${prefix}-content`)} ref={contentRef}>
              {children}
            </div>
          </div>
          <div className={cx(`${prefix}-footer`)} {...bind()} ref={footerRef}></div>
        </div>
      </TrapFocus>
    </animated.div>
  )
}

const noop = () => {}

const SheetWrapper: React.FC<SheetProps> = ({
  open: propOpen,
  onDismiss,
  onClose = noop,
  ...rest
}) => {
  const [open, setOpen] = useState(propOpen)
  useEffect(() => {
    if (!propOpen) return
    setOpen(propOpen)
  }, [propOpen])
  const close = () => {
    setOpen(false)
  }
  if (!open) return null
  return (
    <Sheet
      open={propOpen}
      onDismiss={onDismiss}
      onClose={onClose}
      close={close}
      {...rest}
    />
  )
}

export default SheetWrapper

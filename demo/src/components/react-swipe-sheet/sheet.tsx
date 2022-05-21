import React, { useCallback, useState, useEffect, useRef } from 'react'
import { animated } from '@react-spring/web'
import { rubberbandIfOutOfBounds, useDrag } from 'react-use-gesture'
import {
  useSpring,
  useSpringInterpolations,
  useOverscrollLock,
  useScrollLock
} from './hooks'
import { config } from './utils'
import TrapFocus from './trap-focus'
import classes from './classnames'
import styles from './sheet.module.css'

const cx = classes.bind(styles)

type SheetProps = {
  open?: boolean
  children?: React.ReactNode
  expandOnContentDrag?: boolean
  onDismiss?: () => void
  onClose?: () => void
}

const { tension, friction } = config.default

// type ResizeSource = 'window' | 'maxheightprop' | 'element'

const Sheet: React.FC<SheetProps & { close: () => void }> = ({
  open,
  children,
  expandOnContentDrag,
  onDismiss,
  onClose,
  close
}) => {
  const scroll = useOverscrollLock({ enabled: expandOnContentDrag })
  useScrollLock({ enabled: true, targetRef: scroll })
  const contentRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const footerRef = useRef<HTMLDivElement | null>(null)
  const minSnapRef = useRef<number>(200)
  const maxSnapRef = useRef<number>(500)
  const heightRef = useRef<number>(500)
  const maxHeightRef = useRef<number>(650)
  //const resizeSourceRef = useRef<ResizeSource>()
  const [spring, set] = useSpring()
  const interpolations = useSpringInterpolations({ spring })
  const asyncSet = useCallback<typeof set>(
    // @ts-expect-error
    ({ onRest, config: { velocity = 1, ...config } = {}, ...opts }) =>
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
            resolve(...args)
          }
        })
      ),
    [set]
  )
  useEffect(() => {
    let subscribed = true
    if (open) {
      set({
        y: 500,
        ready: 1,
        maxHeight: maxHeightRef.current,
        maxSnap: maxSnapRef.current,
        // Using defaultSnapRef instead of minSnapRef to avoid animating `height` on open
        minSnap: minSnapRef.current,
        immediate: false
      })
    } else {
      const animate = async () => {
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
  }, [set, open])
  useEffect(() => {
    return () => {
      onClose()
    }
  }, [])
  const handleDrag = ({
    args: [{ closeOnTap = false, isContentDragging = false } = {}] = [],
    cancel,
    //direction: [, direction],
    down,
    first,
    last,
    memo = spring.y.get() as number,
    movement: [, _my],
    tap,
    velocity
  }: any) => {
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
      minSnapRef.current,
      Math.min(maxSnapRef.current, rawY + predictedDistance * 2)
    )
    let newY = down
      ? minSnapRef.current === maxSnapRef.current
        ? rawY < minSnapRef.current
          ? rubberbandIfOutOfBounds(
              rawY,
              minSnapRef.current,
              maxSnapRef.current * 2,
              0.55
            )
          : rubberbandIfOutOfBounds(
              rawY,
              minSnapRef.current / 2,
              maxSnapRef.current,
              0.55
            )
        : rubberbandIfOutOfBounds(
            rawY,
            minSnapRef.current,
            maxSnapRef.current,
            0.55
          )
      : predictedY

    if (expandOnContentDrag && isContentDragging) {
      if (newY >= maxSnapRef.current) {
        newY = maxSnapRef.current
      }
      if (memo === maxSnapRef.current && scroll.current!.scrollTop > 0) {
        newY = maxSnapRef.current
      }
    }
    if (first) {
    }

    if (last) {
      const snap = newY
      heightRef.current = snap
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
  return (
    <animated.div
      className={cx('root')}
      style={{
        ...interpolations
      }}
    >
      <div
        className={cx('backdrop', 'stack')}
        {...bind({ closeOnTap: true })}
      ></div>
      <TrapFocus open>
        <div
          className={cx('modal', 'stack')}
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
          <div className={cx('header')} {...bind()} ref={headerRef}></div>
          <div
            className={cx('scroll')}
            {...(expandOnContentDrag ? bind({ isContentDragging: true }) : {})}
            ref={scroll}
          >
            <div className={cx('content')} ref={contentRef}>
              {children}
            </div>
          </div>
          <div className={cx('footer')} {...bind()} ref={footerRef}></div>
        </div>
      </TrapFocus>
    </animated.div>
  )
}

const noop = () => {}

const SheetWrapper: React.FC<SheetProps> = ({
  open: propOpen,
  onDismiss: onDismissInitial,
  onClose = noop,
  ...rest
}) => {
  const [open, setOpen] = useState(propOpen)
  useEffect(() => {
    if (!propOpen) return
    setOpen(propOpen)
  }, [propOpen])
  const onDismiss = () => {
    onDismissInitial()
  }
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

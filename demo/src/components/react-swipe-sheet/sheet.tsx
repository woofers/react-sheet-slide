import React, {
  Children,
  Fragment,
  useCallback,
  useState,
  useEffect,
  useRef
} from 'react'
import { animated } from '@react-spring/web'
import { rubberbandIfOutOfBounds, useDrag } from 'react-use-gesture'
import {
  useLayoutEffect,
  useReady,
  useSnapPoints,
  useSpring,
  useSpringInterpolations,
  useOverscrollLock,
  useScrollLock,
  useMediaQuery,
  useReducedMotion
} from './hooks'
import TrapFocus from './trap-focus'
import classes from './classnames'
import styles from './sheet.module.css'
import {
  SnapPointProps,
  DefaultSnapProps,
  SnapPoints,
  ResizeSource
} from './types'

type WrapperProps = {
  children?: React.ReactNode
}

const makeEmpty = (name: string) => {
  const val: React.FC<WrapperProps> = ({ children }) => (
    <Fragment>{children}</Fragment>
  )
  val.displayName = name
  return val
}

export const Header = makeEmpty('header')
export const Content = makeEmpty('content')
export const Footer = makeEmpty('footer')

const cx = classes.bind(styles)

const _defaultSnap = ({ snapPoints, lastSnap }: DefaultSnapProps) =>
  lastSnap ?? Math.min(...snapPoints)

const _snapPoints = ({ minHeight }: SnapPointProps) => minHeight

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

export type SheetProps = Partial<Callbacks> & BaseProps

type InteralSheetProps = Callbacks & BaseProps & { close: () => void }

const getItem = (
  Component: React.ComponentType<WrapperProps>,
  content: React.ReactNode[]
) =>
  content.filter(
    child =>
      child &&
      typeof child === 'object' &&
      'type' in child &&
      child.type === Component
  )

const BaseSheet: React.FC<InteralSheetProps> = ({
  open,
  children,
  expandOnContentDrag,
  onDismiss,
  onClose,
  close,
  defaultSnap: getDefaultSnap = _defaultSnap,
  snapPoints: getSnapPoints = _snapPoints,
  useModal: useModalInitial
}) => {
  const bq = useMediaQuery('(max-width: 640px)')
  const useModal =
    typeof useModalInitial !== 'undefined' ? useModalInitial : !bq
  const enabled = !useModal
  const prefersReducedMotion = useReducedMotion()
  const content = Children.toArray(children)
  const headerContent = getItem(Header, content)
  const scrollContent = getItem(Content, content)
  const footerContent = getItem(Footer, content)
  const { ready, registerReady } = useReady()
  const scroll = useOverscrollLock({ enabled: expandOnContentDrag && enabled })
  useScrollLock({ enabled: true, targetRef: scroll })
  const contentRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const footerRef = useRef<HTMLDivElement | null>(null)
  const [spring, set, asyncSet] = useSpring()
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
          immediate: prefersReducedMotion
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
          immediate: prefersReducedMotion
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
  }, [set, asyncSet, open, ready, enabled, close])
  useEffect(() => {
    return () => {
      onClose()
    }
  }, [onClose])
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
      rawY + predictedDistance < minSnapRef.current! / 2
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
              minSnapRef.current! / 2,
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
        immediate: prefersReducedMotion,
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
          <div className={cx(`${prefix}-header`)} {...bind()} ref={headerRef}>
            {headerContent}
          </div>
          <div
            className={cx(`${prefix}-scroll`)}
            {...(expandOnContentDrag ? bind({ isContentDragging: true }) : {})}
            ref={scroll}
          >
            <div
              className={cx(`${prefix}-content`)}
              ref={contentRef}
              tabIndex={-1}
            >
              {scrollContent}
            </div>
          </div>
          <div className={cx(`${prefix}-footer`)} {...bind()} ref={footerRef}>
            {footerContent}
          </div>
        </div>
      </TrapFocus>
    </animated.div>
  )
}

const noop = () => {}

export const Sheet: React.FC<SheetProps> = ({
  open,
  onDismiss,
  onClose: onCloseProp = noop,
  ...rest
}) => {
  const [mounted, setMounted] = useState(open)
  useEffect(() => {
    if (!open) return
    setMounted(open)
  }, [open])
  const close = useCallback(() => {
    setMounted(false)
  }, [])
  const onClose = useCallback(() => {
    onCloseProp()
  }, [onCloseProp])
  if (!mounted) return null
  return (
    <BaseSheet
      open={open}
      onDismiss={onDismiss}
      onClose={onClose}
      close={close}
      {...rest}
    />
  )
}

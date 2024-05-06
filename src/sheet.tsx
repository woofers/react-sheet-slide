import React, {
  forwardRef,
  Children,
  Fragment,
  useCallback,
  useState,
  useEffect,
  useRef
} from 'react'
import { animated } from '@react-spring/web'
import { rubberbandIfOutOfBounds, useDrag } from '@use-gesture/react'
import {
  useLayoutEffect,
  useReady,
  useSnapPoints,
  useSpring,
  useSpringInterpolations,
  useOverscrollLock,
  useScrollLock,
  useMediaQuery,
  useReducedMotion,
  useColorScheme,
  useHasScrolled,
  useAriaHidden
} from './hooks'
import TrapFocus from './trap-focus'
import Body from './body'
import classes from './classnames'
import styles from './sheet.module.css'
import { noop } from './utils'
import type {
  ResizeSource,
  SelectedDetentsProps,
  Detents,
  PredefinedDetents,
  SelectedDetent
} from './types'

const Notch: React.FC<{ className?: string }> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="6"
    viewBox="0 0 36 6"
    aria-hidden
    {...props}
  >
    <path
      d="M 33.33 0 C 34.81 0 36 1.34 36 3 C 36 3 36 3 36 3 C 36 4.66 34.81 5 30 5 C 33.33 5 2.67 5 6 5 C 1.19 5 0 4.66 0 3 C 0 3 0 3 0 3 C 0 1.34 1.19 0 2.67 0 C 2.67 0 33.33 0 33.33 0 Z"
      fill="currentColor"
    />
  </svg>
)

type AugmentedMouseEvent = MouseEvent & { mozInputSource?: number }

const isKeyboardNav = (e: React.MouseEvent) => {
  const native: AugmentedMouseEvent = e.nativeEvent ?? empty
  return (
    native.mozInputSource === 6 ||
    e.detail <= 0 ||
    (e.screenX === 0 && e.screenY === 0)
  )
}

const empty = {}

type WrapperProps = {
  children?: React.ReactNode
  className?: string
}

type HeaderWrapperProps = WrapperProps & {
  scrolledClassName?: string
}

const makeEmpty = (name?: string) => {
  const val: React.FC<WrapperProps> = ({ children }) => (
    <Fragment>{children}</Fragment>
  )
  if (__isDev__) {
    val.displayName = name
  }
  return val
}

export const Header = __isDev__
  ? (makeEmpty('Header') as React.FC<HeaderWrapperProps>)
  : (makeEmpty() as React.FC<HeaderWrapperProps>)
export const Content = __isDev__ ? makeEmpty('Content') : makeEmpty()
export const Footer = __isDev__ ? makeEmpty('Footer') : makeEmpty()

const cx = classes.bind(styles)
const clsx = (...args: ({} | undefined | null)[]) =>
  args.filter(Boolean).join(' ')

const _selectedDetent = ({ detents, lastDetent }: SelectedDetentsProps) =>
  lastDetent ?? Math.min(...detents)

type DetentSize = 'medium' | 'large' | 'fit'

export const detents: Record<DetentSize, PredefinedDetents> = {
  large: ({ maxHeight }) => maxHeight - maxHeight * 0.1,
  medium: ({ maxHeight }) => maxHeight - maxHeight * 0.495,
  fit: ({ minHeight }) => minHeight
}

type Callbacks = {
  onClose: () => void
}

type BaseProps = {
  onDismiss?: () => void
  open?: boolean
  children?: React.ReactNode
  scrollingExpands?: boolean
  detents?: Detents
  selectedDetent?: SelectedDetent
  useModal?: boolean
  useDarkMode?: boolean
  velocity?: number
  showBackDrop?: boolean
}

type InteralSheetProps = Callbacks & BaseProps & { close: () => void }

export type SheetProps = Partial<Callbacks> & BaseProps

const getItem = (
  Component: React.ComponentType<WrapperProps>,
  content: React.ReactNode[]
) => {
  const elm = content.filter(
    child =>
      child &&
      typeof child === 'object' &&
      'type' in child &&
      child.type === Component
  )
  if (elm.length <= 0) return []
  const base = elm?.[0] as {
    props?: { className?: string; scrolledClassName?: string }
  }
  return [elm, base?.props?.className, base?.props?.scrolledClassName] as [
    React.ReactNode,
    string | undefined,
    string | undefined
  ]
}

type DragHeaderProps = React.HTMLProps<HTMLDivElement> & {
  children: React.ReactNode
  prefix: string
  scrollRef: React.RefObject<Element>
  useModal: boolean
  scrolledClassName?: string
}
const DragHeader = forwardRef<HTMLDivElement, DragHeaderProps>(
  (
    {
      children,
      prefix,
      scrollRef,
      useModal,
      className,
      scrolledClassName,
      ...props
    },
    ref
  ) => {
    const hasScrolled = useHasScrolled(scrollRef, useModal)
    return (
      <div
        {...props}
        className={clsx(
          cx(`${prefix}-header`, !hasScrolled && `${prefix}-header-plain`),
          className,
          hasScrolled && scrolledClassName
        )}
        ref={ref}
      >
        <Notch className={cx(`${prefix}-handle`)} />
        {children}
      </div>
    )
  }
)

if (__isDev__) {
  DragHeader.displayName = 'DragHeader'
}

const BaseSheet = forwardRef<HTMLDivElement, InteralSheetProps>(
  (
    {
      open,
      children,
      scrollingExpands,
      onDismiss,
      onClose,
      close,
      detents: getDetents = detents.fit,
      selectedDetent: getSelectedDetent = _selectedDetent,
      useModal: useModalInitial,
      useDarkMode: useDarkModeInitial,
      velocity = 1,
      showBackDrop = true,
      ...rest
    },
    ref
  ) => {
    const isOpenRef = useRef(false)
    const preventScrollingRef = useRef(false)
    const bq = useMediaQuery('(max-width: 640px)')
    const colorScheme = useColorScheme()
    const useModal =
      typeof useModalInitial !== 'undefined' ? useModalInitial : !bq
    const useDarkMode =
      typeof useDarkModeInitial !== 'undefined'
        ? useDarkModeInitial
        : colorScheme
    const enabled = !useModal
    const prefersReducedMotion = useReducedMotion()
    const content = Children.toArray(children)
    const [headerContent, headerClass, headerScrolledClass] = getItem(
      Header,
      content
    )
    const [scrollContent, scrollClass] = getItem(Content, content)
    const [footerContent, footerClass] = getItem(Footer, content)
    const { ready, registerReady } = useReady()
    const scroll = useOverscrollLock({
      enabled: scrollingExpands && enabled,
      preventScrollingRef
    })
    useScrollLock({ enabled: true, targetRef: scroll })
    useAriaHidden(scroll)

    const contentRef = useRef<HTMLDivElement | null>(null)
    const headerRef = useRef<HTMLDivElement | null>(null)
    const footerRef = useRef<HTMLDivElement | null>(null)

    const [spring, set, asyncSet] = useSpring({ velocity })
    const { modal, backdrop } = useSpringInterpolations({ spring })

    const resizeSourceRef = useRef<ResizeSource>()
    const lastDetentRef = useRef<any>(null)
    const heightRef = useRef<number>()
    const { minSnap, maxSnap, maxHeight, findSnap } = useSnapPoints({
      contentRef,
      controlledMaxHeight: undefined,
      footerRef,
      getSnapPoints: getDetents,
      headerRef,
      heightRef,
      lastSnapRef: lastDetentRef,
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
      defaultSnapRef.current = findSnap(getSelectedDetent)
    }, [findSnap, getSelectedDetent, maxHeight, maxSnap, minSnap])

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
          if (!subscribed) return
          isOpenRef.current = true
        }
        anim()
      } else {
        const animate = async () => {
          if (!enabled) {
            close()
            return
          }
          if (!subscribed) return
          isOpenRef.current = false
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
    }, [])
    useLayoutEffect(() => {
      if ((maxHeight || maxSnap || minSnap) && ready) {
        const snap = findSnapRef.current(heightRef.current)
        heightRef.current = snap
        lastDetentRef.current = snap
        set({
          y: snap,
          ready: 1,
          maxHeight: maxHeightRef.current,
          maxSnap: maxSnapRef.current,
          minSnap: minSnapRef.current,
          immediate:
            resizeSourceRef.current === 'element'
              ? prefersReducedMotion
              : isOpenRef.current
        })
      }
    }, [maxHeight, maxSnap, minSnap, set, ready])
    const handleDrag = ({
      args: [{ closeOnTap = false, isContentDragging = false } = {}] = [],
      cancel,
      direction: [, direction],
      down,
      last,
      memo = { memo: spring.y.get() as number, last: spring.y.get() as number },
      movement: [, _my],
      tap,
      velocity: [, velocity]
    }: any) => {
      if (!open || !isOpenRef.current) return memo
      if (onDismiss && closeOnTap && tap) {
        isOpenRef.current = false
        cancel()
        setTimeout(() => onDismiss(), 0)
        return memo
      }
      if (tap) return memo
      const my = _my * -1
      const rawY = memo.memo + my
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
      const bottom = 80
      let newY = down
        ? !onDismiss && minSnapRef.current === maxSnapRef.current
          ? rawY < minSnapRef.current!
            ? rubberbandIfOutOfBounds(
                rawY,
                bottom,
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
              rawY < minSnapRef.current! ? bottom : minSnapRef.current!,
              maxSnapRef.current!,
              0.55
            )
        : predictedY

      if (newY >= maxSnapRef.current!) {
        newY = maxSnapRef.current!
      }

      if (scrollingExpands && isContentDragging) {
        if (
          memo.memo === maxSnapRef.current! &&
          scroll.current!.scrollTop > 0
        ) {
          newY = maxSnapRef.current!
        }
        preventScrollingRef.current = newY < maxSnapRef.current!
      } else {
        preventScrollingRef.current = false
      }

      const animate = (y: number, immediate: boolean, velocity: number) => {
        set({
          ready: 1,
          maxHeight: maxHeightRef.current,
          maxSnap: maxSnapRef.current,
          minSnap: minSnapRef.current,
          immediate,
          y,
          config: { velocity }
        })
        return { memo: memo.memo, last: y }
      }
      if (last) {
        const fudge = 5
        if (
          memo.last >= memo.memo &&
          memo.last >= maxSnapRef.current! - fudge
        ) {
          cancel()
          return memo
        }
        const snap = findSnapRef.current(newY)
        if (
          onDismiss &&
          rawY + predictedDistance < minSnapRef.current! / 2 &&
          snap === minSnapRef.current
        ) {
          cancel()
          onDismiss()
          return { memo: memo.memo, last: memo.last }
        }
        heightRef.current = snap
        lastDetentRef.current = snap
        return animate(
          snap,
          prefersReducedMotion,
          velocity > 0.05 ? velocity : 1
        )
      }
      return animate(newY, true, velocity)
    }
    const bind = useDrag(handleDrag, {
      filterTaps: true,
      preventDefault: false,
      enabled: enabled && ready
    })
    const bindEvents = useCallback(
      ({
        isContentDragging,
        closeOnTap
      }: {
        isContentDragging?: boolean
        closeOnTap?: boolean
      } = empty) => {
        if (enabled) {
          const {
            onKeyDown,
            onKeyUp,
            onClickCapture: onCapture,
            ...rest
          } = bind({ isContentDragging, closeOnTap })
          const data = onCapture
            ? {
                onClickCapture: (e: React.MouseEvent) => {
                  if (!isKeyboardNav(e)) return onCapture(e)
                }
              }
            : empty
          return { ...rest, ...data }
        }
        if (!closeOnTap) return empty
        return {
          onClick: () => {
            if (onDismiss) onDismiss()
          }
        }
      },
      [bind, enabled, onDismiss]
    )
    const prefix = enabled ? 'sheet' : 'modal'
    const mode = useDarkMode ? 'dark' : 'light'
    return (
      <>
        {!useModal && (
          <Body
            style={{
              ...backdrop
            }}
          />
        )}
        <animated.div
          className={cx(`${prefix}-root`, `${mode}-root`)}
          style={{
            ...modal
          }}
        >
          {showBackDrop && (
            <div
              className={cx(`${prefix}-backdrop`, `${prefix}-stack`)}
              {...bindEvents({ closeOnTap: true })}
            ></div>
          )}
          <TrapFocus>
            <div
              ref={ref}
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
              {...rest}
            >
              <DragHeader
                {...bindEvents()}
                prefix={prefix}
                ref={headerRef}
                scrollRef={scroll}
                useModal={useModal}
                className={headerClass}
                scrolledClassName={headerScrolledClass}
              >
                {headerContent}
              </DragHeader>
              <div
                className={clsx(cx(`${prefix}-scroll`), scrollClass)}
                {...(scrollingExpands
                  ? bindEvents({ isContentDragging: true })
                  : empty)}
                ref={scroll}
                tabIndex={-1}
              >
                <div
                  className={cx(`${prefix}-content`)}
                  ref={contentRef}
                  tabIndex={-1}
                >
                  {scrollContent}
                </div>
              </div>
              <div
                className={clsx(cx(`${prefix}-footer`), footerClass)}
                {...bindEvents()}
                ref={footerRef}
              >
                {footerContent}
              </div>
            </div>
          </TrapFocus>
        </animated.div>
      </>
    )
  }
)

if (__isDev__) {
  BaseSheet.displayName = 'BaseSheet'
}

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(
  ({ open, onDismiss, onClose: onCloseProp = noop, ...rest }, ref) => {
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
        ref={ref}
        {...rest}
      />
    )
  }
)

if (__isDev__) {
  Sheet.displayName = 'Sheet'
}

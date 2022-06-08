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
  useHasScrolled
} from './hooks'
import TrapFocus from './trap-focus'
import Body from './body'
import classes from './classnames'
import styles from './sheet.module.css'
import type {
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

const empty = {}

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

const _selectedDetent = ({ detents, lastDetent }: SelectedDetentsProps) =>
  lastDetent ?? Math.min(...detents)

type DetentSize = 'medium' | 'large' | 'fit'

export const detents: Record<DetentSize, PredefinedDetents> = {
  large: ({ maxHeight }) => maxHeight - maxHeight * 0.1,
  medium: ({ maxHeight }) => maxHeight - maxHeight * 0.495,
  fit: ({ minHeight }) => minHeight
}

const _detents: Detents = props => detents.fit(props)

type Callbacks = {
  onClose: () => void
}

type BaseProps = {
  onDismiss?: () => void
  open?: boolean
  children?: React.ReactNode
  expandOnContentDrag?: boolean
  detents?: Detents
  selectedDetent?: SelectedDetent
  useModal?: boolean
  useDarkMode?: boolean
}

type InteralSheetProps = Callbacks & BaseProps & { close: () => void }

export type SheetProps = Partial<Callbacks> & BaseProps

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

type DragHeaderProps = React.HTMLProps<HTMLDivElement> & {
  children: React.ReactNode
  prefix: string
  scrollRef: React.RefObject<Element>
  useModal: boolean
}
const DragHeader = forwardRef<HTMLDivElement, DragHeaderProps>(
  ({ children, prefix, scrollRef, useModal, ...props }, ref) => {
    const hasScrolled = useHasScrolled(scrollRef, useModal)
    return (
      <div
        {...props}
        className={cx(
          `${prefix}-header`,
          !hasScrolled ? `${prefix}-header-plain` : false
        )}
        ref={ref}
      >
        <Notch className={cx(`${prefix}-handle`)} />
        {children}
      </div>
    )
  }
)

DragHeader.displayName = 'DragHeader'

const BaseSheet = forwardRef<HTMLDivElement, InteralSheetProps>(
  (
    {
      open,
      children,
      expandOnContentDrag,
      onDismiss,
      onClose,
      close,
      detents: getDetents = _detents,
      selectedDetent: getSelectedDetent = _selectedDetent,
      useModal: useModalInitial,
      useDarkMode: useDarkModeInitial,
      ...rest
    },
    ref
  ) => {
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
    const headerContent = getItem(Header, content)
    const scrollContent = getItem(Content, content)
    const footerContent = getItem(Footer, content)
    const { ready, registerReady } = useReady()
    const scroll = useOverscrollLock({
      enabled: expandOnContentDrag && enabled,
      preventScrollingRef
    })
    useScrollLock({ enabled: true, targetRef: scroll })

    const contentRef = useRef<HTMLDivElement | null>(null)
    const footerRef = useRef<HTMLDivElement | null>(null)

    const [spring, set, asyncSet] = useSpring()
    const { modal, backdrop } = useSpringInterpolations({ spring })

    const lastDetentRef = useRef<any>(null)
    const heightRef = useRef<number>()
    const { minSnap, maxSnap, maxHeight, findSnap } = useSnapPoints({
      contentRef,
      controlledMaxHeight: undefined,
      footerRef,
      getSnapPoints: getDetents,
      heightRef,
      lastSnapRef: lastDetentRef,
      ready,
      registerReady
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
    useEffect(() => {
      if (typeof window === 'undefined') return
      const className = cx('sheet-open')
      if (!useModal) document.body.classList.add(className)
      return () => {
        document.body.classList.remove(className)
      }
    }, [useModal])
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
      velocity: [, velocity]
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
        ? minSnapRef.current === maxSnapRef.current
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

      if (expandOnContentDrag && isContentDragging) {
        if (newY >= maxSnapRef.current!) {
          newY = maxSnapRef.current!
        }
        if (memo === maxSnapRef.current! && scroll.current!.scrollTop > 0) {
          newY = maxSnapRef.current!
        }
        preventScrollingRef.current = newY < maxSnapRef.current!
      } else {
        preventScrollingRef.current = false
      }
      if (first) {
      }

      if (last) {
        const snap = findSnapRef.current(newY)
        if (
          onDismiss &&
          rawY + predictedDistance < minSnapRef.current! / 2 &&
          snap === minSnapRef.current &&
          !isContentDragging
        ) {
          cancel()
          onDismiss()
          return memo
        }
        heightRef.current = snap
        lastDetentRef.current = snap
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
    const bindEvents = useCallback(
      ({
        isContentDragging,
        closeOnTap
      }: {
        isContentDragging?: boolean
        closeOnTap?: boolean
      } = empty) => {
        if (enabled) return bind({ isContentDragging, closeOnTap })
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
          <div
            className={cx(`${prefix}-backdrop`, `${prefix}-stack`)}
            {...bindEvents({ closeOnTap: true })}
          ></div>
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
                scrollRef={scroll}
                useModal={useModal}
              >
                {headerContent}
              </DragHeader>
              <div
                className={cx(`${prefix}-scroll`)}
                {...(expandOnContentDrag
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
                className={cx(`${prefix}-footer`)}
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

BaseSheet.displayName = 'BaseSheet'

const noop = () => empty

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

Sheet.displayName = 'Sheet'

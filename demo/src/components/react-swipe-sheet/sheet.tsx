import React, { useRef } from 'react'
import { rubberbandIfOutOfBounds, useDrag } from 'react-use-gesture'
import { useSnapPoints, useReady, useOverscrollLock, useScrollLock } from './hooks'
import TrapFocus from './trap-focus'
import classes from './classnames'
import styles from './sheet.module.css'

const cx = classes.bind(styles)

type SheetProps = {
  children?: React.ReactNode
  expandOnContentDrag?: boolean
}

type ResizeSource = 'window' | 'maxheightprop' | 'element'

const Sheet: React.FC<SheetProps> = ({ children, expandOnContentDrag }) => {
  const scroll = useOverscrollLock({ enabled: expandOnContentDrag })
  useScrollLock({ enabled: true, targetRef: scroll })
  const { ready, registerReady } = useReady()
  const contentRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const footerRef = useRef<HTMLDivElement | null>(null)
  const heightRef = useRef<number>(500)
  const maxHeightRef = useRef<number>(500)
  const minSnapRef = useRef<number>(200)
  const maxSnapRef = useRef<number>(400)
  const resizeSourceRef = useRef<ResizeSource>()
  const { minSnap, maxSnap, maxHeight, findSnap } = useSnapPoints({
    contentRef,
    footerRef,
    headerRef,
    heightRef,
    ready,
    registerReady,
    resizeSourceRef
  })
  const set = (...args: any) => console.log(...args)
  const handleDrag = ({
    args: [{ closeOnTap = false, isContentDragging = false } = {}] = [],
    cancel,
    direction: [, direction],
    down,
    first,
    last,
    memo,
    movement: [, _my],
    tap,
    velocity,
  }) => {
    if (tap) return memo
    const my = _my * -1
    const rawY = memo + my
    const predictedDistance = my * velocity
    const predictedY = Math.max(
      minSnapRef.current,
      Math.min(maxSnapRef.current, rawY + predictedDistance * 2)
    )
    let newY = down
      ?
        minSnapRef.current === maxSnapRef.current
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
      if (memo === maxSnapRef.current && sroll.current.scrollTop > 0) {
        newY = maxSnapRef.current
      }
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
    filterTaps: true,
  })
  return (
    <div className={cx('root')}>
      <div className={cx('backdrop', 'stack')} {...bind({ closeOnTap: true })}></div>
      <TrapFocus open>
        <div className={cx('modal', 'stack')}>
          <div className={cx('header')} {...bind()} ref={headerRef}></div>
          <div className={cx('scroll')} {...(expandOnContentDrag ? bind({ isContentDragging: true }) : {})} ref={scroll}>
          <div className={cx('content')} ref={contentRef}>{children}</div>
          </div>
          <div className={cx('footer')} {...bind()} ref={footerRef}></div>
        </div>
      </TrapFocus>
    </div>
  )
}

const SheetWrapper: React.FC<SheetProps & { open: boolean }> = ({
  open,
  ...rest
}) => {
  if (!open) return null
  return <Sheet {...rest} />
}

export default SheetWrapper

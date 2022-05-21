import React from 'react'
import { useOverscrollLock, useScrollLock } from './hooks'
import TrapFocus from './trap-focus'
import classes from './classnames'
import styles from './sheet.module.css'

const cx = classes.bind(styles)

type SheetProps = {
  children?: React.ReactNode
}

const Sheet: React.FC<SheetProps> = ({ children }) => {
  const scroll = useOverscrollLock({ enabled: true })
  useScrollLock({ enabled: true, targetRef: scroll })
  return (
    <div className={cx('root')}>
      <div className={cx('backdrop', 'stack')}></div>
      <TrapFocus open>
        <div className={cx('modal', 'stack')}>
          <div className={cx('header')}></div>
          <div className={cx('scroll')} ref={scroll}>
            <div className={cx('content')}>{children}</div>
          </div>
          <div className={cx('footer')}></div>
        </div>
      </TrapFocus>
    </div>
  )
}

const SheetWrapper: React.FC<SheetProps & { open: boolean }> = ({ open, ...rest }) => {
  if (!open) return null
  return <Sheet {...rest} />
}

export default SheetWrapper

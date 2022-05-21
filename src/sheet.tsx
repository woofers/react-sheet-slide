import React from 'react'
import classes from './classnames'
import styles from './sheet.module.css'

const cx = classes.bind(styles)

type SheetProps = {
  children?: React.ReactNode
}

const Sheet: React.FC<SheetProps> = ({ children }) => {
  return (
    <div className={cx('root')}>
      <div className={cx('backdrop', 'stack')}></div>
      <TrapFocus>
        <div className={cx('modal', 'stack')}>
          <div className={cx('header')}></div>
          <div className={cx('scroll')}>
            <div className={cx('content')}>{children}</div>
          </div>
          <div className={cx('footer')}></div>
        </div>
      </TrapFocus>
    </div>
  )
}

export default Sheet

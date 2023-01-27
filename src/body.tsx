import React, { forwardRef, useEffect } from 'react'
import { animated } from '@react-spring/web'
import { hasWindow, setRef } from './utils'
import classes from './classnames'
import styles from './sheet.module.css'

const values = ['--dim', '--scale', '--down', '--round', '--scroll', '--blur', '--blurRadius']

type BodyProxyProps = { style?: Record<string, string> }

const cx = classes.bind(styles)

const BodyProxy = forwardRef<HTMLBodyElement, BodyProxyProps>((_, ref) => {
  useEffect(() => {
    if (!hasWindow()) return
    const elem = document.body as HTMLBodyElement
    const scroll = window.pageYOffset ?? 0
    elem.style.setProperty('--scroll', `${scroll}px`)
    const className = cx('sheet-open')
    elem.classList.add(className)
    setRef(ref, elem)
    return () => {
      if (!elem) return
      values.forEach(value => elem.style.removeProperty(value))
      elem.classList.remove(className)
    }
  }, [ref])
  return null
})

const Body = animated(BodyProxy)

if (__isDev__) {
  BodyProxy.displayName = 'BodyProxy'
  Body.displayName = 'Body'
}

export default Body

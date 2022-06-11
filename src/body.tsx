import React, { forwardRef, useEffect } from 'react'
import { animated } from '@react-spring/web'
import { hasWindow, setRef } from './utils'

const values = ['--dim', '--scale', '--down', '--round', '--scroll']

type BodyProxyProps = { style?: Record<string, string> }

const BodyProxy = forwardRef<HTMLBodyElement, BodyProxyProps>((_, ref) => {
  useEffect(() => {
    if (!hasWindow()) return
    const elem = document.body as HTMLBodyElement
    const scroll = window.pageYOffset ?? 0
    elem.style.setProperty('--scroll', `${scroll}px`)
    setRef(ref, elem)
    return () => {
      if (!elem) return
      values.forEach(value => elem.style.removeProperty(value))
    }
  }, [ref])
  return null
})

const Body = animated(BodyProxy)

export default Body

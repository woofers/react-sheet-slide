import React, { forwardRef, useEffect } from 'react'
import { animated } from '@react-spring/web'
import { setRef } from './utils'

const values = ['--dim', '--scale', '--down', '--round']

type BodyProxyProps = { style?: Record<string, string> }

const BodyProxy = forwardRef<HTMLBodyElement, BodyProxyProps>((_, ref) => {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const elem = document.body as HTMLBodyElement
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

/*
 * react-spring-bottom-sheet use-spring
 * Modified to support react-spring v9
 * ------------------------------
 * From: https://github.com/stipsan/react-spring-bottom-sheet/blob/main/src/hooks/useSpring.tsx
 * MIT License at https://raw.githubusercontent.com/stipsan/react-spring-bottom-sheet/main/LICENSE
 */

import React, { useMemo, useCallback } from 'react'
import { useSpring as useReactSpring } from '@react-spring/web'
import { config } from '../utils'
import type { SpringConfig } from '../types'

const { tension, friction } = config

const useSpringWrapper = () =>
  useReactSpring(() => ({
    y: 0,
    ready: 0,
    maxHeight: 0,
    minSnap: 0,
    maxSnap: 0
  }))

type AsyncType = { config?: SpringConfig } & Record<string, unknown>
type SpringSetAsync = (e: AsyncType) => Promise<unknown>

const useSpring = ({ velocity: defaultVelocity } = { velocity: 1 }): [Spring, SpringSet, SpringSetAsync] => {
  const [spring, api] = useSpringWrapper()
  const set = useMemo(() => api.start.bind(api), [api])
  const asyncSet = useCallback(
    ({ config: { velocity = defaultVelocity, ...rest } = {}, ...opts }: AsyncType) =>
      new Promise(resolve =>
        set({
          ...opts,
          config: {
            velocity,
            ...rest,
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
          onRest: (...args: unknown[]) => {
            resolve(args)
          }
        })
      ),
    [set, defaultVelocity]
  )
  return [spring, set, asyncSet]
}

export type Spring = ReturnType<typeof useSpringWrapper>[0]
export type SpringSet = ReturnType<typeof useSpringWrapper>[1]['start']

export default useSpring

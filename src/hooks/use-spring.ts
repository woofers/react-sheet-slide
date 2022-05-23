import { useCallback } from 'react'
import { useSpring as useReactSpring } from '@react-spring/web'
import { config } from '../utils'
import type { SpringConfig } from '../types'

const { tension, friction } = config.default

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

const useSpring = (): [Spring, SpringSet, SpringSetAsync] => {
  const [spring, set] = useSpringWrapper()
  const asyncSet = useCallback(
    ({ config: { velocity = 1, ...rest } = {}, ...opts }: AsyncType) =>
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
    [set]
  )
  return [spring, set, asyncSet]
}

export type Spring = ReturnType<typeof useSpringWrapper>[0]
export type SpringSet = ReturnType<typeof useSpringWrapper>[1]

export default useSpring

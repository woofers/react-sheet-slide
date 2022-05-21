import { useSpring as useReactSpring } from '@react-spring/web'

const useSpring = () => {
  return useReactSpring(() => ({
    y: 0,
    ready: 0,
    maxHeight: 0,
    minSnap: 0,
    maxSnap: 0
  }))
}

export type Spring = ReturnType<typeof useSpring>[0]
export type SpringSet = ReturnType<typeof useSpring>[1]

export default useSpring

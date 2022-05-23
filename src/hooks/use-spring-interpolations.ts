import { to as interpolate } from '@react-spring/web'
import type { Spring } from './use-spring'
import { clamp } from '../utils'

const useSpringInterpolations = ({
  spring
}: {
  spring: Spring
}): React.CSSProperties => {
  const interpolateHeight = interpolate(
    [spring.y, spring.minSnap, spring.maxSnap],
    (y, minSnap, maxSnap) => `${clamp(y, minSnap, maxSnap)}px`
  )

  const interpolateY = interpolate(
    [spring.y, spring.minSnap, spring.maxSnap],
    (y, minSnap, maxSnap) => {
      if (y < minSnap) {
        return `${minSnap - y}px`
      }
      if (y > maxSnap) {
        return `${maxSnap - y}px`
      }
      return '0px'
    }
  )

  const interpolateFiller = interpolate(
    [spring.y, spring.maxSnap],
    (y, maxSnap) => {
      if (y >= maxSnap) {
        return Math.ceil(y - maxSnap)
      }
      return 0
    }
  )

  const interpolateBackdrop = interpolate(
    [spring.y, spring.minSnap],
    (y, minSnap) => (minSnap ? clamp(y / minSnap, 0, 1) : 0)
  )

  return {
    ['--bottom-height' as any]: interpolateFiller,
    ['--modal-offset' as any]: interpolateY,
    ['--height' as any]: interpolateHeight,
    ['--backdrop-opacity' as any]: interpolateBackdrop
  }
}

export default useSpringInterpolations

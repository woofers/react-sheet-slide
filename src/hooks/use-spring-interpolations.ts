import { to as interpolate } from '@react-spring/web'
import type { Spring } from './use-spring'
import { clamp } from '../utils'

function useSpringInterpolations({
  spring
}: {
  spring: Spring
}): React.CSSProperties {
  /*
   * Only animate the height when absolute necessary
   * @TODO currently it's only able to opt out of changing the height if there's just a single snapshot
   *       but it should be possible to do it in other scenarios too, like on window resize,
   *       or maybe even while dragging, but probably requires a more restrictive CSS.
   *       As in now the sticky footer isn't overlapping the content, allowing `backdrop-filter: blur(8px)` effects.
   *       A FLIP resize flow for content height would likely require the sticky elements to overlap the content area.
   *       Could be done as a separat mode though, or a separate example CSS for max performance.
   */
  const interpolateHeight = interpolate(
    // @ts-ignore
    [spring.y, spring.minSnap, spring.maxSnap],
    (y, minSnap, maxSnap) => `${clamp(y, minSnap, maxSnap)}px`
  )

  const interpolateY = interpolate(
    // @ts-ignore
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
    // @ts-ignore
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

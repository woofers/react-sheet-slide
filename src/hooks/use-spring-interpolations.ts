import { to as interpolate } from '@react-spring/web'
import type { Spring } from './use-spring'
import { clamp } from '../utils'

type Interpolations = {
  modal: React.CSSProperties
  backdrop: React.CSSProperties
}

const useSpringInterpolations = ({
  spring
}: {
  spring: Spring
}): Interpolations => {
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

  const interpolateDim = interpolate(
    [spring.y, spring.minSnap],
    (y, minSnap) => (1 - (minSnap ? clamp(y / minSnap, 0, 1) : 0)) * (1 - 0.89) + 0.89
  )

  const interpolateScale = interpolate(
    [spring.y, spring.minSnap],
    (y, minSnap) =>
      (1 - (minSnap ? clamp(y / minSnap, 0, 1) : 0)) * (1 - 0.95) + 0.95
  )

  const interpolateDown = interpolate(
    [spring.y, spring.minSnap],
    (y, minSnap) => (minSnap ? clamp(y / minSnap, 0, 1) : 0) + '%'
  )

  const interpolateRound = interpolate(
    [spring.y, spring.minSnap],
    (y, minSnap) => (minSnap ? clamp(y / minSnap, 0, 1) : 0) * 12 + 'px'
  )

  const modal = {
    ['--bottom-height' as any]: interpolateFiller,
    ['--modal-offset' as any]: interpolateY,
    ['--height' as any]: interpolateHeight,
    ['--backdrop-opacity' as any]: interpolateBackdrop
  }
  const backdrop = {
    ['--dim' as any]: interpolateDim,
    ['--scale' as any]: interpolateScale,
    ['--down' as any]: interpolateDown,
    ['--round' as any]: interpolateRound
  }
  return { modal, backdrop }
}

export default useSpringInterpolations

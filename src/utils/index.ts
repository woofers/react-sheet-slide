const getErr = (msg: string) => new TypeError(__isDev__ ? msg : '')

export function clamp(number: number, lower: number, upper: number) {
  number = +number
  lower = +lower
  upper = +upper
  lower = lower === lower ? lower : 0
  upper = upper === upper ? upper : 0
  if (number === number) {
    number = number <= upper ? number : upper
    number = number >= lower ? number : lower
  }
  return number
}

export function deleteNaN(arr: number[]): number[] {
  const set = new Set(arr)
  set.delete(NaN)
  return [...(set as any)]
}

export function roundAndCheckForNaN(unrounded: number): number {
  const rounded = Math.round(unrounded)
  if (Number.isNaN(unrounded)) {
    throw getErr('Found a NaN! Check your snapPoints / defaultSnap / snapTo')
  }
  return rounded
}

export function processSnapPoints(
  unsafeSnaps: number | number[],
  maxHeight: number
) {
  const arr: number[] = []
  const safeSnaps = arr.concat(unsafeSnaps).map(roundAndCheckForNaN)

  const snapPointsDedupedSet = safeSnaps.reduce((acc, snapPoint) => {
    acc.add(clamp(snapPoint, 0, maxHeight))
    return acc
  }, new Set<number>())

  const snapPoints = Array.from(snapPointsDedupedSet)

  const minSnap = Math.min(...snapPoints)
  if (Number.isNaN(minSnap)) {
    throw getErr('minSnap is NaN')
  }
  const maxSnap = Math.max(...snapPoints)
  if (Number.isNaN(maxSnap)) {
    throw getErr('maxSnap is NaN')
  }
  return {
    snapPoints,
    minSnap,
    maxSnap
  }
}

export const config = {
  default: { tension: 170, friction: 26 },
  gentle: { tension: 120, friction: 14 },
  wobbly: { tension: 180, friction: 12 },
  stiff: { tension: 210, friction: 20 },
  slow: { tension: 280, friction: 60 },
  molasses: { tension: 280, friction: 120 }
}

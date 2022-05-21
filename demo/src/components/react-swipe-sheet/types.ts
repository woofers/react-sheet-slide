
export type SnapPointProps = {
  headerHeight: number
  footerHeight: number
  height: number
  minHeight: number
  maxHeight: number
}

export type snapPoints = (props: SnapPointProps) => number[] | number

export type ResizeSource = 'window' | 'maxheightprop' | 'element'

export type defaultSnapProps = {
  snapPoints: number[]
  lastSnap: number | null
} & SnapPointProps

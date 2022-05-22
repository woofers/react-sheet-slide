export type SnapPointProps = {
  headerHeight: number
  footerHeight: number
  height: number
  minHeight: number
  maxHeight: number
}

export type SnapPoints = (props: SnapPointProps) => number[] | number

export type ResizeSource = 'window' | 'maxheightprop' | 'element'

export type DefaultSnapProps = {
  snapPoints: number[]
  lastSnap: number | null
} & SnapPointProps

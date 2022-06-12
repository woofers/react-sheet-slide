type DetentsProps = {
  headerHeight: number
  footerHeight: number
  height: number
  minHeight: number
  maxHeight: number
}

export type SelectedDetentsProps = {
  detents: number[]
  lastDetent: number | null
} & DetentsProps

export type PredefinedDetents = (props: DetentsProps) => number

export type Detents = (props: DetentsProps) => number[] | number

export type SelectedDetent = number | ((props: SelectedDetentsProps) => number)

export type SpringConfig = Partial<{
  velocity: number
  tension: number
  friction: number
}>

export type ResizeSource = 'window' | 'maxheightprop' | 'element' | undefined

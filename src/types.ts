type DetentsProps = {
  headerHeight: number
  footerHeight: number
  height: number
  minHeight: number
  maxHeight: number
}

export type DefaultDetentsProps = {
  detents: number[]
  lastDetent: number | null
} & DetentsProps

export type Detents = (props: DetentsProps) => number[] | number

export type SelectedDetent = number | ((props: DefaultDetentsProps) => number)

export type SpringConfig = Partial<{
  velocity: number
  tension: number
  friction: number
}>

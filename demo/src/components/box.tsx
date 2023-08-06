import React, { ElementType, ComponentPropsWithoutRef } from "react"

export const Box = <T extends ElementType<any> = 'div'>(props: { as?: T } & ComponentPropsWithoutRef<T>) => {
  const { as, ...rest } = props
  const Comp = as || 'div'
  return <Comp {...rest} />
}

export type BoxProps<T extends ElementType<any>> = React.ComponentProps<typeof Box<T>>

export default Box

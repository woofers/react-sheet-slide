import React, { ElementType, ComponentPropsWithoutRef } from "react"

export const Box = <T extends React.ElementType<any> = 'div'>(props: { as?: T } & React.ComponentPropsWithoutRef<T>) => {
  const { as, ...rest } = props
  const Comp = as || 'div'
  return <Comp {...rest} />
}

export type BoxProps<T extends React.ElementType<any>> = React.ComponentProps<typeof Box>

export default Box

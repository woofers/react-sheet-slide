import { clsx } from 'cva'
import BoxComp, { type BoxProps } from './box'

export const Flex: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => (
  <BoxComp
    {...rest}
    as={as}
    className={clsx(
      'w-full flex justify-between items-center gap-x-3',
      className
    )}
  />
)

export const Box: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => (
  <BoxComp
    {...rest}
    as={as}
    className={clsx(
      'h-8 flex justify-end gap-x-2 text-[var(--color-text)] box-text',
      className
    )}
  />
)

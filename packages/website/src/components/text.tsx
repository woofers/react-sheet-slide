import Box, { type BoxProps } from 'components/box'
import { clsx } from 'cva'

export const LargeText: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'font-bold text-[32px] leading-9 my-0 tracking-[1px]',
      className
    )}
  />
)

export const Text: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'max-w-[300px] font-medium text-xl leading-6 my-0 tracking-[-0.25px]',
      className
    )}
  />
)

import clsx from 'clsx'
import Box, { type BoxProps } from './box'

export const Legend: React.FC<BoxProps<'legend'>> = ({
  className,
  as = 'legend',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'select-none inline-flex float-left items-center font-bold',
      className
    )}
  />
)

export const Fieldset: React.FC<BoxProps<'fieldset'>> = ({
  className,
  as = 'fieldset',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx('border-none p-0 inline-flex flex-col gap-x-2', className)}
  />
)

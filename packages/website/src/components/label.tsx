import { clsx } from 'cva'
import Box, { type BoxProps } from './box'

export const Label: React.FC<BoxProps<'label'>> = ({
  className,
  as = 'label',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'select-none [transition:color_0.2s_ease-in-out_0s]',
      className
    )}
  />
)

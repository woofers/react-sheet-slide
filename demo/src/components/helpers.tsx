import { clsx } from 'cva'
import Box, { type BoxProps } from 'components/box'

export const CloseButton: React.FC<BoxProps<'button'>> = ({
  className,
  as = 'button',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'p-0 border-none rounded-full w-[30px] h-[30px] inline-flex items-center justify-center relative bg-[var(--color-close)] text-[var(--color-close-text)]',
      className
    )}
  />
)

export const Description: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'mx-auto my-0 w-full text-base leading-5 tracking-normal',
      className
    )}
  />
)

export const Action: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'no-underline text-[var(--color-link)] font-medium text-base leading-5 w-full tracking-[-0.25px] text-center mx-auto my-0',
      className
    )}
  />
)

export const Container: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'flex p-[76px_20px_16px] flex-col gap-y-[20px] text-[var(--color-text)]',
      className
    )}
  />
)

export const Center: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'flex flex-col justify-center items-center gap-y-8 mt-14 mb-6 sm:mt-20 sm:mb-10',
      className
    )}
  />
)
//marginBottom: '1.6em',
//marginTop: '5.5em',

export const Link: React.FC<BoxProps<'a'>> = ({
  className,
  as = 'a',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'no-underline text-[var(--color-text)] text-[0.5rem] hover:text-[var(--color-text-hover)] xsm:text-xs sm:text-base !leading-6',
      className
    )}
  />
)

export const DocsWrapper: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => <Box {...rest} as={as} className={clsx('docs-wrapper', className)} />

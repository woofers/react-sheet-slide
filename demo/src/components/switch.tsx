import React, { forwardRef } from 'react'
import { useField } from 'formik'
import { Label } from './label'
import Box, { type BoxProps } from './box'
import { clsx } from 'cva'

const Input: React.FC<BoxProps<'input'>> = ({
  className,
  as = 'input',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'appearance-none rounded-2xl w-[var(--width)] h-[var(--height)] bg-[var(--backgroundColor)] [transition:background-color_0.4s_ease-in-out_0s]',
      className
    )}
  />
)

const Handle: React.FC<BoxProps<'span'>> = ({
  className,
  as = 'span',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'absolute rounded-full pointer-events-none bg-[var(--handleColor)] right-[calc(var(--handle)*-1)] top-1/2 [transform:translate(var(--left),-50%)] will-change-transform [transition:transform_0.3s_ease-in-out_0s] w-[var(--handle)] h-[var(--handle)]',
      className
    )}
  />
)

const Wrapper: React.FC<BoxProps<'span'>> = ({
  className,
  as = 'span',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'switch',
      '[--width:52px] [--height:32px] [--padding:2px] [--handle:28px] [--left:var(--padding)]',
      'align-middle relative inline-flex items-center flex-row-reverse',
      '[--handleColor:var(--colors-switchHandle)] [--backgroundColor:var(--colors-switchInactive)]',
      className
    )}
  />
)

const LabelContainer: React.FC<BoxProps<'span'>> = ({
  className,
  as = 'span',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'relative h-[var(--height)] items-center inline-flex',
      className
    )}
  />
)

type InputProps = React.HTMLProps<HTMLInputElement>
type CheckboxProps = Omit<InputProps, 'type'>
type SwitchProps = CheckboxProps & {
  children?: React.ReactNode
  name: string
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ children, name, ...rest }, ref) => {
    const [field] = useField(name)
    return (
      <Wrapper as="label">
        <Input
          {...field}
          checked={field.value}
          {...rest}
          type="checkbox"
          ref={ref}
        />
        <LabelContainer>
          <Handle aria-hidden />
          <Label className="switch-label text-[var(--colors-labelInactive)] pr-2" as="span">{children}</Label>
        </LabelContainer>
      </Wrapper>
    )
  }
)

Switch.displayName = 'Switch'

export default Switch

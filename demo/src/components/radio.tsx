import React, { forwardRef } from 'react'
import { styled } from 'stitches'
import { useField } from 'formik'
import { Label } from './label'
import clsx from 'clsx'
import Box, { type BoxProps } from './box'

const Active = styled('span', {
  $$padding: '3px',
  br: '6px',
  pointerEvents: 'none',
  position: 'absolute',
  top: '$$padding',
  left: '$$padding',
  width: 'calc(100% - $$padding * 2)',
  height: 'calc(100% - $$padding * 2)',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  fontWeight: '700',
  opacity: 0
})

const Wrapper = styled('span', {
  [`input:checked + ${Active}`]: {
    background: '$tabActive',
    opacity: 1
  }
})

export const RadioGroup: React.FC<BoxProps<'div'>> = ({ className, ...rest }) =>
  <Box {...rest} as="div" className="inline-flex rounded-lg [background:var(--color-tab-background)]" />

type InputProps = React.HTMLProps<HTMLInputElement>
type RadioProps = Omit<InputProps, 'type'>

type Props = RadioProps & {
  children?: React.ReactNode
  name: string
}

export const Radio = forwardRef<HTMLInputElement, Props>(
  ({ id, name, value, children, onChange, ...rest }, ref) => {
    const [field] = useField(name)
    const { onChange: onFieldChange, ...fields } = field
    const onChangeWrapper = (e: any) => {
      if (typeof onChange === 'function') onChange(e)
      onFieldChange(e)
    }
    return (
      <Wrapper className="relative inline-flex">
        <input
          className="absolute w-full h-full appearance-none"
          {...fields}
          onChange={onChangeWrapper}
          checked={field.value === value}
          {...rest}
          id={id ?? name}
          name={name}
          value={value}
          type="radio"
          ref={ref}
        />
        <Active aria-hidden>{children}</Active>
        <label htmlFor={id ?? name} className="px-7 py-1">
          <Label as="span" className="font-medium">{children}</Label>
        </label>
      </Wrapper>
    )
  }
)

Radio.displayName = 'Radio'

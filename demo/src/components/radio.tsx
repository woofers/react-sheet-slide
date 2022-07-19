import React, { forwardRef } from 'react'
import { styled } from 'stitches'
import { useField } from 'formik'
import Label from './label'

const Input = styled('input', {
  position: 'absolute',
  width: '100%',
  height: '100%',
  appearance: 'none'
})

const Tab = styled('div', {
  padding: '4px 28px',
  [`${Label}`]: {
    fontWeight: '500'
  }
})

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
  position: 'relative',
  display: 'inline-flex',
  [`input:checked + ${Active}`]: {
    background: '$tabActive',
    opacity: 1
  }
})

export const RadioGroup = styled('div', {
  display: 'inline-flex',
  background: '$tabBackground',
  br: '8px'
})

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
      <Wrapper>
        <Input
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
        <Tab as="label" htmlFor={id ?? name}>
          <Label as="span">{children}</Label>
        </Tab>
      </Wrapper>
    )
  }
)

Radio.displayName = 'Radio'

import React, { forwardRef } from 'react'
import { styled } from 'stitches'
import Label from './label'

const Input = styled('input', {
  appearance: 'none',
  br: '16px',
  width: '$$width',
  height: '$$height',
  background: '$$backgroundColor',
  transition: 'background-color 0.4s ease-in-out 0s'
})

const Handle = styled('span', {
  br: '$round',
  pointerEvents: 'none',
  background: '$$handleColor',
  position: 'absolute',
  right: 'calc($$handle * -1)',
  top: '50%',
  transform: 'translate($$left, -50%)',
  willChange: 'transform',
  transition: 'transform 0.3s ease-in-out 0s',
  height: '$$handle',
  width: '$$handle'
})

const Wrapper = styled('span', {
  $$handleColor: '$colors$switchHandle',
  $$backgroundColor: '$colors$switchInactive',
  $$handle: '28px',
  $$height: '32px',
  $$width: '52px',
  $$padding: '2px',
  $$left: '$$padding',
  verticalAlign: 'middle',
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  flexDirection: 'row-reverse',
  [`${Label}`]: {
    color: '$labelInactive',
    pr: '8px'
  },
  'input:checked': {
    $$backgroundColor: '$colors$switchActive'
  },
  'input:checked + span': {
    $$left: 'calc($$width / 2 - $$padding * 2)',
    [`${Label}`]: {
      color: '$labelActive',
      fontWeight: '700'
    }
  }
})

const LabelContainer = styled('span', {
  position: 'relative',
  height: '$$height',
  alignItems: 'center',
  display: 'inline-flex'
})

type InputProps = React.HTMLProps<HTMLInputElement>
type CheckboxProps = Omit<InputProps, 'type'>
type SwitchProps = CheckboxProps & {
  children?: React.ReactNode
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Wrapper as="label">
        <Input {...rest} type="checkbox" ref={ref} />
        <LabelContainer>
          <Handle aria-hidden />
          <Label as="span">{children}</Label>
        </LabelContainer>
      </Wrapper>
    )
  }
)

export default Switch

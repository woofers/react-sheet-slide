import React, { forwardRef, useState, useEffect } from 'react'
import { styled } from 'stitches'

const Input = styled('input', {
  appearance: 'none',
  br: '16px',
  width: '$$width',
  height: '100%',
  background: '$$backgroundColor',
  transition: 'background-color 0.4s ease-in-out 0s'
})

const Handle = styled('span', {
  br: '$round',
  pointerEvents: 'none',
  background: '$$handleColor',
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translate($$left, -50%)',
  transition: 'transform 0.3s ease-in-out 0s',
  height: '$$handle',
  width: '$$handle'
})

const Wrapper = styled('span', {
  '$$handleColor': '$colors$switchHandle',
  '$$backgroundColor': '$colors$switchInactive',
  '$$handle': '28px',
  '$$height': '32px',
  '$$width': '52px',
  '$$padding': '2px',
  '$$left': '$$padding',
  height: '$$height',
  position: 'relative',
  display: 'inline-flex',
  'input:checked': {
    '$$backgroundColor': '$colors$switchActive',
  },
  'input:checked + span': {
    '$$left': 'calc($$width / 2 - $$padding * 2)'
  }
})


type InputProps = React.HTMLProps<HTMLInputElement>
type CheckboxProps = Omit<InputProps, 'type'>
type SwitchProps = CheckboxProps & {

}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(({ ...rest }, ref) => {
  return (
    <Wrapper>
      <Input {...rest} type="checkbox" ref={ref} />
      <Handle aria-hidden />
    </Wrapper>
  )
})


export default Switch

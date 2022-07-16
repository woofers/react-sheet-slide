import React, { forwardRef, useState, useEffect } from 'react'
import { styled } from 'stitches'

const Input = styled('input', {
  appearance: 'none',
  br: '$pill',
  width: '32px',
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
  top: 0,
  transform: 'translateX($$left)',
  transition: 'transform 0.3s ease-in-out 0s',
  height: '100%',
  width: '16px'
})

const Wrapper = styled('span', {
  '$$handleColor': '#fff',
  '$$backgroundColor': '#b9b9b9',
  '$$height': '16px',
  '$$left': '0px',
  height: '$$height',
  position: 'relative',
  display: 'inline-flex',
  'input:checked': {
    '$$backgroundColor': '#00cc22',
  },
  'input:checked + span': {
    '$$left': '16px'
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

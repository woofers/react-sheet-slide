import React, { forwardRef } from 'react'
import { styled } from 'stitches'
import Label from './label'

const Input = styled('input', {
  position: 'absolute',
  width: '100%',
  height: '100%',
  appearance: 'none',
})

const Tab = styled('div', {
  padding: '4px 28px',
  [`${Label}`]: {
    fontWeight: '500'
  }
})

const Active = styled('span', {
  '$$padding': '3px',
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
  br: '8px',
})

type InputProps = React.HTMLProps<HTMLInputElement>
type RadioProps = Omit<InputProps, 'type'>

type Props = RadioProps & {
  children?: React.ReactNode
}

export const Radio = forwardRef<HTMLInputElement, Props>(({ id, name, value, children, ...rest }, ref) => {
  return (
    <Wrapper>
      <Input {...rest} id={id ?? name} name={name} value={value} type="radio" ref={ref} />
      <Active aria-hidden>{children}</Active>
      <Tab as="label" htmlFor={id ?? name}><Label as="span">{children}</Label></Tab>
    </Wrapper>
  )
})

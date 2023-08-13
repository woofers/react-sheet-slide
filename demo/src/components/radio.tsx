'use client'
import React, { useCallback, forwardRef } from 'react'
import { useField } from 'formik'
import { clsx } from 'cva'
import { Label } from './label'
import Box, { type BoxProps } from './box'

export const RadioGroup: React.FC<BoxProps<'div'>> = ({
  className,
  ...rest
}) => (
  <Box
    {...rest}
    as="div"
    className="inline-flex rounded-lg bg-[var(--color-tab-background)]"
  />
)

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
    const onChangeWrapper = useCallback(
      (e: Parameters<Exclude<InputProps['onChange'], undefined>>[0]) => {
        if (typeof onChange === 'function') onChange(e)
        onFieldChange(e)
      },
      []
    )
    return (
      <span className="relative inline-flex">
        <input
          className="peer absolute w-full h-full appearance-none"
          {...fields}
          onChange={onChangeWrapper}
          checked={field.value === value}
          data-checked={field.value === value}
          {...rest}
          id={id ?? name}
          name={name}
          value={value}
          type="radio"
          ref={ref}
        />
        <span
          className="[--padding:3px] flex rounded-md pointer-events-none absolute top-[var(--padding)] left-[var(--padding)] w-[calc(100%_-_var(--padding)_*_2)] h-[calc(100%_-_var(--padding)_*_2)] items-center justify-center font-bold opacity-0 peer-data-[checked='true']:opacity-100 peer-data-[checked='true']:bg-[var(--color-tab-active)]"
          aria-hidden
        >
          {children}
        </span>
        <label htmlFor={id ?? name} className="px-7 py-1">
          <Label as="span" className="font-medium">
            {children}
          </Label>
        </label>
      </span>
    )
  }
)

Radio.displayName = 'Radio'

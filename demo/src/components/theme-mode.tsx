'use client'
import { useTheme } from 'components/theme-provider'
import { Fieldset, Legend } from 'components/fieldset'
import { RadioGroup, Radio } from 'components/radio'
import { Button } from 'components/button'
import useIsMounted from 'hooks/use-is-mounted'
import { useFormikContext } from 'formik'
import type { FormProps } from 'types/global'
import { Text, LargeText } from 'components/text'

export const SheetThemeMode: React.FC<Nothing> = () => {
  const { name, setTheme } = useTheme()
  return (
    <Fieldset>
      <Legend>useDarkMode</Legend>
      <RadioGroup>
        <Radio value="auto" name="useDarkMode">
          Auto
        </Radio>
        <Radio
          value="off"
          name="useDarkMode"
          onChange={() => setTheme('light')}
        >
          Light
        </Radio>
        <Radio value="on" name="useDarkMode" onChange={() => setTheme('dark')}>
          Dark
        </Radio>
      </RadioGroup>
    </Fieldset>
  )
}

export const ThemeButtons: React.FC<Nothing> = () => {
  const mounted = useIsMounted()
  const { name, setTheme } = useTheme()
  const { setFieldValue } = useFormikContext<FormProps>()
  if (!mounted) return <div className="min-w-[110px] min-h-[44px]" />
  return (
    <div className="w-[max-content] flex gap-x-3">
      <Button
        aria-pressed={name === 'light'}
        theme="secondary"
        onClick={() => {
          setTheme('light')
          setFieldValue('useDarkMode', 'off')
        }}
        type="button"
        className="grow text-right"
      >
        ☀
      </Button>
      ️
      <Button
        aria-pressed={name === 'dark'}
        theme="secondary"
        onClick={() => {
          setTheme('dark')
          setFieldValue('useDarkMode', 'on')
        }}
        type="button"
        className="grow text-left"
      >
        🌙
      </Button>
    </div>
  )
}

const emojis = [`🏞️`, `🎢`, `🛝`]

export const Emojis: React.FC<Nothing> = () => {
  const mounted = useIsMounted()
  if (!mounted) return <div className="min-h-[36px]" />
  return <LargeText>{emojis.join(' ')}</LargeText>
}

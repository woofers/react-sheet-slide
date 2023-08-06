import { theme, darkTheme } from 'stitches'
import { ThemeProvider as Provider, useTheme as useThemeKey } from 'next-themes'

type ThemeProviderProps = {
  children?: React.ReactNode
}

type ThemeType = typeof theme | typeof darkTheme

type UseThemeProps = ReturnType<typeof useThemeKey>

type UseTheme = Omit<UseThemeProps, 'theme' | 'setTheme'> & {
  name: UseThemeProps['resolvedTheme']
  key: UseThemeProps['theme']
  theme: ThemeType
  setTheme: (theme: ThemeKey) => void
}

type ThemeKey = 'light' | 'dark'

const themes: Record<ThemeKey, ThemeType> = {
  light: theme,
  dark: darkTheme
}

export const useTheme = (): UseTheme => {
  const { theme: key, resolvedTheme: name, ...rest } = useThemeKey()
  const theme = themes[name as ThemeKey]
  return { name, theme, key, ...rest }
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => (
  <Provider
    disableTransitionOnChange
    attribute="class"
    defaultTheme="system"
    value={{
      light: 'light',
      dark: darkTheme.className
    }}
  >
    {children}
  </Provider>
)

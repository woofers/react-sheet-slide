import { ThemeProvider as Provider, useTheme as useThemeKey } from 'next-themes'

type ThemeProviderProps = {
  children?: React.ReactNode
}

type UseThemeProps = ReturnType<typeof useThemeKey>

type UseTheme = Omit<UseThemeProps, 'theme' | 'setTheme'> & {
  name: UseThemeProps['resolvedTheme']
  key: UseThemeProps['theme']
  setTheme: (theme: ThemeKey) => void
}

type ThemeKey = 'light' | 'dark'

export const useTheme = (): UseTheme => {
  const { theme: key, resolvedTheme: name, ...rest } = useThemeKey()
  return { name, key, ...rest }
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => (
  <Provider
    disableTransitionOnChange
    attribute="class"
    defaultTheme="system"
    value={{
      light: 'light',
      dark: 'dark'
    }}
  >
    {children}
  </Provider>
)

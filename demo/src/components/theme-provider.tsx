import React, { useEffect, useState, useContext, createContext } from 'react'
import { theme } from 'stitches'

type ThemeType = typeof theme

type ThemeContext = ThemeType

type ThemeProviderProps = {
  children?: React.ReactNode
}

type ThemeClassProps = ThemeProviderProps & {
  theme?: ThemeType
  name: string
}

const themes: Record<string, ThemeType> = {
  light: theme
}

const ThemeClass: React.FC<ThemeClassProps> = ({ children, theme, name }) => {
  const isDefault = name === 'light'
  const className = !isDefault ? theme : undefined
  useEffect(() => {
    if (typeof window === 'undefined' || !className) return
    document.body.classList.add(className)
    return () => document.body.classList.remove(className)
  }, [className])
  return <>{children}</>
}

const ThemeContext = createContext<ThemeContext | undefined>(undefined)

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [name, setTheme] = useState('light')
  const theme = themes[name]
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeClass theme={theme} name={name}>
        {children}
      </ThemeClass>
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContext => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

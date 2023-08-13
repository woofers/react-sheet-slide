'use client'
import { useEffect } from 'react'
import { useTheme } from 'components/theme-provider'

export const useHead = ({ darkTitle }: { darkTitle: boolean }) => {
  const { name } = useTheme()
  const useDarkMode = name === 'dark'
  const lightMeta = '#f2f2f6'
  const darkMeta = '#070708'
  const meta = useDarkMode || darkTitle ? darkMeta : lightMeta
  useEffect(() => {
    if (typeof document === 'undefined') return
    const themeColor = document.querySelector(`meta[name='theme-color']`) as {
      content?: string
    }
    const original = themeColor?.content
    if (themeColor) themeColor.content = meta
    return () => {
      if (themeColor) themeColor.content = original
    }
  }, [meta])
  return useDarkMode
}

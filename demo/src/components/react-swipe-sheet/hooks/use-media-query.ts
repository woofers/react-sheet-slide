import { useCallback, useEffect, useState } from 'react'


const getMedia = (query: string) => {
  if (typeof window === 'undefined') return
  return window.matchMedia(query)
}

const getMatches = (query: string): boolean => {
  const m = getMedia(query)
  return m ? m.matches : false
}

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(getMatches(query))
  const handleChange = useCallback(() => {
    setMatches(getMatches(query))
  }, [query, setMatches])
  useEffect(() => {
    const matchMedia = getMedia(query)
    if (!matchMedia) return
    handleChange()
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange)
    } else {
      matchMedia.addEventListener('change', handleChange)
    }
    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange)
      } else {

        matchMedia.removeEventListener('change', handleChange)
      }
    }
  }, [handleChange, query])
  return matches
}

export const useReducedMotion = () => useMediaQuery('@media (prefers-reduced-motion)')

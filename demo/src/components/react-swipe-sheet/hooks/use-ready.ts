import { useCallback, useEffect, useState } from 'react'

const useReady = () => {
  const [ready, setReady] = useState(false)
  const [readyMap, updateReadyMap] = useState<{ [key: string]: boolean }>({})
  const registerReady = useCallback((key: string) => {
    updateReadyMap((ready) => ({ ...ready, [key]: false }))
    return () => {
      updateReadyMap((ready) => ({ ...ready, [key]: true }))
    }
  }, [])

  useEffect(() => {
    const states = Object.values(readyMap)
    if (states.length === 0) return
    const isReady = states.every(Boolean)
    if (isReady) {
      setReady(true)
    }
  }, [readyMap])
  return { ready, registerReady }
}

export default useReady

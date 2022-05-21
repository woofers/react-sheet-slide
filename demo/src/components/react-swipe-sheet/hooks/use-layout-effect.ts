import { useEffect, useLayoutEffect as useLayout } from 'react'

function canUseDOM() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
}

const useLayoutEffect = canUseDOM() ? useLayout : useEffect

export default useLayoutEffect

import { useEffect, useLayoutEffect as useLayout } from 'react'

const canUseDOM = () =>
  !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )

const useLayoutEffect = canUseDOM() ? useLayout : useEffect

export default useLayoutEffect

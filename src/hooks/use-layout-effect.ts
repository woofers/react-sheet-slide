import { useEffect, useLayoutEffect as useLayout } from 'react'
import { canUseDOM } from '../utils'

const useLayoutEffect = canUseDOM() ? useLayout : useEffect

export default useLayoutEffect

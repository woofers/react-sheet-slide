/*
 * react-spring-bottom-sheet use-snap-points
 * Modified to support denents API
 * ------------------------------
 * From: https://github.com/stipsan/react-spring-bottom-sheet/blob/main/src/hooks/useSnapPoints.tsx
 * MIT License at https://raw.githubusercontent.com/stipsan/react-spring-bottom-sheet/main/LICENSE
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useLayoutEffect from './use-layout-effect'
import useReady from './use-ready'
import { processSnapPoints, roundAndCheckForNaN } from '../utils'
import type { Detents, SelectedDetent } from '../types'

const useSnapPoints = ({
  contentRef,
  controlledMaxHeight,
  footerEnabled = true,
  footerRef,
  getSnapPoints,
  heightRef,
  lastSnapRef,
  ready,
  registerReady
}: {
  contentRef: React.RefObject<Element>
  controlledMaxHeight?: number
  footerEnabled?: boolean
  footerRef: React.RefObject<Element>
  getSnapPoints: Detents
  heightRef: React.RefObject<number | undefined>
  lastSnapRef: React.RefObject<number | undefined>
  ready: boolean
  registerReady: ReturnType<typeof useReady>['registerReady']
}) => {
  const { maxHeight, minHeight, headerHeight, footerHeight } = useDimensions({
    contentRef: contentRef,
    controlledMaxHeight,
    footerEnabled,
    footerRef,
    registerReady
  })

  const { detents, minSnap, maxSnap } = processSnapPoints(
    ready
      ? getSnapPoints({
          height: heightRef.current!,
          footerHeight,
          headerHeight,
          minHeight,
          maxHeight
        })
      : [0],
    maxHeight
  )

  // @TODO investigate the gains from memoizing this
  function findSnap(numberOrCallback: SelectedDetent) {
    let unsafeSearch: number
    if (typeof numberOrCallback === 'function') {
      unsafeSearch = numberOrCallback({
        footerHeight,
        headerHeight,
        height: heightRef.current!,
        minHeight,
        maxHeight,
        detents,
        lastDetent: lastSnapRef.current!
      })
    } else {
      unsafeSearch = numberOrCallback
    }
    const querySnap = roundAndCheckForNaN(unsafeSearch)
    return detents.reduce(
      (prev, curr) =>
        Math.abs(curr - querySnap) < Math.abs(prev - querySnap) ? curr : prev,
      minSnap
    )
  }

  return { minSnap, maxSnap, findSnap, maxHeight }
}

function useDimensions({
  contentRef,
  controlledMaxHeight,
  footerEnabled,
  footerRef,
  registerReady
}: {
  contentRef: React.RefObject<Element>
  controlledMaxHeight?: number
  footerEnabled: boolean
  footerRef: React.RefObject<Element>
  registerReady: ReturnType<typeof useReady>['registerReady']
}): {
  maxHeight: number
  minHeight: number
  headerHeight: number
  footerHeight: number
} {
  const setReady = useMemo(
    () => registerReady('contentHeight'),
    [registerReady]
  )
  const maxHeight = useMaxHeight(controlledMaxHeight!, registerReady)

  // @TODO probably better to forward props instead of checking refs to decide if it's enabled
  const headerHeight = 0
  const contentHeight = useElementSizeObserver(contentRef, {
    enabled: true
  })
  const footerHeight = useElementSizeObserver(footerRef, {
    enabled: footerEnabled
  })
  const minHeight =
    Math.min(maxHeight - headerHeight - footerHeight, contentHeight) +
    headerHeight +
    footerHeight

  const ready = contentHeight > 0
  useEffect(() => {
    if (ready) {
      setReady()
    }
  }, [ready, setReady])

  return {
    maxHeight,
    minHeight,
    headerHeight,
    footerHeight
  }
}

type ResizeObserverOptions = {
  box: ResizeObserverBoxOptions
}
const observerOptions: ResizeObserverOptions = {
  // Respond to changes to padding, happens often on iOS when using env(safe-area-inset-bottom)
  // And the user hides or shows the Safari browser toolbar
  box: 'border-box'
}
/**
 * Hook for determining the size of an element using the Resize Observer API.
 *
 * @param ref - A React ref to an element
 */
function useElementSizeObserver(
  ref: React.RefObject<Element>,
  {
    enabled
  }: {
    enabled: boolean
  }
): number {
  let [size, setSize] = useState(0)

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    // we only observe one element, so accessing the first entry here is fine
    setSize(entries[0].borderBoxSize[0].blockSize)
  }, [])

  useLayoutEffect(() => {
    if (!ref.current || !enabled) {
      return
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(ref.current, observerOptions)

    return () => {
      resizeObserver.disconnect()
    }
  }, [ref, handleResize, enabled])

  return enabled ? size : 0
}

// Blazingly keep track of the current viewport height without blocking the thread, keeping that sweet 60fps on smartphones
const useMaxHeight = (
  controlledMaxHeight: number,
  registerReady: ReturnType<typeof useReady>['registerReady']
): number => {
  const setReady = useMemo(() => registerReady('maxHeight'), [registerReady])
  const [maxHeight, setMaxHeight] = useState(() =>
    roundAndCheckForNaN(controlledMaxHeight) || typeof window !== 'undefined'
      ? window.innerHeight
      : 0
  )
  const ready = maxHeight > 0
  const raf = useRef(0)

  useEffect(() => {
    if (ready) {
      setReady()
    }
  }, [ready, setReady])

  useLayoutEffect(() => {
    // Bail if the max height is a controlled prop
    if (controlledMaxHeight) {
      setMaxHeight(roundAndCheckForNaN(controlledMaxHeight))
      return
    }

    const handleResize = () => {
      if (raf.current) {
        // bail to throttle the amount of resize changes
        return
      }

      // throttle state changes using rAF
      raf.current = requestAnimationFrame(() => {
        setMaxHeight(window.innerHeight)
        raf.current = 0
      })
    }
    window.addEventListener('resize', handleResize)
    setMaxHeight(window.innerHeight)
    setReady()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(raf.current)
    }
  }, [controlledMaxHeight, setReady])

  return maxHeight
}

export default useSnapPoints
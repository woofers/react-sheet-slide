import { useEffect } from 'react'
import { getOwnerDocument } from '../utils'

const getParentFromBody = (node: HTMLElement) => {
  const root = node?.parentNode?.parentNode as HTMLElement
  return root.closest('body > *')
}

const HIDDEN = 'aria-hidden'

const createAriaHider = (node: HTMLElement) => {
  const originalValues: string[] = []
  const rootNodes: HTMLElement[] = []
  const ownerDocument = getOwnerDocument(node)!
  const sheetNode = getParentFromBody(node)
  Array.prototype.forEach.call(
    ownerDocument.querySelectorAll('body > *'),
    node => {
      if (
        node === sheetNode ||
        ['SCRIPT', 'NEXT-ROUTE-ANNOUNCER', 'NOSCRIPT'].indexOf(node.tagName) >=
          0
      )
        return
      const attr = node.getAttribute(HIDDEN)
      const alreadyHidden = attr !== null && attr !== 'false'
      if (alreadyHidden) return
      originalValues.push(attr)
      rootNodes.push(node)
      node.setAttribute(HIDDEN, 'true')
    }
  )
  return () => {
    rootNodes.forEach((node, index) => {
      const originalValue = originalValues[index]
      if (originalValue === null) {
        node.removeAttribute(HIDDEN)
      } else {
        node.setAttribute(HIDDEN, originalValue)
      }
    })
  }
}

const useAriaHidden = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    return ref.current ? createAriaHider(ref.current) : void null
  }, [])
}

export default useAriaHidden

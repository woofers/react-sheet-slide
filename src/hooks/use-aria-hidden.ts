import { useEffect } from 'react'
import { getOwnerDocument } from '../utils'

const MAX_DEPTH = 2

const getParentFromBody = (node: HTMLElement) => {
  let sheetNode: HTMLElement = node
  let index = MAX_DEPTH + 2 // Add 2 to get root of sheet
  while (index > 0 && sheetNode) {
    if (!sheetNode.parentNode || sheetNode.tagName === 'BODY') break
    sheetNode = (sheetNode.parentNode as HTMLElement)
    index --
  }
  return sheetNode
}

const HIDDEN = 'aria-hidden'

const createAriaHider = (node: HTMLElement) => {
  const originalValues: string[] = []
  const rootNodes: HTMLElement[] = []
  const ownerDocument = getOwnerDocument(node)!
  const sheetNode = getParentFromBody(node)
  Array.prototype.forEach.call(
    ownerDocument.querySelectorAll('body > *'),
    (node) => {
      if (node === sheetNode || ['SCRIPT', 'NEXT-ROUTE-ANNOUNCER', 'NOSCRIPT'].indexOf(node.tagName) >= 0) return
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
    return ref.current
      ? createAriaHider(ref.current)
      : void null
  }, [])
}

export default useAriaHidden

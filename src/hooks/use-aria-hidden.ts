import { useEffect } from 'react'
import { getOwnerDocument } from '../utils'

const noop = () => {}

function createAriaHider(dialogNode: HTMLElement) {
  let originalValues: any[] = []
  let rootNodes: HTMLElement[] = []
  let ownerDocument = getOwnerDocument(dialogNode)!

  let sheetNode = dialogNode
  let index = 4
  while (index > 0 && sheetNode) {
    if (!sheetNode.parentNode || (sheetNode as HTMLElement).tagName === 'BODY') break
    sheetNode = (sheetNode as any).parentNode
    index --
  }
  Array.prototype.forEach.call(
    ownerDocument.querySelectorAll('body > *'),
    (node) => {
      if (node === sheetNode || ['SCRIPT', 'NEXT-ROUTE-ANNOUNCER'].indexOf(node.tagName) >= 0) return
      let attr = node.getAttribute('aria-hidden')
      let alreadyHidden = attr !== null && attr !== 'false'
      if (alreadyHidden) return
      originalValues.push(attr)
      rootNodes.push(node)
      node.setAttribute('aria-hidden', 'true')
    }
  )

  return () => {
    rootNodes.forEach((node, index) => {
      let originalValue = originalValues[index]
      if (originalValue === null) {
        node.removeAttribute('aria-hidden')
      } else {
        node.setAttribute('aria-hidden', originalValue)
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

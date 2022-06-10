import { useEffect } from 'react'
import { getOwnerDocument } from '../utils'

const noop = () => {}

function createAriaHider(dialogNode: HTMLElement) {
  let originalValues: any[] = []
  let rootNodes: HTMLElement[] = []
  let ownerDocument = getOwnerDocument(dialogNode)!

  if (!dialogNode) {
    if (__isDev__) {
      console.warn(
        'A ref has not yet been attached to a dialog node when attempting to call `createAriaHider`.'
      )
    }
    return noop
  }

  Array.prototype.forEach.call(
    ownerDocument.querySelectorAll('body > *'),
    (node) => {
      const portalNode = dialogNode.parentNode?.parentNode?.parentNode
      if (node === portalNode) {
        return
      }
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

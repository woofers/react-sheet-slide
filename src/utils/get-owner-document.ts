import canUseDOM from './can-use-dom'

function getOwnerDocument<T extends Element>(element: T | null | undefined) {
  return canUseDOM() ? (element ? element.ownerDocument : document) : null
}

export default getOwnerDocument

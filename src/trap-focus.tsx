/*
 * mui-base - TrapFocus
 * Modified for TypeScript and reduce size
 * ------------------------------
 * From: https://github.com/mui/material-ui/blob/master/packages/mui-base/src/TrapFocus/TrapFocus.js
 * MIT License at https://raw.githubusercontent.com/mui/material-ui/master/LICENSE
 */

import React, {
  cloneElement,
  Fragment,
  useEffect,
  useRef,
  useMemo
} from 'react'
import { setRef, getOwnerDocument, hasWindow } from './utils'

const isIosDevice = () =>
  hasWindow() &&
  window.navigator &&
  window.navigator.platform &&
  (/iP(ad|hone|od)/.test(window.navigator.platform) ||
    (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1))

const useForkRef = <InstanceA, InstanceB>(
  refA: React.Ref<InstanceA> | null | undefined,
  refB: React.Ref<InstanceB> | null | undefined
): React.Ref<InstanceA & InstanceB> | null => {
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null
    }
    return refValue => {
      setRef(refA, refValue)
      setRef(refB, refValue)
    }
  }, [refA, refB])
}

const candidatesSelector = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])'
].join(',')

const tabIndex = 'tabindex'

const getTabIndex = (node: HTMLElement) => {
  const tabindexAttr = parseInt(node.getAttribute(tabIndex) ?? '', 10)
  if (!Number.isNaN(tabindexAttr)) return tabindexAttr
  if (
    node.contentEditable === 'true' ||
    ((node.nodeName === 'AUDIO' ||
      node.nodeName === 'VIDEO' ||
      node.nodeName === 'DETAILS') &&
      node.getAttribute(tabIndex) === null)
  ) {
    return 0
  }
  return node.tabIndex
}

const getRadio = (selector: string, node: HTMLInputElement) =>
  node.ownerDocument.querySelector(`input[type="radio"]${selector}`)

const isNonTabbableRadio = (node: HTMLInputElement) => {
  if (node.tagName !== 'INPUT' || node.type !== 'radio') return false
  if (!node.name) return false
  let roving = getRadio(`[name="${node.name}"]:checked`, node)
  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`, node)
  }
  return roving !== node
}

const isNodeMatchingSelectorFocusable = (node: HTMLInputElement) =>
  !(
    node.disabled ||
    (node.tagName === 'INPUT' && node.type === 'hidden') ||
    isNonTabbableRadio(node)
  )

type TabNode = {
  documentOrder: number
  tabIndex: number
  node: HTMLElement
}

const getTabbable = (root: HTMLElement): HTMLElement[] => {
  const regularTabNodes: HTMLElement[] = []
  const orderedTabNodes: TabNode[] = []
  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node as HTMLElement)
    if (
      nodeTabIndex === -1 ||
      !isNodeMatchingSelectorFocusable(node as HTMLInputElement)
    ) {
      return
    }
    if (nodeTabIndex === 0) {
      regularTabNodes.push(node as HTMLElement)
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node: node as HTMLElement
      })
    }
  })

  return orderedTabNodes
    .sort((a, b) =>
      a.tabIndex === b.tabIndex
        ? a.documentOrder - b.documentOrder
        : a.tabIndex - b.tabIndex
    )
    .map(a => a.node)
    .concat(regularTabNodes)
}

type TrapFocusProps = {
  children: React.ReactElement<any, any>
}

const TrapFocus: React.FC<TrapFocusProps> = ({ children }) => {
  const ignoreNextEnforceFocus = useRef<boolean | undefined>()
  const sentinelStart = useRef<HTMLDivElement | null>(null)
  const sentinelEnd = useRef<HTMLDivElement | null>(null)
  const nodeToRestore = useRef<HTMLElement | null>(null)
  const reactFocusEventTarget = useRef<EventTarget | null>(null)
  const activated = useRef(false)

  const rootRef = useRef<HTMLDivElement | null>(null)
  const handleRef = useForkRef((children as any).ref, rootRef)
  const lastKeydown = useRef<KeyboardEvent | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    activated.current = false
  }, [])

  useEffect(() => {
    if (!rootRef.current) return
    const doc = getOwnerDocument(rootRef.current)!
    if (!rootRef.current.contains(doc.activeElement)) {
      if (activated.current) {
        rootRef.current.focus()
      }
    }
    return () => {
      if (nodeToRestore.current && nodeToRestore.current.focus) {
        ignoreNextEnforceFocus.current = true
        nodeToRestore.current.focus()
      }
      nodeToRestore.current = null
    }
  }, [])

  useEffect(() => {
    if (!rootRef.current) return
    const doc = getOwnerDocument(rootRef.current)!
    const contain = (nativeEvent?: Event) => {
      const { current: rootElement } = rootRef
      // Cleanup functions are executed lazily in React 17.
      // Contain can be called between the component being unmounted and its cleanup function being run.
      if (rootElement === null) {
        return
      }
      if (!doc.hasFocus() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false
        return
      }

      if (!rootElement.contains(doc.activeElement)) {
        if (
          (nativeEvent &&
            reactFocusEventTarget.current !== nativeEvent.target) ||
          doc.activeElement !== reactFocusEventTarget.current
        ) {
          reactFocusEventTarget.current = null
        } else if (reactFocusEventTarget.current !== null) {
          return
        }
        if (!activated.current) {
          return
        }
        let tabbable: HTMLElement[] = []
        if (
          doc.activeElement === sentinelStart.current ||
          doc.activeElement === sentinelEnd.current
        ) {
          tabbable = getTabbable(rootRef.current as HTMLElement)
        }

        if (tabbable.length > 0) {
          const isShiftTab = Boolean(
            lastKeydown.current?.shiftKey && lastKeydown.current?.key === 'Tab'
          )
          const focusNext = tabbable[0]
          const focusPrevious = tabbable[tabbable.length - 1]
          if (isShiftTab) {
            focusPrevious.focus()
          } else {
            focusNext.focus()
          }
        } else {
          rootElement.focus()
        }
      }
    }

    const loopFocus = (nativeEvent: KeyboardEvent) => {
      lastKeydown.current = nativeEvent
      if (nativeEvent.key !== 'Tab') return
      // Make sure the next tab starts from the right place.
      // doc.activeElement referes to the origin.
      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        // We need to ignore the next contain as
        // it will try to move the focus back to the rootRef element.
        ignoreNextEnforceFocus.current = true
        sentinelEnd.current!.focus()
      }
    }

    doc.addEventListener('focusin', contain)
    doc.addEventListener('keydown', loopFocus, true)

    // With Edge, Safari and Firefox, no focus related events are fired when the focused area stops being a focused area.
    // e.g. https://bugzilla.mozilla.org/show_bug.cgi?id=559561.
    // Instead, we can look if the active element was restored on the BODY element.
    //
    // The whatwg spec defines how the browser should behave but does not explicitly mention any events:
    // https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule.
    const interval = setInterval(() => {
      if (doc.activeElement!.tagName === 'BODY') {
        contain()
      }
    }, 50)

    return () => {
      clearInterval(interval)
      doc.removeEventListener('focusin', contain)
      doc.removeEventListener('keydown', loopFocus, true)
    }
  }, [])

  const onFocus: React.FocusEventHandler<HTMLElement> = event => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget as HTMLElement
    }
    activated.current = false
    reactFocusEventTarget.current = event.target

    const childrenPropsHandler = children.props.onFocus
    if (childrenPropsHandler) {
      childrenPropsHandler(event)
    }
  }
  const handleFocusSentinel: React.FocusEventHandler<
    HTMLDivElement
  > = event => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget as HTMLElement
    }
    activated.current = false
  }
  return (
    <Fragment>
      <div tabIndex={0} onFocus={handleFocusSentinel} ref={sentinelStart} />
      {cloneElement(children, { ref: handleRef, onFocus })}
      <div tabIndex={0} onFocus={handleFocusSentinel} ref={sentinelEnd} />
    </Fragment>
  )
}

if (__isDev__) {
  TrapFocus.displayName = 'TrapFocus'
}

export default TrapFocus

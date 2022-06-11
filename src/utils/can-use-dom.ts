import hasWindow from './has-window'

const canUseDOM = () =>
  !!(
    hasWindow() &&
    window.document &&
    window.document.createElement
  )

export default canUseDOM
